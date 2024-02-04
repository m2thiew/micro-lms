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
  type LearnerAdminData,
} from "@/shared/features/learner/schema";
import { getMd5 } from "@/shared/utils/crypto";
import { TRPCError } from "@trpc/server";
import { setTimeout } from "timers/promises";

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce l'elenco dei learner (solo i dati base).
 */

const list = adminAPIProcedure.query(async ({ ctx }): Promise<LearnerAdminData[]> => {
  const { db } = ctx;

  // await setTimeout(5000);
  // throw new Error("ERRRRR");

  const learners = await db.learner.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      surname: true,
      email: true,
      role: true,
    },
  });

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

    const learner = await db.learner.findUnique({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        surname: true,
        email: true,
        role: true,
      },
      where: {
        id: input.id,
      },
    });

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

    const newLearner = await db.learner.create({
      data: {
        name: input.name,
        surname: input.surname,
        email: input.email,
        password: getMd5(input.password),
        role: "LEARNER",
      },
    });

    return newLearner;
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

    const updatedLearner = await db.learner.update({
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

    return updatedLearner;
  });

// ------------------------------------------------------------------------------------------------

/**
 * Elimina un learner.
 */

const doDelete = adminAPIProcedure
  .input(adminLearnerApiDeleteSchema)
  .mutation(async ({ ctx, input }): Promise<LearnerAdminData> => {
    const { db } = ctx;

    const deleteddLearner = await db.learner.delete({
      where: {
        id: input.id,
      },
    });

    return deleteddLearner;
  });

// ------------------------------------------------------------------------------------------------

export const adminLearnerApi = createAPIRouter({
  list,
  get,
  create,
  update,
  delete: doDelete,
});
