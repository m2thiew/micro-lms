/**
 * src/frontend/features/pill/components/file-upload.tsx
 *
 * carica i file di contenuti delle pillole.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { carouselCustomTheme, carouselFileUploadInputTheme } from "@/frontend/lib/flowbite";
import { OutlineButton } from "@/frontend/ui/buttons";
import { mime } from "@/shared/lib/mime";
import { uploadedFilesSchema, type UploadConfig } from "@/shared/lib/upload";
import { buildPublicUrl } from "@/shared/utils/url";
import { Alert, Carousel } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

type ImageFileInputProps = {
  readonly name: string;
  readonly form?: UseFormReturn;
  readonly value?: string | string[];
  readonly config: UploadConfig;
  readonly tmpDir?: string;
};

// ------------------------------------------------------------------------------------------------

export const FileUploadInput = (props: ImageFileInputProps) => {
  // input HTML
  const refFileInput = useRef<HTMLInputElement>(null);

  // gestione del file.
  const defaultFiles = props.value
    ? props.value instanceof Array
      ? props.value
      : [props.value]
    : undefined;

  const [inputValues, setInputValues] = useState<File[] | undefined>(undefined);
  const [files, setFiles] = useState<string[] | undefined>(defaultFiles);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);

  const mode = props.config.multiple ? ("multiple" as const) : ("single" as const);
  const singleFile = files?.at(0);

  // compilando il campo di input, parte in automatico l'upload del file.

  useEffect(() => {
    const controller = new AbortController();

    if (inputValues && !isUploading) {
      // avvio upload.
      setUploading(true);
      setUploadError(undefined);

      // prepara la chiamata POST.
      const data = new FormData();

      inputValues.forEach((selectedFile) => {
        data.append("files", selectedFile);
      });
      data.append("configId", props.config.id);
      if (props.tmpDir) {
        data.append("tmpDir", props.tmpDir);
      }

      // timeout di 30 secondi
      const timeout = setTimeout(() => {
        console.log("abort");
        controller.abort();
      }, 30 * 1000);

      console.log("http", inputValues, data);

      // chiamata HTTP di upload.
      fetch("/api/upload", {
        method: "POST",
        body: data,
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((json) => uploadedFilesSchema.parse(json))
        .then((uploadedFilesList) => {
          if (uploadedFilesList[0]) {
            // file caricato con successo

            console.log(uploadedFilesList);

            setFiles(uploadedFilesList.map((uploadedFile) => uploadedFile.path));
          }

          clearTimeout(timeout);
          setInputValues(undefined);
          setUploading(false);
        })
        .catch((err) => {
          if (err instanceof Error) {
            setUploadError(err.message);
          }

          clearTimeout(timeout);
          setInputValues(undefined);
          setUploading(false);
        });
    }

    // distruttore
    // return () => {
    //   console.log("distruttore");
    //   controller.abort();
    // };
  }, [inputValues, isUploading]);

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
              console.log("onErrror");
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
        {files.map(showFilePreview)}
      </Carousel>
    ) : undefined;

  // esposizione anteprima.
  const preview = previewSingle ?? previewMultiple ?? <p>nessun file selezionato</p>;

  // input per caricare il file / mostrare il file caricato.
  const fileSelectInput = files ? (
    <input
      ref={refFileInput}
      type="text"
      className="w-full flex-grow rounded-lg bg-gray-200"
      readOnly={true}
      value={files}
    />
  ) : (
    <input
      ref={refFileInput}
      type="file"
      className="w-full flex-grow rounded-lg bg-gray-200"
      value={""}
      disabled={isUploading}
      multiple={props.config.multiple}
      accept={props.config.accept.join(",")}
      capture={props.config.capture}
      onChange={(event) => {
        const filesList = event.target.files;
        if (filesList) {
          const values: File[] = [];
          for (const selectedFile of filesList) values.push(selectedFile);

          setInputValues(values);
        }
      }}
    />
  );

  // pulsante per rimuovere il file caricato.
  const clearFileButton = files ? (
    <div className="w-32">
      <OutlineButton
        onClick={() => {
          setInputValues(undefined);
          setFiles(undefined);
          setUploading(false);
        }}
      >
        rimuovi
      </OutlineButton>
    </div>
  ) : undefined;

  // registrazione campo all'eventuale react-hook-form
  useEffect(() => {
    if (props.form) {
      props.form.register(props.name);
    }
  }, [props.form, props.name]);

  // passaggio del valore all'eventuale react-hook-form.
  useEffect(() => {
    if (props.form) {
      props.form.setValue(props.name, files);
    }
  }, [props.form, props.name, files]);

  return (
    <div className="grid h-80 w-full grid-rows-4 rounded-lg border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-center gap-2">
        {fileSelectInput}
        {clearFileButton}
      </div>
      <div className="row-span-3 flex items-center justify-center">{currentAlert ?? preview}</div>
    </div>
  );
};
