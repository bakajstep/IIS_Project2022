import {
    Alert, Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
}

type DialogProps = {
    idC: number
    idG: number
}

const AddLectorsDialog = ({idC, idG} : DialogProps) => {

    const defaultUser: IUser = {
        id: 0,
        name: "",
        surname: "",
        email: "",
    }

    const [guarantor, setGuarantor] = useState<IUser>(defaultUser);
    const [lectors, setLectorss] = useState<IUser[]>([]);
    const [obj, setObj] = useState<IUser[]>([]);
    const [lector, setLector] = useState<IUser[]>([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const setLectors = async (data: IUser[]) => {
        for (let i = 0; i < data.length; i++){
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            console.log(data);
            await axios.put(`/api/course/${idC}/lector/${data[i].id}`, optionAxios)
                .then(function () {
                    setError("");
                    getLectors(idC);
                    setOpen(false);
                })
                .catch(function (error) {
                    setError(error.response.data.message)
                })
        }
    }

    const getLectors = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/lector`, optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.lector;
                setLectorss(obj);
            });
    }

    const getGuarantor = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/person/${id}`, optionAxios)
            .then(res => {
                setGuarantor(res.data.user);
            })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 3},
        {field: 'name', headerName: 'Name', flex: 4},
        {field: 'surname', headerName: 'Surname', flex: 4},
        {field: 'email', headerName: 'Email', flex: 4}
    ];

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('/api/person', optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.user;
                setObj(obj)
            })
    }

    useEffect(() => {
        getValues();
        getLectors(idC);
        getGuarantor(idG);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{mt: 3, mb: 2, width: "100%"}}>
            <TableContainer sx={{mb: 5}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Guarantor Name</TableCell>
                            <TableCell align="left">Guarantor Surname</TableCell>
                            <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={guarantor.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">
                                {guarantor.name}
                            </TableCell>
                            <TableCell align="left">{guarantor.surname}</TableCell>
                            <TableCell align="left">{guarantor.email}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer sx={{mb: 5}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Lector Name</TableCell>
                            <TableCell align="left">Lector Surname</TableCell>
                            <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lectors.map((actual) => (
                            <TableRow
                                key={actual.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{actual.name}</TableCell>
                                <TableCell align="left">{actual.surname}</TableCell>
                                <TableCell align="left">{actual.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                fullWidth
                onClick={handleClickOpen}>
                Add Lectors
            </Button>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Create actuality</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select lectors
                    </DialogContentText>
                    {error !== ""  && (<Alert severity="error">{error}</Alert>)}
                    <DataGrid
                        rows={obj}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = obj.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            setLector(selectedRowData);
                        }}
                        sx={{
                            marginTop: 1 ,height: 631, maxWidth: 900, boxShadow: 4,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                        setError("");
                    }}>Cancel</Button>
                    <Button onClick={() => {setLectors(lector)
                        navigate("/coursesGuarantor")
                    }}>Select</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default AddLectorsDialog;