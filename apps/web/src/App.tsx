import type { CreateWorkLogDto, WorkLogDto } from '@construction/contracts';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { WorkLogFormDialog } from './components/WorkLogFormDialog';
import { WorkLogsTable } from './components/WorkLogsTable';
import { useWorkLogsStore } from './store/workLogsStore';

function App() {
  const {
    workLogs,
    workTypes,
    filters,
    isLoading,
    error,
    setFilters,
    fetchInitialData,
    fetchWorkLogs,
    createLog,
    updateLog,
    deleteLog,
  } = useWorkLogsStore();

const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<WorkLogDto | null>(null);

  useEffect(() => {
    void fetchInitialData();
  }, [fetchInitialData]);

  const openCreateDialog = () => {
    setEditingLog(null);
    setDialogOpen(true);
  };

  const openEditDialog = (item: WorkLogDto) => {
    setEditingLog(item);
    setDialogOpen(true);
  };

  const handleSubmit = async (dto: CreateWorkLogDto) => {
    if (editingLog) {
      await updateLog(editingLog.id, dto);
    } else {
      await createLog(dto);
    }
  };

const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Удалить запись журнала?');

    if (confirmed) {
      await deleteLog(id);
    }
  };

  const applyFilters = async () => {
    await fetchWorkLogs();
  };

return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Журнал работ
          </Typography>
          <Typography color="text.secondary">
            Учет выполненных работ на строительном объекте
          </Typography>
        </Box>

        <Paper sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <TextField
              label="Дата с"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.dateFrom ?? ''}
              onChange={(event) => setFilters({ ...filters, dateFrom: event.target.value || undefined })}
            />

            <TextField
              label="Дата по"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.dateTo ?? ''}
              onChange={(event) => setFilters({ ...filters, dateTo: event.target.value || undefined })}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Сортировка</InputLabel>
              <Select
                label="Сортировка"
                value={filters.sort ?? 'desc'}
                onChange={(event) => setFilters({ ...filters, sort: event.target.value as 'asc' | 'desc' })}
              >
                <MenuItem value="desc">Сначала новые</MenuItem>
                <MenuItem value="asc">Сначала старые</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={applyFilters} disabled={isLoading}>
              Применить
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateDialog}>
              Добавить запись
            </Button>
          </Stack>
        </Paper>

        {error && <Alert severity="error">{error}</Alert>}

        <WorkLogsTable items={workLogs} onEdit={openEditDialog} onDelete={handleDelete} />
      </Stack>

      <WorkLogFormDialog
        open={isDialogOpen}
        workTypes={workTypes}
        editingLog={editingLog}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default App;