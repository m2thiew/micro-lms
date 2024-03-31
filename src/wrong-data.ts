import { db } from "./backend/lib/database";

await db.pill.create({
  data: {
    title: "Titolo pillola",
    description: "Descrizione pillola",
    referenceId: "123",
  },
});

await db.pill.create({
  data: {
    title: "Titolo pillola",
    description: "Descrizione pillola",
    referenceId: 123,
  },
});
