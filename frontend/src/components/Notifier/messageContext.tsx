// NotifierContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";

type NotifierContextType = {
  notify: (type: AlertColor, message: string) => void;
};

const NotifierContext = createContext<NotifierContextType | undefined>(
  undefined
);

export const useNotifier = (): NotifierContextType => {
  const context = useContext(NotifierContext);
  if (!context) {
    throw new Error("useNotifier must be used within a NotifierProvider");
  }
  return context;
};

type NotifierProviderProps = {
  children: ReactNode;
};

export const NotifierProvider = ({
  children,
}: NotifierProviderProps): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const notify = useCallback((type: AlertColor, msg: string) => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  }, []);

  const handleClose = (_: unknown, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <NotifierContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          zIndex: 9999999999,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotifierContext.Provider>
  );
};
