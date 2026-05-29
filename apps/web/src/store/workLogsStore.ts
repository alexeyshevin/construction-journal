import type { CreateWorkLogDto, UpdateWorkLogDto, WorkLogDto, WorkTypeDto } from '@construction/contracts';
import { create } from 'zustand';
import { createWorkLog, deleteWorkLog, getWorkLogs, updateWorkLog, type WorkLogsFilters } from '../api/workLogsApi';
import { getWorkTypes } from '../api/workTypesApi';

type WorkLogsState = {
  workLogs: WorkLogDto[];
  workTypes: WorkTypeDto[];
  filters: WorkLogsFilters;
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: WorkLogsFilters) => void;
  fetchInitialData: () => Promise<void>;
  fetchWorkLogs: () => Promise<void>;
  createLog: (dto: CreateWorkLogDto) => Promise<void>;
  updateLog: (id: string, dto: UpdateWorkLogDto) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
};

export const workLogsStore = create<WorkLogsState>((set, get) => ({
  workLogs: [],
  workTypes: [],
  filters: {
    sort: 'desc',
  },
  isLoading: false,
  error: null,

  setFilters: (filters) => {
    set({ filters });
  },

  fetchInitialData: async () => {
    set({ isLoading: true, error: null });

    try {
      const [workTypes, workLogs] = await Promise.all([
        getWorkTypes(),
        getWorkLogs(get().filters),
      ]);

      set({ workTypes, workLogs });
    } catch {
      set({ error: 'Не удалось загрузить данные' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchWorkLogs: async () => {
    set({ isLoading: true, error: null });

    try {
      const workLogs = await getWorkLogs(get().filters);
      set({ workLogs });
    } catch {
      set({ error: 'Не удалось загрузить журнал работ' });
    } finally {
      set({ isLoading: false });
    }
  },

  createLog: async (dto) => {
    await createWorkLog(dto);
    await get().fetchWorkLogs();
  },

  updateLog: async (id, dto) => {
    await updateWorkLog(id, dto);
    await get().fetchWorkLogs();
  },

  deleteLog: async (id) => {
    await deleteWorkLog(id);
    await get().fetchWorkLogs();
  },
}));