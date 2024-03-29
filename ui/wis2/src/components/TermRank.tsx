/**
 @author Aliaksei Slepitsa
 */

import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {DataGrid, GridColDef,} from "@mui/x-data-grid";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {IDate, IDateStud, ITerm} from "../interfaces/Course";

type TermRankProps = {
    courseID: number
}

const TermRank = ({courseID}: TermRankProps) => {

    const defaultTerm: ITerm = {
        id: 0,
        course_id: 0,
        label: "",
        min_points: 0,
        max_points: 0,
        from_time: 0,
        to_time: "",
        room_id: "",
    }

    const [date, setDate] = useState<string | number>("");
    const [terms, setTerms] = useState<ITerm[]>([]);
    const [term, setTerm] = useState<ITerm>(defaultTerm);
    const [dateStud, setDateStud] = useState<IDateStud[]>([]);
    const [dates, setDates] = useState<IDate[]>([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("")
    const [dateID, setDateID] = useState<string | number>(0);

    const columns: GridColDef[] = [
        {field: 'label', headerName: 'Label', flex: 5},
        {field: 'min_points', headerName: 'Minimum points', flex: 4},
        {field: 'max_points', headerName: 'Maximum points', flex: 4},
        {field: 'from_time', headerName: 'From time', flex: 5},
        {field: 'to_time', headerName: 'To time', flex: 5},
    ];

    const columnsDateStrud: GridColDef[] = [
        {field: 'name', headerName: 'Name', flex: 5},
        {field: 'surname', headerName: 'Surname', flex: 5},
        {field: 'email', headerName: 'Email', flex: 4},
        {field: 'points', headerName: 'Points', type: "number", flex: 4, editable: true},
    ];

    const setNewPoints = async (idR: any, points: number) => {
        const updatedRows = dateStud.map((row) => {
            if (row.person_id === idR) {
                return {...row, points};
            }
            return row;
        });
        setDateStud(updatedRows);
    }

    const submitRank = async () => {
        for (let i = 0; i < dateStud.length; i++) {
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post(`/api/rank/${courseID}/person/${dateStud[i].person_id}/termDate/${dateID}`, dateStud[i], optionAxios)
                .then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    const getDateStud = async (idT: number, idD: string | number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/term/${idT}/date/${idD}`, optionAxios)
            .then(res => {
                let obj: IDateStud[] = res.data.student;
                setDateStud(obj);
            })
    }

    const getDates = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/term/${id}/date`, optionAxios)
            .then(res => {
                let obj: IDate[] = res.data.term;
                setDates(obj);
            })
    }

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${courseID}/term`, optionAxios)
            .then(res => {
                let obj: ITerm[] = res.data.term;
                setTerms(obj);
            })
    }

    const handleCreateNewItem = (event: SelectChangeEvent<typeof date>) => {
        setDateID(event.target.value);
        setDate(event.target.value);
        getDateStud(term.id, event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Box>
            <DataGrid
                style={{padding: 5, height: 381, width: 900}}
                rows={terms}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={(params: any) => {
                    setTerm(params.row);
                    getDates(params.row.id);
                    setOpen(true);
                }}
                sx={{
                    boxShadow: 4,
                }}
            />
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Create actuality</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select Term date
                    </DialogContentText>
                    {error !== "" && (<Alert severity="error">{error}</Alert>)}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={date}
                        onChange={handleCreateNewItem}
                        sx={{mb: 3}}
                    >
                        {dates.map((date) => (
                            <MenuItem value={date.id}>{date.date}</MenuItem>
                        ))}
                    </Select>
                    {dateStud !== null && (
                        <DataGrid
                            style={{padding: 5, height: 381, maxWidth: 900}}
                            rows={dateStud}
                            columns={columnsDateStrud}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row: any) => row.person_id}
                            onCellEditCommit={(row) => {
                                setNewPoints(row.id, row.value);
                            }}
                            sx={{
                                boxShadow: 4,
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                        setTerm(defaultTerm)
                        setDate("")
                        setDates([])
                        setDateStud([])
                        setError("");
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        submitRank()
                        setTerm(defaultTerm)
                        setDate("")
                        setDates([])
                        setDateStud([])
                        handleClose();
                    }}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default TermRank;