/// <reference lib="es2022" />

import { readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import { exit } from "process";

// Trasforma la prima lettera in maiuscolo.

const capitailize = (str: string) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
};

// Template componente.

const header = `
/**
 * Esporta come componenti le icone disponibili su https://flowbite.com/icons/
 */

import clsx from "clsx";
import { forwardRef } from "react";

/**
 * Proprietà delle icone SVG.
 */

type TIconProps = React.SVGProps<SVGSVGElement>;
type TIconRef = React.Ref<SVGSVGElement>;
type TIcon = React.ForwardRefExoticComponent<
  Omit<IIconProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

// ------------------------------------------------------------------------------------------------

`;

const svgInjectProps = `ref={ref} {...otherProps}`;
const svgPathInjectStrokeWidth = `strokeWidth={strokeWidth ?? 2}`;

const componentTemplate = `
/**
 * {{filename}}
 */

export const {{componentName}}: TIcon = forwardRef((props: TIconProps, ref: TIconRef) => {
  {{componentPropsExtract}}

  return (
    {{componentContent}}
  );
});
{{componentName}}.displayName = "{{componentName}}";
`.trim();

const separator = `

// ------------------------------------------------------------------------------------------------

`;

const [_arg0, _arg1, outFile] = process.argv;

if (!outFile) {
  console.error("ERRORE", "specificare dove salvare l'output (p.e. out.js)");
  exit(1);
}

// Recupera i file svg.

const result = await glob("./ignore/flowbite-icons/**/*.svg", { absolute: true });

// processa i singoli file.

const jsxIcons = await Promise.all(
  result.map(async (path, i) => {
    // rimuove dal percorso assoluto tutta la parte prima (e inclusa) di "flowbite-icons/"
    const pathToFlowbite = path.slice(0, path.indexOf("flowbite-icons/")) + "flowbite-icons/";
    const pathRelative = path.replace(pathToFlowbite, "");

    // scompone il percoso relativo (che è sempre composto da 3 parti)
    const [type, category, file] = pathRelative.split("/");

    if (type && file) {
      // tolgie ".svg", quindi trasforma il nome "arrow-down" in "ArrowDown"
      const capitalizeFileName = file
        .replaceAll(" ", "") // rimozipne spazio accidentale incluso nel nome del file
        .replace(".svg", "")
        .split("-")
        .map(capitailize)
        .join("")
        .replace("Adress", "Address"); // correzione typo nel nome del file

      // Aggiungre prefisso "Fb" e suffisso con il tipo di icona ("Outline" | "Solid")
      const iconComponentName = "Fb" + capitalizeFileName + capitailize(type);

      // Legge il contenuto del file svg.
      const svgContent = await readFile(path, "utf-8");

      let modifiedContent = svgContent;

      // All'apertura del tag "<svg " inietta il codice per impostare ref e le altre proprietà.
      modifiedContent = modifiedContent.replace("<svg ", `<svg ${svgInjectProps} `);

      // Se non sono già specificate le dimensioni del svg, forza dei valori di default.
      const containsWidth = modifiedContent.match(/<svg[^>]* width="[0-9]+"[^>]*>/);

      if (!containsWidth) {
        modifiedContent = modifiedContent.replace("<svg ", `<svg width="24" height="24" `);
      }

      // forza i valori di stoke e fill (se presenti) a "currentColor"
      modifiedContent = modifiedContent
        .replaceAll(/fill="#[A-z0-9]+"/g, `fill="currentColor"`)
        .replaceAll(/stroke="#[A-z0-9]+"/g, `stroke="currentColor"`);

      // verifica la presenza dell'attributo stroke-width
      const containsStrokeWidth = modifiedContent.includes(`stroke-width="2"`);

      // in assenza di "stroke-width", si assegna al componente le "props" e non le "otherProps"
      if (!containsStrokeWidth) {
        modifiedContent = modifiedContent.replace("{...otherProps}", "{...props}");
      }

      // Conversione attributi HTML => attributi JSX.
      modifiedContent = modifiedContent
        .replaceAll(`stroke-width="2"`, svgPathInjectStrokeWidth)
        .replaceAll("stroke-linecap=", "strokeLinecap=")
        .replaceAll("stroke-linejoin=", "strokeLinejoin=");

      // sostiuisce le parti nel template per il codice.
      const componentContent = modifiedContent;

      let componentCode = componentTemplate
        .replaceAll("{{filename}}", path)
        .replaceAll("{{componentName}}", iconComponentName)
        .replaceAll("{{componentContent}}", componentContent);

      // Si esegue l'estrazione delle "props" solo se è presente "stroke-wisth"
      if (containsStrokeWidth) {
        componentCode = componentCode.replace(
          "{{componentPropsExtract}}",
          `const { strokeWidth, ...otherProps } = props;`,
        );
      } else {
        componentCode = componentCode.replace("{{componentPropsExtract}}", "");
      }

      return componentCode;
    } else return "";
  }),
);

// Salvataggio contenuto del file.

try {
  const data = header + jsxIcons.join(separator);
  await writeFile(outFile, data, { encoding: "utf-8", flag: "w", mode: "644" });
} catch (error) {
  console.error("ERRORE nel salvare il file", error);
  exit(1);
}
