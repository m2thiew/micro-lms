import { type Learner } from "@prisma/client";
import { db } from "./backend/lib/database";

const result = await db.learner.findFirst({
  where: { id: 2 },
});

let learner: Learner;

learner = result;

if (result) {
  learner = result;
}
