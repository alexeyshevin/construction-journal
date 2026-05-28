import { z } from 'zod';

export const CreateWorkLogSchema = z.object({
  workDate: z.string(),
  workTypeId: z.string(),
  amount: z.number(),
  unit: z.string(),
  performerName: z.string(),
});

export type CreateWorkLogDto = z.infer<typeof CreateWorkLogSchema>;