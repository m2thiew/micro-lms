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

interface IIconProps extends React.SVGProps<SVGSVGElement> {}
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

export const {{componentName}}: TIcon = forwardRef((props: IIconProps, ref: TIconRef) => {
  const { strokeWidth, ...otherProps } = props;

  return (
    {{componentContent}}
  );
});
`.trim();

const separator = `

// ------------------------------------------------------------------------------------------------

`;

const [arg0, arg1, outFile] = process.argv;

if (!outFile) {
  console.error("ERRORE", "specificare dove salvare l'output (p.e. out.js)");
  exit(1);
}

// Recupera i file svg.

const result = await glob("./flowbite-icons/**/*.svg");

// processa i singoli file.

const jsxIcons = await Promise.all(
  result.map(async (path, i) => {
    const [flowbite, type, category, file] = path.split("/");

    if (type && file) {
      // tolgie ".svg", quindi trasforma il nome "arrow-down" in "ArrowDown"
      const capitalizeFileName = file
        .replace(/\s/g, "")
        .replace(".svg", "")
        .split("-")
        .map(capitailize)
        .join("");

      // Aggiungre prefisso "Fb" e suffisso con il tipo di icona ("Outline" | "Solid")
      const iconComponentName = "Fb" + capitalizeFileName + capitailize(type);

      // Legge il contenuto del file svg.
      const svgContent = await readFile(path, "utf-8");

      // All'apertura del tag "<svg " inietta il codice per impostare ref e le altre proprietà.
      const svgContentEdit01 = svgContent.replace("<svg ", `<svg ${svgInjectProps} `);

      // Se non sono già specificate le dimensioni del svg, forza dei valori di default.
      const svgContentEdit02 = svgContentEdit01.match(/<svg[^>]* width="[0-9]+"[^>]*>/)
        ? svgContentEdit01
        : svgContentEdit01.replace("<svg ", `<svg width="24" height="24" `);

      // forza i valori di stoke e fill (se presenti) a "currentColor"
      const svgContentEdit03 = svgContentEdit02
        .replace(/fill="#[A-z0-9]+"/g, `fill="currentColor"`)
        .replace(/stroke="#[A-z0-9]+"/g, `stroke="currentColor"`);

      // Conversione attributi HTML => attributi JSX.
      const svgContentEdit04 = svgContentEdit03
        .replace(`stroke-width="2"`, svgPathInjectStrokeWidth)
        .replace("stroke-linecap=", "strokeLinecap=")
        .replace("stroke-linejoin=", "strokeLinejoin=");

      // sostiuisce le parti nel template per il codice.
      const componentContent = svgContentEdit04;

      const componentCode = componentTemplate
        .replace("{{filename}}", path)
        .replace("{{componentName}}", iconComponentName)
        .replace("{{componentContent}}", componentContent);

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
