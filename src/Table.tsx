
import { Button, Container,Box } from "@mui/material";
import React, { useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogPop from './DialogPop';
import DeleteEditPop from "./DeleteEditPop";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { addRequest } from "./custRequest";

 const TablePage = () => {

  const { state } = useLocation();
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [chosenId, setChosenId] = useState("");
  const [chosenItem, setChosenItem] = useState({
    "id" : "",
    "companySigDate": "", 
                "companySignatureName": "", 
                "documentName": "", 
                "documentStatus": "", 
                "documentType": "", 
                "employeeNumber": "", 
                "employeeSigDate": "", 
                "employeeSignatureName": "" 
  });


  const handleDelOpen = () => {
    setDeleteOpen(true);
};
const handleDelClose = () => {
  setDeleteOpen(false);
};

const handleEditOpen = () => {
  setEditOpen(true);
};
const handleEditClose = () => {
  setEditOpen(false);
};

  console.log("state:" + state)

    const HOST = "https://test.v5.pryaniky.com";
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState<any[]>([]);
    const [token, setToken] = useState("supersecrettoken_for_user1");


    const tableDownload = async (event:any) => {
        event.preventDefault();
        console.log("DOWNLOADING")
        const url = HOST+"/ru/data/v3/testmethods/docs/userdocs/get";;
        try {
          fetch(url, {
            method: "GET",
            headers: {
              "X-Auth": token
            }
          }).then(resp => resp.json())
            .then(function(resp) {
              console.log(resp);
              setTableData(resp.data)})

        } catch (error:any) {
            setError(error.message);
        } 
    }

const openPopChoice = (postId:string) => {
  console.log("hehe");
  setDeleteOpen(true);
}



  const tableEdit = async (postId:string, jsonBody:any) => {
    // event.preventDefault();
    // console.log(user)
    const url = HOST+"/ru/data/v3/testmethods/docs/userdocs/set/" + postId;
    try {
      let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonBody
            // JSON.stringify(
            //   { 
            //     "companySigDate": "2022-12-23T11:19:27.017Z\t", 
            //     "companySignatureName": "test", 
            //     "documentName": "test", 
            //     "documentStatus": "test", 
            //     "documentType": "test", 
            //     "employeeNumber": "test", 
            //     "employeeSigDate": "2022-12-23T11:19:27.017Z\t", 
            //     "employeeSignatureName": "test" 
            // }            
            // ),
        });

        let data = await response.json()
        console.log("data: " + JSON.stringify(data));
        setTableData(data.data);


    } catch (error:any) {
        // setError(error.message);
    } 
    setEditOpen(false)
}

const tableDelete = async (postId:string) => {
  // event.preventDefault();
  // console.log(user)
  const url = HOST+"/ru/data/v3/testmethods/docs/userdocs/delete/" + postId;
  try {
    let response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
            "x-auth": state.token
            }
          ),
      });

      let data = await response.json()
      console.log("data: " + JSON.stringify(data));
      setTableData(data.data);


  } catch (error:any) {
      // setError(error.message);
  } 

  setDeleteOpen(false)
}


function renderInfo(item:any) {
  return (
    <>
      <TableRow key={item.id} selected={true} onClick={() => [setChosenId(item.id), openPopChoice(item.id), setChosenItem(item)]}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.documentStatus}</TableCell>
        <TableCell>{item.employeeNumber}</TableCell>
        <TableCell>{item.documentType}</TableCell>
        <TableCell>{item.documentName}</TableCell>
        <TableCell>{item.companySignatureName}</TableCell>
      <TableCell>{item.employeeSignatureName}</TableCell>
      <TableCell>{item.employeeSigDate}</TableCell>
      <TableCell>{item.companySigDate}</TableCell>
      </TableRow>
    </>
  );
}


    return (
    <Box className="Table">
      <DialogPop open={addOpen} token={token}/>
      <React.Fragment>
      {/* <Button variant="outlined" onClick={handleDelOpen}> delete/edit */}
      {/* </Button> */}
      <Dialog
        open={deleteOpen}
        onClose={handleDelClose}
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
          <Button onClick={handleDelClose}>Отмена</Button>
          <Button onClick={() => [handleDelClose, tableDelete(chosenId)]}>Удалить запись</Button>
          <Button onClick={() => [setDeleteOpen(false), setEditOpen(true)]}>Изменить запись</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    {/* <Container>Hello</Container> */}
    <Button onClick={tableDownload}> Refresh </Button>

    {/* <Button onClick={() => setAddOpen(true)}> Add </Button> */}
{/* 
    <Button onClick={tableEdit}> Edit </Button>
    <Button onClick={tableDelete}> Delete </Button> */}


    <Container>{JSON.stringify(state.token)} </Container>
    {/* <Container>{JSON.stringify(tableData)} </Container> */}


        <Paper
      // sx={{
      //   width: "80vw",
      // }}
    >
      <TableContainer sx={{ height: "80vh", width: "90vw" }}>
        <Table
          stickyHeader
          style={{
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 100 }}>ID</TableCell>
              <TableCell style={{ width: 80 }}>Document Status </TableCell>
              <TableCell style={{ width: 80 }}>Employee Number</TableCell>
              <TableCell style={{ width: 80 }}>Document Type</TableCell>
              <TableCell style={{ width: 80 }}>Document Name</TableCell>
              <TableCell style={{ width: 80 }}>Company Signature Name</TableCell>
              <TableCell style={{ width: 80 }}>Employee Signature Name</TableCell>
              <TableCell style={{ width: 120 }}>Employee Sig Date</TableCell>
              <TableCell style={{ width: 120 }}>Company Sig Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((item:any) => {
              return renderInfo(item);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

    <React.Fragment>
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
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
            // console.log(newDate);
            console.log(formJson);
            tableEdit(chosenId, formJson);
          },
        }}
      >
        <DialogTitle>Изменение записи</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="documentStatus"
            name="documentStatus"
            label="Document Status"
            fullWidth
            variant="standard"
            defaultValue={chosenItem?.documentStatus}
          />
            <TextField
            margin="dense"
            id="companySigDate"
            name="companySigDate"
            label="Company Signature Date"
            variant="standard"
            defaultValue={chosenItem?.companySigDate}
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
            defaultValue={chosenItem?.companySignatureName}
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
            defaultValue={chosenItem?.documentName}

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
            defaultValue={chosenItem?.documentType}

            variant="standard"
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="employeeNumber"
            name="employeeNumber"
            label="Employee Number"
            defaultValue={chosenItem?.employeeNumber}

            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            id="employeeSigDate"
            name="employeeSigDate"
            label="Employee Signature Date"
            variant="standard"
            // defaultValue={newDate}
            defaultValue={chosenItem?.employeeSigDate}

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
            defaultValue={chosenItem?.employeeSignatureName}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Отмена</Button>
          <Button type="submit">Изменить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </Box>
    )

}


export default TablePage;

