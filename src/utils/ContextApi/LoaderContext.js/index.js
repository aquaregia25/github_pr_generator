import React, { createContext, useContext, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export const LoaderContext = createContext();
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {isLoading && (
        <Backdrop open={isLoading}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {children}
    </LoaderContext.Provider>
  );
};
