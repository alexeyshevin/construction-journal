import { z } from 'zod';

export const WorkTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  unit: z.string(),
});

export const WorkLogSchema = z.object({
  id: z.string(),
  workDate: z.string(),
  amount: z.number(),
  unit: z.string(),
  performerName: z.string(),
  workTypeId: z.string(),
  workType: WorkTypeSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateWorkLogSchema = z.object({
  workDate: z.string().min(1, 'Укажите дату выполнения'),
  workTypeId: z.string().min(1, 'Выберите вид работ'),
  amount: z.coerce.number().positive('Объем должен быть больше 0'),
  unit: z.string().min(1, 'Укажите единицу измерения'),
  performerName: z.string().min(2, 'Укажите ФИО исполнителя'),
});

export const UpdateWorkLogSchema = CreateWorkLogSchema.partial();

export const WorkLogsQuerySchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
});

export type WorkTypeDto = z.infer<typeof WorkTypeSchema>;
export type WorkLogDto = z.infer<typeof WorkLogSchema>;
export type WorkLogsQueryDto = z.infer<typeof WorkLogsQuerySchema>;
export type CreateWorkLogFormValues = z.input<typeof CreateWorkLogSchema>;
export type CreateWorkLogDto = z.output<typeof CreateWorkLogSchema>;
export type UpdateWorkLogFormValues = z.input<typeof UpdateWorkLogSchema>;
export type UpdateWorkLogDto = z.output<typeof UpdateWorkLogSchema>;