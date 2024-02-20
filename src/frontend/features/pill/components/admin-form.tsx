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
import {
  AdminPillApiCreateInput,
  adminPillFormCreateSchema,
  uploadPillContentConfig,
  uploadPillThumbConfig,
  type AdminPillFormCreateInput,
  type AdminPillFormUpdateInput,
  type PillAdminData,
} from "@/shared/features/pill/schema";
import { returnSyncHandler, type SyncHandler } from "@/shared/utils/async";
import { getFormErrorMessage } from "@/shared/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { DateTime } from "luxon";
import { register } from "module";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useMemo } from "react";
import { Controller, useForm, type FieldErrors, type UseFormReturn } from "react-hook-form";
import { FileUploadInput } from "./file-upload";

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
          placeholder="John"
        />
        {errors.title ? <span className="text-red-500">{errors.title.message}</span> : undefined}
      </div>

      <div className="mb-6">
        <label htmlFor="surname" className="mb-2 block text-sm text-gray-900 dark:text-white">
          Descrizione (opzionale)
        </label>
        {/* <textarea
          {...form.register("description")}
          disabled={disabled}
          className="block h-24 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
        /> */}
        <input
          {...form.register("description")}
          disabled={disabled}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
          placeholder="John"
        />
        {errors.description ? (
          <span className="text-red-500">{errors.description.message}</span>
        ) : undefined}
      </div>

      <div className="mb-6">
        <label htmlFor="surname" className="mb-2 block text-sm text-gray-900 dark:text-white">
          Immagine di anteprima (opzionale)
        </label>
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
          Contenuti (caricare almeno 1 file)
        </label>
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
