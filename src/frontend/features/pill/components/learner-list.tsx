/**
 * src/frontend/features/pill/components/learner-list.tsx
 *
 * Componente che espone la lista delle pillole a cui il learner loggato è iscritto.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { apiClient } from "@/frontend/lib/trpc/client";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import { type PillPublicData } from "@/shared/features/pill/schema";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PillCard } from "./card";

// ------------------------------------------------------------------------------------------------

export const LearnerSubscribedPillList = (): React.JSX.Element => {
  // navigazione
  const router = useRouter();

  // chiamate api
  const learner = apiClient.privateLearner.get.useQuery();
  const learnerPills = apiClient.privatePill.list.useQuery();

  const someLoading = learner.isLoading || learnerPills.isLoading;
  const someError = learner.error ?? learnerPills.error;
  const allSuccess = learner.status == "success" && learnerPills.status == "success";

  if (someLoading) return <LoadingBar />;
  if (someError) return <ErrorCard error={someError.message} />;
  if (!allSuccess) return <ErrorCard error={"unable to load all data"} />;

  // costruisce l'elenco delle pillole visionate incrociando i track learner e i dati delle pillole.
  const viewedPills: Record<string, Date> = {};
  learner.data.tracks.forEach((track) => {
    viewedPills[track.pillId] = track.viewedAt;
  });

  // funzione per esporre la card di una pillola.
  const showPillCard = (pill: PillPublicData): React.JSX.Element => {
    const viewPillLink = `/pill/${pill.id}`;
    const thumbPath = pill.thumbPath ? pill.thumbPath : "/default-thumb.png";
    const viewed = viewedPills[pill.id] !== undefined;

    return (
      <PillCard
        key={pill.id}
        id={pill.id}
        title={pill.title}
        description=""
        thumbPath={thumbPath}
        href={viewPillLink}
        viewed={viewed}
      />
    );
  };

  if (learnerPills.data.length == 0)
    return (
      <p className="mt-4 text-center text-lg">
        <em>{"Attualmente non hai alcuna pillola assegnata."}</em>
      </p>
    );

  return (
    <>
      <div className="mt-6 flex flex-wrap items-stretch justify-center gap-12">
        {learnerPills.data.map(showPillCard)}
      </div>
    </>
  );
};
