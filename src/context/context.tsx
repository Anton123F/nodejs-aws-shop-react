import React from 'react';

const ErrorContext = React.createContext({
  errorCode: null,
  errorMessage: null,
  setError: (p: { errorMessage: any; errorCode: any }) => {},
});

export default ErrorContext;