import { initTRPC } from "@trpc/server";

const server = initTRPC.create();

export const endpoints = server.router({
  getUserName: server.procedure.query((): string => {
    return "Matteo Marcoli";
  }),
});

export type TEndpoints = typeof endpoints;
