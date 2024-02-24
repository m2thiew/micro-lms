/**
 * src/frontend/features/pill/components/admin-form.tsx
 *
 * form amministratore per creare/modificare una pillola
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { apiClient } from "@/frontend/lib/trpc/client";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import {
  adminPillFormCreateSchema,
  adminPillFormUpdateSchema,
  uploadPillContentConfig,
  uploadPillThumbConfig,
  type AdminPillFormCreateInput,
  type AdminPillFormUpdateInput,
  type PillAdminData,
} from "@/shared/features/pill/schema";
import { returnSyncHandler, type SyncHandler } from "@/shared/utils/async";
import { getFormErrorMessage } from "@/shared/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm, type FieldErrors, type UseFormReturn } from "react-hook-form";
import { FileUploadInput } from "../../../components/file-upload";

// id pillola da modificare
type UpdateProps = {
  id: number;
};

// il form di creazione e/o modifica viene esposto dallo stesso componente.
type FormContentProps =
  | {
      mode: "create";
      id?: undefined;
      data?: undefined;
      form: UseFormReturn<AdminPillFormCreateInput>;
      errors: FieldErrors<AdminPillFormCreateInput>;
      onSubmit: SyncHandler;
    }
  | {
      mode: "update";
      id: number;
      data: PillAdminData;
      form: UseFormReturn<AdminPillFormUpdateInput>;
      errors: FieldErrors<AdminPillFormUpdateInput>;
      onSubmit: SyncHandler;
    };

// ------------------------------------------------------------------------------------------------

/**
 * Setup form per creazione pillola
 * @returns form per creazione pillola
 */
export const AdminPillCreateForm = () => {
  // navigazione.
  const router = useRouter();

  // chiamate API.
  const pillCreate = apiClient.adminPill.create.useMutation();
  const apiCache = apiClient.useUtils();

  // chiamate API.
  // const learnerCreate = apiClient.adminLearner.create.useMutation();
  // const apiCache = apiClient.useUtils();

  // setup form (create).
  const form = useForm<AdminPillFormCreateInput>({
    resolver: zodResolver(adminPillFormCreateSchema),
  });

  // azione di submit (create).
  const onSubmit = form.handleSubmit((input) => {
    console.log("onSubmit", input);
    // chiamata API per creare il nuovo utente.
    pillCreate
      .mutateAsync(input)
      .then((newPIll) => {
        console.log("onSubmit", "newPill", newPIll);
        void apiCache.adminPill.invalidate();
        alert("success");
        form.reset();
        // void router.push("/admin/pill");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // esposizione (create).
  return (
    <AdminPillFormContent
      mode="create"
      form={form}
      errors={form.formState.errors}
      onSubmit={returnSyncHandler(onSubmit)}
    />
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * setup form per modifica pillola
 * @param props.id  id pillola da modificare
 * @returns form per modifica pillola
 */
export const AdminPillUpdateForm = ({ id }: UpdateProps) => {
  // navigazione.
  const router = useRouter();

  // chiamate API.
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);

  const pillUpdate = apiClient.adminPill.update.useMutation();
  const pill = apiClient.adminPill.get.useQuery({ id }, { enabled: !isDataLoaded, cacheTime: 0 });
  const apiCache = apiClient.useUtils();

  // setup form (update).
  const form = useForm<AdminPillFormUpdateInput>({
    resolver: zodResolver(adminPillFormUpdateSchema),
    // defaultValues: learner.data,
  });

  // azione di submit (update).
  const onSubmit = form.handleSubmit((input) => {
    // chiamata API per modificare l'utente.
    pillUpdate
      .mutateAsync({ id, ...input })
      .then(() => {
        // forza il ricaricamento del dato modificato.
        void apiCache.adminPill.invalidate();
        pill.remove();
        setDataLoaded(false);

        alert("success");
        // void router.push("/admin/pill");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // al primo caricamento dei dati, imposta i campi del form e disabilita i successivi caricamenti.
  useEffect(() => {
    console.log("AdminPillUpdateForm effect", isDataLoaded, pill.data);
    if (!isDataLoaded && pill.data) {
      console.log("AdminPillUpdateForm effect => reset", pill.data);
      form.reset(pill.data);
      setDataLoaded(true);
    }
  }, [isDataLoaded, pill.data, form]);

  // stato del form (update).
  if (pill.isLoading) return <LoadingBar />;
  if (pill.error) return <ErrorCard error={pill.error.message} />;

  // if (!isDataLoaded) {
  //   form.reset(pill.data);
  //   setDataLoaded(true);
  // }

  // esposizione (update).
  return (
    <AdminPillFormContent
      mode="update"
      id={id}
      data={pill.data}
      form={form}
      errors={form.formState.errors}
      onSubmit={returnSyncHandler(onSubmit)}
    />
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * espone il form di creazione/modifica pillola
 * @param props settaggio del form
 * @returns form crezione/modifica pillola
 */
const AdminPillFormContent = (props: FormContentProps) => {
  const { mode, id, data, form, errors, onSubmit } = props;

  const disabled = form.formState.isSubmitSuccessful;

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Titolo
        </label>
        <input
          {...form.register("title")}
          disabled={disabled}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
        />
        {errors.title ? <span className="text-red-500">{errors.title.message}</span> : undefined}
      </div>

      <div className="mb-6">
        <label htmlFor="surname" className="mb-2 block text-sm text-gray-900 dark:text-white">
          Descrizione (opzionale)
        </label>
        <textarea
          {...form.register("description")}
          disabled={disabled}
          className="block h-24 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
        />
        {errors.description ? (
          <span className="text-red-500">{errors.description.message}</span>
        ) : undefined}
      </div>

      <div className="mb-6">
        <label htmlFor="surname" className="mb-2 block text-sm text-gray-900 dark:text-white">
          Immagine di anteprima (opzionale)
        </label>
        <p>{"è possibile caricare una immagine per l'anteprima della pillola"}</p>
        <Controller
          name="thumbPath"
          control={form.control}
          render={({ field }) => {
            return <FileUploadInput {...field} config={uploadPillThumbConfig} />;
          }}
        />
        {errors.thumbPath ? (
          <span className="text-red-500">{getFormErrorMessage(errors.thumbPath)}</span>
        ) : undefined}
      </div>

      <div className="mb-6">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Contenuti
        </label>
        <p>
          Selezionare i file che comporranno i contenuti della pillola. È possibile caricare sia
          immagini, sia video.
        </p>
        <p>
          <strong>È obbligatorio caricare almeno un contenuto</strong>
        </p>
        <Controller
          name="content"
          control={form.control}
          render={({ field }) => {
            return <FileUploadInput {...field} config={uploadPillContentConfig} />;
          }}
        />
        {errors.content ? (
          <span className="text-red-500">{getFormErrorMessage(errors.content)}</span>
        ) : undefined}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-200 "
      >
        Submit
      </button>
    </form>
  );
};
