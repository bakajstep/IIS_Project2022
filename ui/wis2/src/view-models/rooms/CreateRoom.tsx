import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";

interface IFormInput {
    label: string,
    capacity: number
}

const CreateRoom = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();

    const onSubmit = async (data: IFormInput) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let res = await axios.post('http://localhost:5000/api/room', data, optionAxios);
        reset(defaultValues);
    }
    const defaultValues: IFormInput = {
        label: "",
        capacity: 0
    }

    return (
        <Box m="20px">
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"}>
                Create room
            </Typography>
            <form>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                    <Controller
                        name={"label"}
                        rules={{required: true}}
                        control={control}
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
                                sx={{gridColumn: "span 4", justifyContent: "center"}}
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
                                sx={{gridColumn: "span 4"}}
                            />
                        )}
                    />
                </Box>
                <Box display="flex" justifyContent="Center" mt="50px">
                    <Button onClick={handleSubmit(onSubmit)} color="secondary" variant="contained">
                        Create room
                    </Button>
                </Box>

            </form>
        </Box>
    );
}
export default CreateRoom;