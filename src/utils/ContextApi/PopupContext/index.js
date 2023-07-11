import React from 'react';
import { Dialog, DialogTitle, Alert, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const PopupContext = React.createContext();

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('info');
  const popupTimeoutRef = React.useRef();

  const openPopup = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setIsOpen(true);

    // Automatically close the popup after 5 seconds
    popupTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  const closePopup = () => {
    setIsOpen(false);

    // Clear the timeout when the popup is manually closed
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
  };

  React.useEffect(() => {
    return () => {
      // Clear the timeout when the component is unmounted
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}

      <Dialog open={isOpen} onClose={closePopup}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {message}
            <IconButton edge="end" color="inherit" onClick={closePopup} aria-label="close">
              <DeleteIcon/>
            </IconButton>
          </Box>
        </DialogTitle>
        <Alert severity={severity}>
          {message}
        </Alert>
      </Dialog>
    </PopupContext.Provider>
  );
};
