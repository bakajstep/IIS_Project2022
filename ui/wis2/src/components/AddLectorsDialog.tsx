import {
    Alert,
    Button,
    ButtonBase,
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

interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    admin: boolean
}

type DialogProps = {
    idC: number
}

const AddLectorsDialog = ({idC} : DialogProps) => {
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
                .then(function (response) {
                    setError("");
                    setOpen(false);
                })
                .catch(function (error) {
                    setError(error.response.data.message)
                })
        }
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <ButtonBase sx={{mt: 3, mb: 2, width: "100%"}}>
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
        </ButtonBase>
    );
}
export default AddLectorsDialog;