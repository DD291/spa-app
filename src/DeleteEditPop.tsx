import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';

interface ButtonProps {
    // attributes?: string;
    open: boolean;
    token : string
    // children?: React.ReactNode;
  }
  

    export default function DeleteEditPop(props : ButtonProps) {
        const [popOpen, setPopOpen] = useState(props.open);
        const handleClickOpen = () => {
            setPopOpen(true);
        };
        const handleClose = () => {
            setPopOpen(false);
        };


  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}> delete/edit */}
      {/* </Button> */}
      <Dialog
        open={popOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
          },
        }}
      >
        <DialogTitle>Выберите действие
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit">Удалить запись</Button>
          <Button onClick={handleClose}>Изменить запись</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
