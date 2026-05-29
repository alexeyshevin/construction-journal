import type { CreateWorkLogDto, UpdateWorkLogDto, WorkLogDto } from '@construction/contracts';
import { http } from './http';

export type WorkLogsFilters = {
  dateFrom?: string;
  dateTo?: string;
  sort?: 'asc' | 'desc';
};

export async function getWorkLogs(filters: WorkLogsFilters): Promise<WorkLogDto[]> {
  const response = await http.get<WorkLogDto[]>('/work-logs', {
    params: filters,
  });
  return response.data;
}

export async function createWorkLog(dto: CreateWorkLogDto): Promise<WorkLogDto> {
  const response = await http.post<WorkLogDto>('/work-logs', dto);
  return response.data;
}

export async function updateWorkLog(id: string, dto: UpdateWorkLogDto): Promise<WorkLogDto> {
  const response = await http.patch<WorkLogDto>(`/work-logs/${id}`, dto);
  return response.data;
}

export async function deleteWorkLog(id: string): Promise<void> {
  await http.delete(`/work-logs/${id}`);
}