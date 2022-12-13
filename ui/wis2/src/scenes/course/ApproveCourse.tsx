import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@mui/material";
import {Box, IconButton, List, ListItemText} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import * as React from "react";
import Typography from "@mui/material/Typography";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";

interface ICourse {
    id: number,
    label: string,
    description: string,
    type: string,
    guarantor_id: null
}



const ApproveCourse = () => {
    const [obj, setObj] = useState<ICourse[]>([]);

    const approveCourse = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/course/${id}/approved`, optionAxios).then(res => {
            getValues();
        })
    }
    const deleteValue = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.delete(`/api/course/${id}`, optionAxios).then(res => {
            getValues();
        })
    }

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('/api/course/pending', optionAxios)
            .then(res => {
                let obj: ICourse[] = res.data.course;
                setObj(obj)
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const columns: GridColDef[] = [
        /*{field: 'id', headerName: 'ID', flex: 3},*/
        {field: 'label', headerName: 'Label', flex: 4},
        {field: 'description', headerName: 'Description', flex: 12},
        {field: 'type', headerName: 'Type', flex: 6},
        {field: 'price', headerName: 'Price', flex: 4},
        {field: 'capacity', headerName: 'Capacity', flex: 4},
        {field: 'approve', headerName: 'Approve', flex:4,
            renderCell: (cellValues) => {
                return (
                    <Button color={"success"} onClick={() => approveCourse(cellValues.row.id)}>
                        <DoneIcon/>
                    </Button>)
            }},
        {field: 'reject', headerName: 'Reject', flex:4,
            renderCell: (cellValues) => {
                return (
                    <Button color={"error"} onClick={() => deleteValue(cellValues.row.id)}>
                        <CloseIcon/>
                    </Button>)
            }},
    ];
    return (
            <Box>
                <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"} display={"flex"}
                        justifyContent={"center"}>
                    Approve courses
                </Typography>
                <Box display="flex" justifyContent="center">
                    <DataGrid
                        style={{padding: 5, height: 600, maxWidth: 900}}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        rows={obj}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        components={{Toolbar: GridToolbar}}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: {debounceMs: 500},
                            },
                        }}
                        sx={{
                            boxShadow: 4,
                        }}
                    />
                </Box>
            </Box>
        /*<Box padding="20px" display="flex" justifyContent={"center"} position={"relative"}>
            <List sx={{maxWidth: '100%', bgcolor: 'background.paper'}}>
                {obj.map((value: any) => (
                    <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="">
                            </IconButton>
                        }
                    >
                        <ListItemText primary={`Course Name: ${value.label} description: ${value.description} type: ${value.type} price: ${value.price}`}/>
                        <Button color={"success"} onClick={() => approveCourse(value.id)}>
                            <DoneIcon/>
                        </Button>
                        <Button color={"error"} onClick={() => deleteValue(value.id)}>
                            <CloseIcon/>
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>*/
    );
}
export default ApproveCourse;