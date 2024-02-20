/**
 * src/frontend/features/pill/components/file-upload.tsx
 *
 * carica i file di contenuti delle pillole.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { carouselFileUploadInputTheme } from "@/frontend/lib/flowbite";
import { OutlineButton } from "@/frontend/ui/buttons";
import { getUploadSession } from "@/frontend/utils/session";

import { mime } from "@/shared/lib/mime";
import { uploadedFilesSchema, type UploadConfig } from "@/shared/lib/upload";
import { buildPublicUrl } from "@/shared/utils/url";
import { Alert, Carousel } from "flowbite-react";

import React, { forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

// esperimenti...

// type ImageFileInputProps<
//   N extends string,
//   V extends string[] = string[],
//   I extends Record<string, V> = Record<string, V>,
// > = {
//   readonly name: N;
//   readonly form?: UseFormReturn<I>;
//   readonly value?: string | string[];
//   readonly config: UploadConfig;
//   readonly tmpDir?: string;
// };

// type ObjectWithFileUpload<Key extends string> = {
//   [k in Key]: string[] | undefined;
// } & Record<string, unknown>;

// type FileUploadInputProps<TName extends string, TInputs extends ObjectWithFileUpload<TName>> = {
//   readonly name: Path<TInputs>;
//   readonly form?: UseFormReturn<TInputs>;
//   readonly value?: string | string[];
//   readonly config: UploadConfig;
//   readonly tmpDir?: string;
// };

// possibili valori restituiti dall'input.
// si usa "null" anzichè "undefined" perchè il primo è preferito da "react-hook-form".
type FileValue = string | string[] | null;

/**
 * al componente devono essere forniti:
 * - "name" dell'input
 * - eventuale valore già selezionato
 * - configurazione dell'upload
 * - eventuale "tmpDir" per l'upload
 * - proprietà passate da Controller.render di react-hook-form
 */
type FileUploadInputProps = {
  readonly name: string;
  readonly value?: FileValue;
  readonly config: UploadConfig;
  readonly onChange?: (newValue: FileValue) => void;
  readonly onBlur?: () => void;
  readonly disabled?: boolean;
  readonly className?: string;
};

type FileRef = React.Ref<HTMLInputElement>;

// ------------------------------------------------------------------------------------------------

/**
 * Componente che gestisce l'upload di uno o più file.
 */
export const FileUploadInput = forwardRef((props: FileUploadInputProps, ref: FileRef) => {
  // gestione del file.
  const defaultFiles: FileValue = props.value
    ? props.value instanceof Array
      ? props.value
      : [props.value]
    : null;

  const [filesToUpload, setFilesToUpload] = useState<File[] | undefined>(undefined);
  const [files, setFiles] = useState<FileValue>(defaultFiles);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);

  const mode = props.config.multiple ? ("multiple" as const) : ("single" as const);
  const singleFile = files?.at(0);
  const multipleFiles = files ? (files instanceof Array ? files : [files]) : [];

  const disabled = props.disabled ?? isUploading;

  // compilando il campo di input, parte in automatico l'upload del file.
  useEffect(() => {
    const controller = new AbortController();

    if (filesToUpload && !isUploading) {
      // avvio upload.
      setUploading(true);
      setUploadError(undefined);

      // prepara la chiamata POST.
      const data = new FormData();
      data.append("name", props.name);
      data.append("session", getUploadSession());

      filesToUpload.forEach((selectedFile) => {
        data.append("files", selectedFile);
      });
      data.append("configId", props.config.id);

      // timeout di 30 secondi
      const timeout = setTimeout(() => {
        controller.abort();
      }, 30 * 1000);

      // chiamata HTTP di upload.
      fetch("/api/upload", {
        method: "POST",
        body: data,
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((json) => uploadedFilesSchema.parse(json))
        .then((uploadedFilesList) => {
          // file caricato con successo
          const newFiles = uploadedFilesList.map((uploadedFile) => uploadedFile.path);
          setFiles(newFiles);

          clearTimeout(timeout);
          setFilesToUpload(undefined);
          setUploading(false);

          // passa il valore all'eventuale react-hook-form
          if (props.onChange) props.onChange(newFiles);
        })
        .catch((err) => {
          if (err instanceof Error) {
            setUploadError(err.message);
          }

          clearTimeout(timeout);
          setFilesToUpload(undefined);
          setUploading(false);
        });
    }

    // distruttore
    // return () => {
    //   console.log("distruttore");
    //   controller.abort();
    // };
  }, [filesToUpload, isUploading]);

  // messaggi di avviso
  const uploadingAlert = isUploading ? (
    <Alert color={"info"}>Upload in corso. Attendi...</Alert>
  ) : undefined;
  const errorAlert = uploadError ? (
    <Alert
      color={"failure"}
      onDismiss={() => {
        setUploadError(undefined);
      }}
    >
      {uploadError}
    </Alert>
  ) : undefined;

  const currentAlert = uploadingAlert ? uploadingAlert : errorAlert;

  // restituisce i tag immagini / video per esporre i file caricati.
  const showFilePreview = (file: string): React.JSX.Element | undefined => {
    const fileMime = mime.getType(file);
    if (fileMime) {
      if (fileMime.includes("image/")) {
        // restituisce un tag immagine.
        return (
          <img
            src={buildPublicUrl(file)}
            className="h-auto max-h-full w-auto rounded-md"
            onError={() => {
              setUploadError(`error loading "${file}"`);
            }}
            alt={file}
            key={file}
          />
        );
      } else if (fileMime.includes("video/")) {
        // restituisce un tag video.
        return (
          <video
            key={file}
            className="h-auto max-h-full w-auto rounded-md"
            controls={true}
            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture={true}
            disableRemotePlayback={true}
          >
            <source src={buildPublicUrl(file)} />
          </video>
        );
      }
    }
  };

  // immagine di anteprima del file (singolo).
  const previewSingle = mode == "single" && singleFile ? showFilePreview(singleFile) : undefined;

  // immagine di anteprima dei file (multple).
  const previewMultiple =
    mode == "multiple" && files ? (
      <Carousel theme={carouselFileUploadInputTheme} slide={false}>
        {multipleFiles.map(showFilePreview)}
      </Carousel>
    ) : undefined;

  // esposizione anteprima.
  const preview = previewSingle ?? previewMultiple ?? <p>nessun file selezionato</p>;

  // input per caricare il file / mostrare il file caricato.
  const fileSelectInput = files ? (
    <input
      ref={ref}
      name={props.name}
      type="text"
      className="w-full flex-grow rounded-lg bg-gray-200"
      readOnly={true}
      value={files}
      onBlur={props.onBlur}
    />
  ) : (
    <input
      ref={ref}
      name={props.name}
      type="file"
      className="w-full flex-grow rounded-lg bg-gray-200"
      value={""}
      disabled={disabled}
      multiple={props.config.multiple}
      accept={props.config.accept.join(",")}
      capture={props.config.capture}
      onChange={(event) => {
        const filesList = event.target.files;
        if (filesList) {
          const values: File[] = [];
          for (const selectedFile of filesList) values.push(selectedFile);

          setFilesToUpload(values);
        }
      }}
      onBlur={props.onBlur}
    />
  );

  // pulsante per rimuovere il file caricato.
  const clearFileButton = files ? (
    <div className="w-32">
      <OutlineButton
        onClick={() => {
          setFilesToUpload(undefined);
          setFiles(null);
          setUploading(false);

          // passa il valore all'eventuale react-hook-form
          if (props.onChange) props.onChange(null);
        }}
      >
        rimuovi
      </OutlineButton>
    </div>
  ) : undefined;

  // passaggio del valore all'eventuale react-hook-form.
  // N.B. questo effect, in combinazione con l'effect successivo, causava un ciclo infitio!
  // il problema è che props.onChange influenza il valore di props.value usato nel secondo effetc;
  // il secondo effetc influenza files che è una dipendenza del primo effect.
  // vi è quindi una dipendenza circolare.
  // useEffect(() => {
  //   if (props.onChange) {
  //     props.onChange(files);
  //   }
  // }, [props.onChange, files]);

  // forza il valore esposto dal campo a seguire il valore passato dall'eventuale react-hook-form.
  useEffect(() => {
    const valueAsString = props.value ? props.value.toString() : "";
    const filesAsString = files ? files.toString() : "";

    if (props.onChange && valueAsString != filesAsString) {
      const filesFromValue: FileValue = props.value
        ? props.value instanceof Array
          ? props.value
          : [props.value]
        : null;

      setFiles(filesFromValue);
    }
  }, [props.onChange, props.value, files]);

  // CSS per box contenitore
  const className = twMerge(
    "grid h-80 w-full grid-rows-4 rounded-lg border border-gray-300 bg-gray-50 p-6 shadow-md p-2.5 text-sm text-gray-900 focus:border-blue-500",
    props.className,
  );

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {fileSelectInput}
        {clearFileButton}
      </div>
      <div className="row-span-3 flex items-center justify-center">{currentAlert ?? preview}</div>
    </div>
  );
});
FileUploadInput.displayName = "FileUploadInput";
