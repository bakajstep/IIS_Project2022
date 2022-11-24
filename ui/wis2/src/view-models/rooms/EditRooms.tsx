import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {IconButton, List, ListItemText, useMediaQuery} from "@mui/material";
import ListItem from "@mui/material/ListItem";

interface IRoom {
    id: number;
    label: string;
    capacity: number;
}

const EditRoom = () => {
    const {handleSubmit, reset, control, formState: {errors}, setValue} = useForm<IRoom>();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [obj, setObj] = useState<IRoom[]>([]);

    const setValues = async (id: number, label: string, capacity: number) => {
        setValue('id', id);
        setValue('label', label);
        setValue('capacity', capacity);
    }

    const deleteRoom = async (data: IRoom) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let res = await axios.delete(`http://localhost:5000/api/room/${data.id}`, optionAxios);
        reset(defaultValues);
        await getValues();
    }

    const onSubmit = async (data: IRoom) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let res = await axios.put(`http://localhost:5000/api/room/${data.id}`, data, optionAxios);
        reset(defaultValues);
        await getValues();
    }

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('http://localhost:5000/api/room', optionAxios)
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
        <Box m="20px">
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"}>
                Room
            </Typography>
            <form>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    <Controller
                        name={"label"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}

                                variant="filled"
                                type="text"
                                label={errors.label ? "Input required" : "Label"}
                                error={!errors.label ? false : true}
                                name="label"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                    <Controller
                        name={"capacity"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="number"
                                label={errors.capacity ? "Input required" : "Capacity"}
                                error={!errors.capacity ? false : true}
                                name="capacity"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                </Box>
                <Box display={"flex"} position={"relative"} justifyContent="Center" mt="50px">
                    <Button onClick={handleSubmit(onSubmit)} color="secondary" variant="contained"
                            sx={{margin: "20px"}}>
                        Update room
                    </Button>
                    <Button onClick={handleSubmit(deleteRoom)} color="secondary" variant="contained"
                            sx={{margin: "20px"}}>
                        Delete Room
                    </Button>
                </Box>
                <Box padding="20px" display="flex" justifyContent={"center"}>
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
                                <Button onClick={() => setValues(value.id, value.label, value.capacity)}>
                                    <ListItemText primary={`Label: ${value.label} Capacity: ${value.capacity}`}/>
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </form>
        </Box>
    );
}
export default EditRoom;