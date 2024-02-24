/**
 * src/backend/features/learner/utils/fetch.ts
 *
 * funzioni di fetch da DB per i dati learner.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import {
  learnerAdminDataSchema,
  learnerPublicDataSchema,
  subscriptionRowToPillId,
  type LearnerAdminData,
  type Learner as LearnerPublicData,
} from "@/shared/features/learner/schema";
import { type PrismaClient } from "@prisma/client";
import { type PrismaClientOptions } from "@prisma/client/runtime/library";

type DB = PrismaClient;

type DBTransaction = Omit<
  PrismaClient<PrismaClientOptions, never>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

type DBInterface = DB | DBTransaction;

// ------------------------------------------------------------------------------------------------

/**
 * Recupera tutti, uno o alcuni dati dei learner, convertendo i dati nel formato usato nella app.
 * @param db connessione al DB
 * @param ids (opzionale) se specificato, recupera solo i learner con tali id
 * @returns dati dei lerner per gli admin
 */
export const fetchLearnersAdminData = async (
  db: DBInterface,
  id?: number | number[],
): Promise<LearnerAdminData[]> => {
  // cosrtruzione where
  const idList: number[] = id instanceof Array ? id : [id ?? 0];
  const where = id !== undefined ? { id: { in: idList } } : undefined;

  // recupero righe DB
  const learnerRows = await db.learner.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      surname: true,
      email: true,
      role: true,
      Subscription: {
        select: { pillId: true },
      },
    },
    where: where,
  });

  // conversione da formato DB a formato della app.
  const learners: LearnerAdminData[] = learnerRows.map((learnerRow): LearnerAdminData => {
    const subscriptionRows = learnerRow.Subscription;
    const pillsId = subscriptionRows.map((subRow) => subscriptionRowToPillId.parse(subRow));

    return learnerAdminDataSchema.parse({ ...learnerRow, pillsId });
  });

  return learners;
};

// ------------------------------------------------------------------------------------------------

/**
 * Recupera tutti, uno o alcuni dati dei learner, convertendo i dati nel formato usato nella app.
 * @param db connessione al DB
 * @param ids (opzionale) se specificato, recupera solo i learner con tali id
 * @returns dati dei lerner pubblici
 */
export const fetchLearnersPublicData = async (
  db: DBInterface,
  id?: number | number[],
): Promise<LearnerPublicData[]> => {
  // cosrtruzione where
  const idList: number[] = id instanceof Array ? id : [id ?? 0];
  const where = id !== undefined ? { id: { in: idList } } : undefined;

  // recupero righe DB
  const learnerRows = await db.learner.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      Subscription: {
        select: { pillId: true },
      },
    },
    where: where,
  });

  // conversione da formato DB a formato della app.
  const learners: LearnerPublicData[] = learnerRows.map((learnerRow): LearnerPublicData => {
    const subscriptionRows = learnerRow.Subscription;
    const pillsId = subscriptionRows.map((subRow) => subscriptionRowToPillId.parse(subRow));

    return learnerPublicDataSchema.parse({ ...learnerRow, pillsId });
  });

  return learners;
};

// ------------------------------------------------------------------------------------------------
