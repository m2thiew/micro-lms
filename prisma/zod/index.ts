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

export const PillScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','title','description','thumbPath']);

export const PillContentScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','path','pillId']);

export const SubscriptionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','learnerId','pillId']);

export const TrackScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','learnerId','pillId']);

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

/////////////////////////////////////////
// PILL SCHEMA
/////////////////////////////////////////

export const PillSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string(),
  description: z.string(),
  thumbPath: z.string(),
})

export type Pill = z.infer<typeof PillSchema>

/////////////////////////////////////////
// PILL CONTENT SCHEMA
/////////////////////////////////////////

export const PillContentSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  path: z.string(),
  pillId: z.number().int(),
})

export type PillContent = z.infer<typeof PillContentSchema>

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  learnerId: z.number().int(),
  pillId: z.number().int(),
})

export type Subscription = z.infer<typeof SubscriptionSchema>

/////////////////////////////////////////
// TRACK SCHEMA
/////////////////////////////////////////

export const TrackSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  learnerId: z.number().int(),
  pillId: z.number().int(),
})

export type Track = z.infer<typeof TrackSchema>
