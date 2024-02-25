/**
 * src/frontend/features/learner/components/admin-form.tsx
 *
 * Form per inserimento / modifica learner da parte degli amministratori.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { apiClient } from "@/frontend/lib/trpc/client";
import { SubmitButton } from "@/frontend/ui/buttons";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import {
  adminLearnerFormCreateSchema,
  adminLearnerFormUpdateSchema,
  type AdminLearnerFormCreateInput,
  type AdminLearnerFormUpdateInput,
  type LearnerAdminData,
} from "@/shared/features/learner/schema";
import { returnSyncHandler, type SyncHandler } from "@/shared/utils/async";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm, type FieldErrors, type UseFormReturn } from "react-hook-form";
import { date } from "zod";

// id learner da modificare
type UpdateProps = {
  id: number;
};

// il form di creazione e/o modifica viene esposto dallo stesso componente.
type FormContentProps =
  | {
      mode: "create";
      id?: undefined;
      data?: undefined;
      form: UseFormReturn<AdminLearnerFormCreateInput>;
      errors: FieldErrors<AdminLearnerFormCreateInput>;
      onSubmit: SyncHandler;
    }
  | {
      mode: "update";
      id: number;
      data: LearnerAdminData;
      form: UseFormReturn<AdminLearnerFormUpdateInput>;
      errors: FieldErrors<AdminLearnerFormUpdateInput>;
      onSubmit: SyncHandler;
    };

// ------------------------------------------------------------------------------------------------

/**
 * Configurazione form per la creazione learner.
 * @returns form di creazione learner
 */

export const AdminLearnerCreateForm = () => {
  // navigazione.
  const router = useRouter();

  // chiamate API.
  const learnerCreate = apiClient.adminLearner.create.useMutation();
  const apiCache = apiClient.useUtils();

  // setup form (create).
  const form = useForm<AdminLearnerFormCreateInput>({
    resolver: zodResolver(adminLearnerFormCreateSchema),
  });

  // azione di submit (create).
  const onSubmit = form.handleSubmit((input) => {
    // chiamata API per creare il nuovo utente.
    learnerCreate
      .mutateAsync(input)
      .then(() => {
        alert("Nuovo learner creato.");

        void apiCache.adminLearner.invalidate();
        void router.push("/admin/learner");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // esposizione (create).
  return (
    <AdminLearnerFormContent
      mode="create"
      form={form}
      errors={form.formState.errors}
      onSubmit={returnSyncHandler(onSubmit)}
    />
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * Configurazione form per la modifica learner.
 * @param props.id id learner da modificare
 * @returns form di modifica learner
 */
export const AdminLearnerUpdateForm = ({ id }: UpdateProps) => {
  // navigazione.
  const router = useRouter();

  // chiamate API.
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);

  const learnerUpdate = apiClient.adminLearner.update.useMutation();
  const learner = apiClient.adminLearner.get.useQuery(
    { id },
    { enabled: !isDataLoaded, cacheTime: 0 },
  );
  const apiCache = apiClient.useUtils();

  // setup form (update).
  const form = useForm<AdminLearnerFormUpdateInput>({
    resolver: zodResolver(adminLearnerFormUpdateSchema),
    // defaultValues: learner.data,
  });

  // azione di submit (update).
  const onSubmit = form.handleSubmit((input) => {
    // chiamata API per modificare l'utente.
    learnerUpdate
      .mutateAsync({ id, ...input })
      .then(() => {
        alert("Modifiche salvate.");

        void apiCache.adminLearner.invalidate();
        void router.push("/admin/learner");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // stato del form.
  if (learner.isLoading) return <LoadingBar />;
  if (learner.error) return <ErrorCard error={learner.error.message} />;

  // al primo caricamento dei dati, imposta i campi del form e disabilita i successivi caricamenti.
  if (!isDataLoaded) {
    form.reset(learner.data);
    setDataLoaded(true);
  }

  // esposizione (update).
  return (
    <AdminLearnerFormContent
      mode="update"
      id={id}
      data={learner.data}
      form={form}
      errors={form.formState.errors}
      onSubmit={returnSyncHandler(onSubmit)}
    />
  );
};

// ------------------------------------------------------------------------------------------------

const AdminLearnerFormContent = (props: FormContentProps) => {
  const { mode, id, data, form, errors, onSubmit } = props;

  const disabled = form.formState.isSubmitSuccessful;

  // Checkbox per mostare la password da modificare (update)
  const isPasswordCheckVisible = mode == "update";

  const defaultPasswordVisbile = mode == "create";
  const [isPasswordFieldVisible, setPasswordFieldVisible] =
    useState<boolean>(defaultPasswordVisbile);

  // Gestisce i campi che possono scomparire (campo "password")
  useEffect(() => {
    if (mode == "update") {
      if (!isPasswordFieldVisible) {
        form.setValue("password", undefined);
        form.unregister("password");
      }
    }
  }, [isPasswordFieldVisible, form, mode]);

  return (
    <>
      {mode == "create" ? (
        <h2 className="text-lg font-bold">Dati del nuovo learner</h2>
      ) : (
        <h2 className="text-lg font-bold">
          Dati attuali del learner {data.name} {data.surname}
        </h2>
      )}
      <form onSubmit={onSubmit} className="mt-6">
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nome
            </label>
            <input
              {...form.register("name")}
              disabled={disabled}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
            />
            {errors.name ? <span className="text-red-500">{errors.name.message}</span> : undefined}
          </div>
          <div>
            <label
              htmlFor="surname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Cognome
            </label>
            <input
              {...form.register("surname")}
              disabled={disabled}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
            />
            {errors.surname ? (
              <span className="text-red-500">{errors.surname.message}</span>
            ) : undefined}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            E-Mail
          </label>
          <input
            {...form.register("email")}
            type="email"
            disabled={disabled}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
          />
          {errors.email ? <span className="text-red-500">{errors.email.message}</span> : undefined}
        </div>
        {isPasswordCheckVisible ? (
          <div className="mb-6 flex items-center gap-2">
            <input
              id="passwordEnabled"
              name="passwordEnabled"
              disabled={disabled}
              type="checkbox"
              onChange={() => {
                setPasswordFieldVisible(!isPasswordFieldVisible);
              }}
            />
            <label htmlFor="passwordEnabled">modifica password</label>
          </div>
        ) : undefined}
        {isPasswordFieldVisible ? (
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              {...form.register("password")}
              type="password"
              disabled={disabled}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
            />
            {errors.password ? (
              <span className="text-red-500">{errors.password.message}</span>
            ) : undefined}
          </div>
        ) : undefined}

        <SubmitButton disabled={disabled}>
          {mode == "create" ? "Crea nuovo learner" : "Salva modifiche"}
        </SubmitButton>
      </form>
    </>
  );
};
