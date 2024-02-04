import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const LearnerScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','surname','email','password','role']);

export const SessionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','token','refreshToken','expiresAt','learnerId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const RoleSchema = z.enum(['LEARNER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// LEARNER SCHEMA
/////////////////////////////////////////

export const LearnerSchema = z.object({
  role: RoleSchema,
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  password: z.string(),
})

export type Learner = z.infer<typeof LearnerSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  token: z.string(),
  refreshToken: z.string(),
  expiresAt: z.coerce.date(),
  learnerId: z.number().int(),
})

export type Session = z.infer<typeof SessionSchema>
