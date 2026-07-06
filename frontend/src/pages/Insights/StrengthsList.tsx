import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface Props {
  items: string[];
  color: string;
}

export function StrengthsList({ items, color }: Props) {
  return (
    <List dense disablePadding>
      {items.map((item, i) => (
        <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <FiberManualRecordIcon sx={{ fontSize: 8, color }} />
          </ListItemIcon>
          <ListItemText
            primary={item}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </ListItem>
      ))}
    </List>
  );
}