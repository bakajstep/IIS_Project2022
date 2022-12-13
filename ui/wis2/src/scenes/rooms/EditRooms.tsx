import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {Alert} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

interface IRoom {
    id: number;
    label: string;
    capacity: number;
}

const EditRoom = () => {
    const {handleSubmit, reset, control, formState: {errors}, setValue} = useForm<IRoom>();
    const [error, setError] = useState("");
    const [obj, setObj] = useState<IRoom[]>([]);

    const setValues = async (id: number, label: string, capacity: number) => {
        setValue('id', id);
        setValue('label', label);
        setValue('capacity', capacity);
    }

    const columns: GridColDef[] = [
        {field: 'label', headerName: 'Label', flex: 4},
        {field: 'capacity', headerName: 'Capacity', flex: 4},
    ];

    const deleteRoom = async (data: IRoom) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.delete(`/api/room/${data.id}`, optionAxios)
            .then(() => {
                reset(defaultValues);
                setError("");
            }).catch(function (error) {
                setError(error.response.data.msg);
            })
        await getValues();
    }

    const onSubmit = async (data: IRoom) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/room/${data.id}`, data, optionAxios);
        reset(defaultValues);
        await getValues();
    }

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('/api/room', optionAxios)
            .then(res => {
                let obj: IRoom[] = JSON.parse(res.data.room)
                setObj(obj)
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const defaultValues: IRoom = {
        id: 0,
        label: "",
        capacity: 0
    }

    return (
        <Box p={2}
             sx={{
                 marginTop: 8,
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center'
             }}>
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"}>
                Room
            </Typography>
            <Box component={"form"} noValidate sx={{mt: 1}}>
                <Controller
                    name={"label"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="text"
                            label={errors.label ? "Room label required" : "Label"}
                            error={!errors.label ? false : true}
                            name="label"
                            sx={{width: "49%", mr: "2%"}}
                            focused={value !== ""}
                        />
                    )}
                />
                <Controller
                    name={"capacity"}
                    control={control}
                    rules={{required: true, min: 1}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="number"
                            label={errors.capacity ? "Bad capacity format" : "Capacity"}
                            error={!errors.capacity ? false : true}
                            name="capacity"
                            sx={{width: "49%"}}
                            focused={value !== 0}
                        />
                    )}
                />
                {error !== "" && (<Alert severity="error">{error}</Alert>)}
                <Button type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2, width: "49%", mr: "2%"}}
                        onClick={handleSubmit(onSubmit)}>
                    Update room
                </Button>
                <Button type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit(deleteRoom)}
                        sx={{mt: 3, mb: 2, width: "49%"}}>
                    Delete Room
                </Button>
                <Box marginTop={"20px"} display="flex" justifyContent={"center"}>
                    <DataGrid
                        style={{padding: 5, height: 381, maxWidth: 900}}
                        rows={obj}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowClick={(params) => {
                            setValues(params.row.id, params.row.label, params.row.capacity);
                        }}
                        sx={{
                            boxShadow: 4,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
export default EditRoom;