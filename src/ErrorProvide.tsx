import React, { ReactNode, useState } from "react";
import ErrorContext from './context/context';

type Props = {
  children: ReactNode;
};
const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState({ errorCode: null, errorMessage: null });

  return (
    // @ts-ignore
    <ErrorContext.Provider value={{ ...error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;