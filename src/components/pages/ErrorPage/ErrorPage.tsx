import { useContext} from "react";
import ErrorContext from '~/context/context';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const ErrorHandler = () => {
  const { errorCode, errorMessage, setError } = useContext(ErrorContext);

  const handleClose = () => {
    setError({ errorCode: null, errorMessage: null });
  };


  return (
    <Dialog
      open={errorCode !== null}
      onClose={handleClose}
    >
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {errorCode}: {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorHandler;