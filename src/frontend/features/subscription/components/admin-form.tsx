/**
 * src/frontend/features/subscription/components/admin-form.tsx
 *
 * form di assegnazione pillole per gli amministraotri.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { apiClient } from "@/frontend/lib/trpc/client";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import { type PillAdminData } from "@/shared/features/pill/schema";
import {
  adminSubscriptionFormSetOutputSchema,
  adminSubscriptionFormSetSchema,
  type AdminSubscriptionFormSetInput,
  type SubscriptionAdminData,
} from "@/shared/features/subscription/schema";
import { returnSyncHandler, type SyncHandler } from "@/shared/utils/async";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm, type FieldErrors, type UseFormReturn } from "react-hook-form";

type SetProps = {
  learnerId: number;
};

type FormContent = {
  mode: "set";
  id?: undefined;
  data: SubscriptionAdminData;
  form: UseFormReturn<AdminSubscriptionFormSetInput>;
  errors: FieldErrors<AdminSubscriptionFormSetInput>;
  onSubmit: SyncHandler;
};

// ------------------------------------------------------------------------------------------------

/**
 * setup form per settagio assegnazione pillola a learner
 * @param props.learnerId learner di cui modificare le assegnazioni
 * @returns form per settagio assegnazione
 */
export const AdminSubscriptionSetForm = (props: SetProps): React.JSX.Element => {
  // navigazione
  const navigation = useRouter();

  // chiamate api.
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);

  const subscription = apiClient.adminSubscription.get.useQuery(
    { learnerId: props.learnerId },
    { enabled: !isDataLoaded, cacheTime: 0 },
  );
  const setSubscriptions = apiClient.adminSubscription.set.useMutation();
  const apiCahce = apiClient.useUtils();

  // setup form (set)
  const form = useForm<AdminSubscriptionFormSetInput>({
    resolver: zodResolver(adminSubscriptionFormSetSchema),
  });

  // azione di submit (set).
  const onSubmit = form.handleSubmit((formInputData) => {
    // trasfroma le checkbox in array.
    const input = adminSubscriptionFormSetOutputSchema.parse(formInputData);

    // chiamata alle API.
    setSubscriptions
      .mutateAsync(input)
      .then(() => {
        alert("success");

        void apiCahce.adminSubscription.invalidate();
        subscription.remove();
        setDataLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // disattiva i successivi caricamenti dopo il primo
  useEffect(() => {
    if (!isDataLoaded && subscription.data) {
      const formInputData = adminSubscriptionFormSetSchema.parse(subscription.data);

      form.reset(formInputData);
      setDataLoaded(true);
    }
  }, [isDataLoaded, subscription.data, form]);

  if (subscription.isLoading) return <LoadingBar />;
  if (subscription.error) return <ErrorCard error={subscription.error.message} />;

  // esposizione (set)
  return (
    <AdminSubscriptionFormContent
      mode="set"
      data={subscription.data}
      form={form}
      errors={form.formState.errors}
      onSubmit={returnSyncHandler(onSubmit)}
    />
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * esposizione form per settagio assegnazione pillola a learner
 * @param props configurazione form
 * @returns form per settagio assegnazione pillola a learner
 */
const AdminSubscriptionFormContent = (props: FormContent): React.JSX.Element => {
  const { mode, id, data, form, errors, onSubmit } = props;

  const disabled = form.formState.isSubmitSuccessful;

  // chiamate api.
  const learner = apiClient.adminLearner.get.useQuery(
    { id: data.learnerId },
    { refetchOnWindowFocus: false },
  );
  const pills = apiClient.adminPill.list.useQuery(undefined, { refetchOnWindowFocus: false });
  const apiCahce = apiClient.useUtils();

  const dataReady = learner.data && pills.data;
  const someError = learner.error ?? learner.error;

  if (!dataReady) return <LoadingBar />;
  if (someError) return <ErrorCard error={someError.message} />;

  // esposizione riga per assegnare una pillola.
  const showSubscriptionPillRow = (pill: PillAdminData) => {
    const checkboxId = `pillsId.${pill.id}`;

    return (
      <tr className="border-b bg-white hover:bg-gray-50" key={pill.id}>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <input
              {...form.register(`pillsId.${pill.id}`)}
              type="checkbox"
              // checked={selected}
              id={checkboxId}
              disabled={disabled}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor={checkboxId} className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <td className="px-6 py-4">{pill.title}</td>
        <td className="px-6 py-4">-</td>
      </tr>
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="bg-gray-100">
          <p>
            <strong>
              {learner.data.name} {learner.data.surname}
            </strong>
          </p>
          <p>{learner.data.email}</p>
        </div>
        <hr />
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr key="header">
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                Pillola
              </th>
              <th scope="col" className="px-6 py-3">
                Data fruizione
              </th>
            </tr>
            {pills.data.map(showSubscriptionPillRow)}
          </thead>
        </table>

        <button
          type="submit"
          disabled={disabled}
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-200 "
        >
          Submit
        </button>
      </form>
    </>
  );
};

// ------------------------------------------------------------------------------------------------
