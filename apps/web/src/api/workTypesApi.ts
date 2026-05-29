import type { WorkTypeDto } from '@construction/contracts';
import { http } from './http';

export async function getWorkTypes(): Promise<WorkTypeDto[]> {
  const response = await http.get<WorkTypeDto[]>('/work-types');
  return response.data;
}