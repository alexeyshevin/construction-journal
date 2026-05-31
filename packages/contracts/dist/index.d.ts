import { z } from 'zod';
export declare const WorkTypeSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    unit: z.ZodString;
}, z.core.$strip>;
export declare const WorkLogSchema: z.ZodObject<{
    id: z.ZodString;
    workDate: z.ZodString;
    amount: z.ZodNumber;
    unit: z.ZodString;
    performerName: z.ZodString;
    workTypeId: z.ZodString;
    workType: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        unit: z.ZodString;
    }, z.core.$strip>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export declare const CreateWorkLogSchema: z.ZodObject<{
    workDate: z.ZodString;
    workTypeId: z.ZodString;
    amount: z.ZodCoercedNumber<unknown>;
    unit: z.ZodString;
    performerName: z.ZodString;
}, z.core.$strip>;
export declare const UpdateWorkLogSchema: z.ZodObject<{
    workDate: z.ZodOptional<z.ZodString>;
    workTypeId: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    unit: z.ZodOptional<z.ZodString>;
    performerName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const WorkLogsQuerySchema: z.ZodObject<{
    dateFrom: z.ZodOptional<z.ZodString>;
    dateTo: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export type WorkTypeDto = z.infer<typeof WorkTypeSchema>;
export type WorkLogDto = z.infer<typeof WorkLogSchema>;
export type WorkLogsQueryDto = z.infer<typeof WorkLogsQuerySchema>;
export type CreateWorkLogFormValues = z.input<typeof CreateWorkLogSchema>;
export type CreateWorkLogDto = z.output<typeof CreateWorkLogSchema>;
export type UpdateWorkLogFormValues = z.input<typeof UpdateWorkLogSchema>;
export type UpdateWorkLogDto = z.output<typeof UpdateWorkLogSchema>;
