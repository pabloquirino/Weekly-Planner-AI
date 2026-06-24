import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, MenuItem, TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DAYS, DAY_LABELS, type DayOfWeek, type Task } from "../types";

interface FormValues {
  title: string;
  description: string;
  day_of_week: DayOfWeek;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
  defaultDay?: DayOfWeek;
  task?: Task;
}

export function TaskFormDialog({ open, onClose, onSubmit, defaultDay = "monday", task }: Props) {
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      day_of_week: task?.day_of_week ?? defaultDay,
    },
  });

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>
      <form onSubmit={handleSubmit((v) => { onSubmit(v); handleClose(); })}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Título"
            fullWidth
            required
            {...register("title", { required: true })}
          />
          <TextField
            label="Descrição (opcional)"
            fullWidth
            multiline
            rows={2}
            {...register("description")}
          />
          <Controller
            name="day_of_week"
            control={control}
            render={({ field }) => (
              <TextField select label="Dia" fullWidth {...field}>
                {DAYS.map((d) => (
                  <MenuItem key={d} value={d}>{DAY_LABELS[d]}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}