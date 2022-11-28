import {
    Alert, Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useSelector} from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";

interface IActuality {
    id: number,
    description: string,
}

type DialogProps = {
    idC: number
}

const CreateActualityDialog = ({idC} : DialogProps) => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IActuality>();
    const [actuality, setActuality] = useState<IActuality[]>([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("")
    const user = useSelector((state: any) => state.user);

    const onSubmit = async (data: IActuality) => {
        if (user != null) {
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post(`/api/course/${idC}/actuality`, data, optionAxios)
                .then(function () {
                    setError("");
                    getActuality(idC);
                    setOpen(false);
                })
                .catch(function (error) {
                    setError(error.response.data.message)
                })
        }
    }

    const getActuality = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/actuality`, optionAxios)
            .then(res => {
                setActuality(res.data.actuality);
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const defaultActuality: IActuality =  {
        id: 0,
        description: "",
    }

    const handleClose = () => {
        setOpen(false);
        reset(defaultActuality);
    };

    useEffect(() => {
        getActuality(idC);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Box sx={{mt: 3, mb: 2, width: "100%"}}>
            <TableContainer sx={{mb: 5}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actuality.map((actual) => (
                            <TableRow
                                key={actual.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{actual.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                    variant="contained"
                    fullWidth
                    onClick={handleClickOpen}>
                Create Actuality
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create actuality</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new actuality
                    </DialogContentText>
                    {error !== ""  && (<Alert severity="error">{error}</Alert>)}
                    <Controller
                        name={"description"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                margin={"normal"}
                                onChange={onChange}
                                value={value}
                                type="text"
                                label={errors.description ? "Input required" : "Description"}
                                error={!errors.description ? false : true}
                                name="oldPassword"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                        reset(defaultActuality);
                        setError("");
                    }}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default CreateActualityDialog;