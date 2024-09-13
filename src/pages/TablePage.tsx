
import { Button, Container,Box, CircularProgress, DialogContentText, Skeleton } from "@mui/material";
import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import DialogPop from './DialogPop';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { HOST, EDIT_L,DEL_L,DOWNLOAD_L, CREATE_L } from '../axios/vars';
import { axiosInstance } from '../axios/custRequest';
import { addRequest } from "../axios/custRequest";
import { useSelector } from 'react-redux';



 const TablePage = () => {

  const token_check = sessionStorage.getItem('token');
  const currentUser = useSelector((state:any) => state.auth) 
  const [token, setToken] = useState(token_check === null ? currentUser.token : token_check);
  const delay = (ms:any) => new Promise(res => setTimeout(res, ms));
  const [loading, setLoading] = useState(false);
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
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const newDate = new Date().toISOString();

  const handlePopOpen = () => {
    setAddOpen(true);
  };



useEffect(() => {
    tableDownload();
  }, []);
const handleDelClose = () => {
  setDeleteOpen(false);
};
const handleEditClose = () => {
  setEditOpen(false);
};

    const tableDownload = async () => {
        setLoading(true);
        console.log("DOWNLOADING");
        axiosInstance.defaults.headers.common["x-auth"] = token; 
        const url = HOST+DOWNLOAD_L;
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
        setLoading(false);
    }

const openPopChoice = (postId:string) => {
  console.log("hehe");
  setDeleteOpen(true);
}


const handleEdit = async (postId:string, jsonBody:any) => {
  setLoading(true);
  await tableEdit(postId,jsonBody);
  await delay(1000);
  await tableDownload(); 
  setLoading(false);
}

  const tableEdit = async (postId:string, jsonBody:any) => {

    axiosInstance.defaults.headers.common["x-auth"] = token; 
    const url = HOST+EDIT_L + postId;
    try {
      const res = addRequest(
         url, 
         jsonBody,
         axiosInstance
      );
      console.log("axios res:" + JSON.stringify(res));      

 } catch (error:any) {
     setError(error.message);
 } 
    setEditOpen(false);
}

const handleDel = async (postId:string) => {
  setLoading(true);
  await tableDelete(postId);
  await delay(1000);
  await tableDownload(); 
  setLoading(false);
}


const tableDelete = async (postId:string) => {
  const url = HOST+DEL_L + postId;
    console.log("url: " + url);

  try {
    const res = addRequest(
      url, "", axiosInstance
   );
   console.log("axios res:" + JSON.stringify(res));


  } catch (error:any) {
      console.log(error.message);
  } 

  setDeleteOpen(false)
}


function renderInfo(item:any) {
  return (
    <>
      <TableRow
      className="p-4 border-b border-blue-gray-50"
      key={item.id} selected={true} onClick={() => [setChosenId(item.id), openPopChoice(item.id), setChosenItem(item)]}>
        <TableCell className="p-4 border-b border-blue-gray-50">{item.id}</TableCell>
        <TableCell className="p-4 border-b border-blue-gray-50">{item.documentStatus}</TableCell>
        <TableCell className="p-4 border-b border-blue-gray-50">{item.employeeNumber}</TableCell>
        <TableCell className="p-4 border-b border-blue-gray-50">{item.documentType}</TableCell>
        <TableCell className="p-4 border-b border-blue-gray-50">{item.documentName}</TableCell>
        <TableCell className="p-4 border-b border-blue-gray-50">{item.companySignatureName}</TableCell>
      <TableCell className="p-4 border-b border-blue-gray-50">{item.employeeSignatureName}</TableCell>
      <TableCell className="p-4 border-b border-blue-gray-50">{item.employeeSigDate}</TableCell>
      <TableCell className="p-4 border-b border-blue-gray-50">{item.companySigDate}</TableCell>
      </TableRow>
    </>
  );
}


// ////////////////////////////////////

const [input, setInput] = useState({
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSignatureName: "",
})
const handelInput = (event:any) => {
  event.preventDefault();
  const { name, value } = event.target;
  console.log(name, value)
  setInput({ ...input, [name]: value });
}


const [popOpen, setPopOpen] = useState(false);
const handleClickOpen = () => {
  setPopOpen(true);
};

const handleClose = () => {
  setPopOpen(false);
};


const handleAdd = async (formJson:any) => {
  setLoading(true);
  await tableAdd(formJson);
  await delay(1000);
  await tableDownload(); 
  setLoading(false);
}

const tableAdd = async (
  // event:any,
   formJson:any) => {
  // event.preventDefault();
  setLoading(true);
  const url = HOST+CREATE_L;
  console.log("formJson " + JSON.stringify(formJson))
  axiosInstance.defaults.headers.common["x-auth"] = token; 
  try {
       const res = addRequest(
          url, formJson,  axiosInstance
       );
       console.log("axios res:" + JSON.stringify(res));      

  } catch (error:any) {
      console.log(error.message);
  } 
  setInput({
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSignatureName: "",
});

await delay(1000);
await tableDownload(); 
setLoading(false);

  handleClose();
}

    return (
      <Box> 
      {loading &&  <CircularProgress size={20}/> }
    <Box className="Table">
      <React.Fragment>
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
          <Button onClick={() => [handleDelClose, handleDel(chosenId)]}>Удалить запись</Button>
          <Button onClick={() => [setDeleteOpen(false), setEditOpen(true)]}>Изменить запись</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    <Button onClick={tableDownload} > Обновить данные </Button>

{loading===true ? 
( <Skeleton variant="rectangular" width="90vw" height="80vh" />) :
    (    <Paper>
      <TableContainer
       sx={{ height: "80vh", width: "90vw" }}
       >
        <Table
        className="w-full min-w-max table-auto text-left"
          stickyHeader
        >
          <TableHead
          className="bg-yellow-200 border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
            <TableRow>
              <TableCell 
                  className="font-normal leading-none opacity-70 w-8" 
                  >ID</TableCell>
              <TableCell  
              className="font-normal leading-none opacity-70 w-8" 
              >Document Status </TableCell>
              <TableCell className="font-normal leading-none opacity-70 w-8" 
              >Employee Number</TableCell>
              <TableCell className="font-normal leading-none opacity-70 w-8">Document Type</TableCell>
              <TableCell className="font-normal leading-none opacity-70 w-8">Document Name</TableCell>
              <TableCell className="font-normal leading-none opacity-70 w-8">Company Signature Name</TableCell>
              <TableCell className="font-normal leading-none opacity-70 w-8">Employee Signature Name</TableCell>
              <TableCell className="font-normal leading-none opacity-70 w-8">Employee Sig Date</TableCell>
              <TableCell className="font-normal leading-none opacity-70 w-8">Company Sig Date</TableCell>
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
          )}
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
            console.log(formJson);
            handleEdit(chosenId, formJson);
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


    {/* //////////////////// */}

    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Добавить запись
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
            // tableAdd(event, formJson);
            handleAdd(formJson);

          },
        }}
      >
        <DialogTitle>Добавить запись</DialogTitle>
        <DialogContent>
          <DialogContentText>
                Заполните поля
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="documentStatus"
            name="documentStatus"
            label="Document Status"
            fullWidth
            variant="standard"
            value={input.documentStatus}
            onChange={handelInput}
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
            value={input.companySignatureName}
            onChange={handelInput}
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
            value={input.documentName}
            onChange={handelInput}
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
            value={input.documentType}
            onChange={handelInput}
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
            value={input.employeeNumber}
            onChange={handelInput}
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
            value={input.employeeSignatureName}
            onChange={handelInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit">Добавить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </Box>
    </Box>
    )

}


export default TablePage;

