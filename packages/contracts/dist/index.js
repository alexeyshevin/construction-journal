"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkLogsQuerySchema = exports.UpdateWorkLogSchema = exports.CreateWorkLogSchema = exports.WorkLogSchema = exports.WorkTypeSchema = void 0;
const zod_1 = require("zod");
exports.WorkTypeSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    unit: zod_1.z.string(),
});
exports.WorkLogSchema = zod_1.z.object({
    id: zod_1.z.string(),
    workDate: zod_1.z.string(),
    amount: zod_1.z.number(),
    unit: zod_1.z.string(),
    performerName: zod_1.z.string(),
    workTypeId: zod_1.z.string(),
    workType: exports.WorkTypeSchema,
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.CreateWorkLogSchema = zod_1.z.object({
    workDate: zod_1.z.string().min(1, 'Укажите дату выполнения'),
    workTypeId: zod_1.z.string().min(1, 'Выберите вид работ'),
    amount: zod_1.z.coerce.number().positive('Объем должен быть больше 0'),
    unit: zod_1.z.string().min(1, 'Укажите единицу измерения'),
    performerName: zod_1.z.string().min(2, 'Укажите ФИО исполнителя'),
});
exports.UpdateWorkLogSchema = exports.CreateWorkLogSchema.partial();
exports.WorkLogsQuerySchema = zod_1.z.object({
    dateFrom: zod_1.z.string().optional(),
    dateTo: zod_1.z.string().optional(),
    sort: zod_1.z.enum(['asc', 'desc']).optional(),
});
