/**
 * src/frontend/features/learner/components/admin-list.tsx
 *
 * Elenco dei learner esposto agli amministratori.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { apiClient } from "@/frontend/lib/trpc/client";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";

// ------------------------------------------------------------------------------------------------

export const AdminLearnersList = (): React.JSX.Element => {
  const learners = apiClient.learner.getLearnerList.useQuery();

  if (learners.isLoading) return <LoadingBar />;
  if (learners.error) return <ErrorCard error={learners.error.message} />;

  return <pre>{JSON.stringify(learners.data)}</pre>;
};
