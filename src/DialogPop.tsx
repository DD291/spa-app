import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { addRequest } from './custRequest';
import { axiosInstance } from './custRequest';

interface ButtonProps {
    open: boolean;
    token : string;
  }
  

    export default function DialogPop(props : ButtonProps) {
        const [popOpen, setPopOpen] = useState(props.open);

        const handleClickOpen = () => {
            setPopOpen(true);
        };

        const handleClose = () => {
            setPopOpen(false);
        };

        const HOST = "https://test.v5.pryaniky.com";


        const tableAdd = async (event:any, formJson:any) => {
            event.preventDefault();
            // console.log(user)
            const url = HOST+"/ru/data/v3/testmethods/docs/userdocs/create";
            console.log("formJson " + JSON.stringify(formJson))
            try {
                 const res = addRequest(
                    url, 
                    JSON.stringify({ 
                            "companySigDate": "2020-11-23T11:19:27.017Z", 
                            "companySignatureName": "test", 
                            "documentName": "test", 
                            "documentStatus": "test", 
                            "documentType": "test", 
                            "employeeNumber": "test", 
                            "employeeSigDate": "2020-11-23T11:19:27.017Z", 
                            "employeeSignatureName": "test" 
                        }),
                        axiosInstance
                 );
                // fetch(url, {
                //     method: "POST",
                //     headers: {
                //       "X-Auth": "supersecrettoken_for_user1"
                //     },
                //     body: 
                //     JSON.stringify({ 
                //     "companySigDate": "2020-11-23T11:19:27.017Z", 
                //     "companySignatureName": "test", 
                //     "documentName": "test", 
                //     "documentStatus": "test", 
                //     "documentType": "test", 
                //     "employeeNumber": "test", 
                //     "employeeSigDate": "2020-11-23T11:19:27.017Z", 
                //     "employeeSignatureName": "test" 
                // })

                //   }).then(resp => resp.json())
                //     .then(function(resp) {
                //       console.log(JSON.stringify(resp));
                //       console.log(JSON.stringify(resp.data))})
            //   let response = await fetch(url, {
            //         method: 'POST',
            //         headers: {
            //             "X-Auth": props.token
            //         },
            //         body: formJson

            //     });
      
            //     let data = await response.json()
            //     console.log("data: " + JSON.stringify(data));
                // setTableData(data.data);
      
      
            } catch (error:any) {
                // setError(error.message);
            } 
        }
        const newDate = new Date().toISOString();

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={popOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            // const documentStatus = formJson.documentStatus;
            // const companySigDate = Date.now();
            // const companySignatureName = formJson.companySignatureName;
            // const documentName = formJson.documentName;
            // const documentType = formJson.documentType;
            // const employeeNumber = formJson.ememployeeNumberil;
            // const employeeSigDate = Date.now();
            // const employeeSignatureName = formJson.employeeSignatureName;
            // newDate.toISOString();
            console.log(newDate);
            console.log(formJson);
            tableAdd(event, formJson);
          },
        }}
      >
        <DialogTitle>Добавить запись</DialogTitle>
        <DialogContent>
          <DialogContentText>
                Заполните поля
          </DialogContentText>
          {/* <TextField
            margin="dense"
            id="id"
            name="id"
            label="ID"
            variant="standard"
            defaultValue={Date.now()}
            slotProps={{
            input: {
              readOnly: true,
            },
          }} 
          />*/}
          <TextField
            autoFocus
            required
            margin="dense"
            id="documentStatus"
            name="documentStatus"
            label="Document Status"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            id="companySigDate"
            name="companySigDate"
            label="Company Signature Date"
            variant="standard"
            defaultValue={newDate}
            slotProps={{
            input: {
              readOnly: true,
            },
          }}
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="companySignatureName"
            name="companySignatureName"
            label="Company Signature Name"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="documentName"
            name="documentName"
            label="Document Name"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="documentType"
            name="documentType"
            label="Document Type"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="employeeNumber"
            name="employeeNumber"
            label="Employee Number"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            id="employeeSigDate"
            name="employeeSigDate"
            label="Employee Signature Date"
            variant="standard"
            defaultValue={newDate}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="employeeSignatureName"
            name="employeeSignatureName"
            label="Employee Signature Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit">Добавить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
