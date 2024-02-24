/**
 * src/backend/features/learner/api.ts
 *
 * Chiamate API per la gestione dei learner.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { adminAPIProcedure } from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";
import {
  adminLearnerApiCreateSchema,
  adminLearnerApiDeleteSchema,
  adminLearnerApiGetSchema,
  adminLearnerApiUpdateSchema,
  learnerAdminDataSchema,
  subscriptionRowToPillId,
  type LearnerAdminData,
} from "@/shared/features/learner/schema";
import { getMd5 } from "@/shared/utils/crypto";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

// ------------------------------------------------------------------------------------------------

/**
 * Recupera tutti, uno o alcuni dati dei learner, convertendo i dati nel formato usato nella app.
 * @param db connessione al DB
 * @param ids (opzionale) se specificato, recupera solo i learner con tali id
 * @returns dati dei lerner per gli admin
 */
const fetchLearnersAdminData = async (
  db: PrismaClient,
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
 * Restituisce l'elenco dei learner (solo i dati base).
 */

const list = adminAPIProcedure.query(async ({ ctx }): Promise<LearnerAdminData[]> => {
  const { db } = ctx;

  const learners = await fetchLearnersAdminData(db);

  return learners;
});

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce i dati completi di un singolo learner.
 */

const get = adminAPIProcedure
  .input(adminLearnerApiGetSchema)
  .query(async ({ ctx, input }): Promise<LearnerAdminData> => {
    const { db } = ctx;

    const learner = (await fetchLearnersAdminData(db, input.id)).at(0);
    if (!learner) throw new TRPCError({ code: "NOT_FOUND" });

    return learner;
  });

// ------------------------------------------------------------------------------------------------

/**
 * Crea un nuovo utente.
 */

const create = adminAPIProcedure
  .input(adminLearnerApiCreateSchema)
  .mutation(async ({ ctx, input }): Promise<LearnerAdminData> => {
    const { db } = ctx;

    const newLearnerRow = await db.learner.create({
      data: {
        name: input.name,
        surname: input.surname,
        email: input.email,
        password: getMd5(input.password),
        role: "LEARNER",
      },
    });

    const learner = (await fetchLearnersAdminData(db, newLearnerRow.id)).at(0);
    if (!learner) throw new TRPCError({ code: "NOT_FOUND" });

    return learner;
  });

// ------------------------------------------------------------------------------------------------

/**
 * Aggiorna i dati di un utente.
 */

const update = adminAPIProcedure
  .input(adminLearnerApiUpdateSchema)
  .mutation(async ({ ctx, input }): Promise<LearnerAdminData> => {
    const { db } = ctx;

    // await setTimeout(3000);

    const updatedLearnerRow = await db.learner.update({
      data: {
        name: input.name,
        surname: input.surname,
        email: input.email,
        password: input.password ? getMd5(input.password) : undefined,
      },
      where: {
        id: input.id,
      },
    });

    const learner = (await fetchLearnersAdminData(db, input.id)).at(0);
    if (!learner) throw new TRPCError({ code: "NOT_FOUND" });

    return learner;
  });

// ------------------------------------------------------------------------------------------------

/**
 * Elimina un learner.
 */

const execDelete = adminAPIProcedure
  .input(adminLearnerApiDeleteSchema)
  .mutation(async ({ ctx, input }): Promise<LearnerAdminData> => {
    const { db } = ctx;

    const learner = (await fetchLearnersAdminData(db, input.id)).at(0);
    if (!learner) throw new TRPCError({ code: "NOT_FOUND" });

    const deletedLearnerRow = await db.learner.delete({
      where: {
        id: input.id,
      },
    });

    return learner;
  });

// ------------------------------------------------------------------------------------------------

export const adminLearnerApi = createAPIRouter({
  list,
  get,
  create,
  update,
  delete: execDelete,
});
