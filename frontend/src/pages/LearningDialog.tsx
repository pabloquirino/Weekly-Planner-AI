import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Task } from "../types";

interface Props {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  mode: "complete" | "edit";
}

export function LearningDialog({ open, task, onClose, onConfirm, mode }: Props) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setNotes(task?.learning_notes ?? "");
    }
  }, [open, task]);

  const handleConfirm = () => {
    onConfirm(notes);
    onClose();
  };

  const handleSkip = () => {
    onConfirm("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "complete" ? "✅ Tarefa concluída!" : "📝 Editar aprendizado"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        {task && (
          <Typography variant="body2" color="text.secondary">
            <strong>{task.title}</strong>
          </Typography>
        )}

        <Typography variant="body2">
          {mode === "complete"
            ? "O que você aprendeu ou praticou nesta tarefa? (opcional)"
            : "Edite os aprendizados registrados para esta tarefa."}
        </Typography>

        <TextField
          label="Aprendizados"
          multiline
          rows={4}
          fullWidth
          placeholder={
            "Ex:\n• Aprendi o verbo to be\n• Pratiquei saudações básicas\n• Entendi a estrutura de frases simples"
          }
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          autoFocus
        />
      </DialogContent>

      <DialogActions>
        {mode === "complete" && (
          <Button onClick={handleSkip} color="inherit">
            Pular
          </Button>
        )}
        {mode === "edit" && (
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
        )}
        <Button onClick={handleConfirm} variant="contained">
          {mode === "complete" ? "Salvar aprendizado" : "Atualizar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}