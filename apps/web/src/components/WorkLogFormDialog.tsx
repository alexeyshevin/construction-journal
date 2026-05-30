import type {
  CreateWorkLogDto,
  CreateWorkLogFormValues,
  WorkLogDto,
  WorkTypeDto,
} from '@construction/contracts';
import { CreateWorkLogSchema } from '@construction/contracts';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  workTypes: WorkTypeDto[];
  editingLog: WorkLogDto | null;
  onClose: () => void;
  onSubmit: (dto: CreateWorkLogDto) => Promise<void>;
};

export const WorkLogFormDialog = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateWorkLogFormValues, unknown, CreateWorkLogDto>({
    resolver: zodResolver(CreateWorkLogSchema),
    defaultValues: {
      workDate: dayjs().format('YYYY-MM-DD'),
      workTypeId: '',
      amount: 1,
      unit: '',
      performerName: '',
    },
  });

  useEffect(() => {
    if (props.editingLog) {
      reset({
        workDate: dayjs(props.editingLog.workDate).format('YYYY-MM-DD'),
        workTypeId: props.editingLog.workTypeId,
        amount: props.editingLog.amount,
        unit: props.editingLog.unit,
        performerName: props.editingLog.performerName,
      });
    } else {
      reset({
        workDate: dayjs().format('YYYY-MM-DD'),
        workTypeId: '',
        amount: 1,
        unit: '',
        performerName: '',
      });
    }
  }, [props.editingLog, props.open, reset]);

  const handleWorkTypeChange = (workTypeId: string) => {
    const selected = props.workTypes.find((item) => item.id === workTypeId);
    setValue('workTypeId', workTypeId, { shouldValidate: true });

    if (selected) {
      setValue('unit', selected.unit, { shouldValidate: true });
    }
  };

  const submit = handleSubmit(async (dto) => {
    await props.onSubmit(dto);
    props.onClose();
  });

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {
          props.editingLog ?
            'Редактировать запись' :
            'Добавить запись'
        }
      </DialogTitle>

      <DialogContent>
        <Stack component="form" spacing={2.5} sx={{ mt: 1 }} onSubmit={submit}>
          <TextField
            label="Дата выполнения"
            type="date"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            error={Boolean(errors.workDate)}
            helperText={errors.workDate?.message}
            {...register('workDate')}
          />

          <Controller
            name="workTypeId"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.workTypeId)}>
                <InputLabel>Вид работ</InputLabel>
                <Select
                  label="Вид работ"
                  value={field.value}
                  onChange={(event) => handleWorkTypeChange(event.target.value)}
                >
                  {props.workTypes.map((workType) => (
                    <MenuItem key={workType.id} value={workType.id}>
                      {workType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <TextField
            label="Объем"
            type="number"
            slotProps={{
              htmlInput: { step: '0.01' },
            }}
            error={Boolean(errors.amount)}
            helperText={errors.amount?.message}
            {...register('amount', { valueAsNumber: true })}
          />

          <TextField
            label="Единица измерения"
            error={Boolean(errors.unit)}
            helperText={errors.unit?.message}
            {...register('unit')}
          />

          <TextField
            label="ФИО исполнителя"
            error={Boolean(errors.performerName)}
            helperText={errors.performerName?.message}
            {...register('performerName')}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose}>Отмена</Button>
        <Button onClick={submit} variant="contained" disabled={isSubmitting}>
          {props.editingLog ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}