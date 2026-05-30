import type { WorkLogDto } from '@construction/contracts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

type Props = {
  items: WorkLogDto[];
  onEdit: (item: WorkLogDto) => void;
  onDelete: (id: string) => void;
};

export const WorkLogsTable = (props: Props) => {
  if (props.items.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">Записей пока нет</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell>Вид работ</TableCell>
            <TableCell>Объем</TableCell>
            <TableCell>Исполнитель</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{dayjs(item.workDate).format('DD.MM.YYYY')}</TableCell>
              <TableCell>{item.workType.name}</TableCell>
              <TableCell>
                {item.amount} {item.unit}
              </TableCell>
              <TableCell>{item.performerName}</TableCell>
              <TableCell align="right">
                <Tooltip title="Редактировать">
                  <IconButton onClick={() => props.onEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Удалить">
                  <IconButton color="error" onClick={() => props.onDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}