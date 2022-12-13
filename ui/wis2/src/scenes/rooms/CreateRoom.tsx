import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {Alert} from "@mui/material";

interface IFormInput {
    label: string,
    capacity: number
}

const CreateRoom = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();
    const [error, setError] = useState("");

    const onSubmit = async (data: IFormInput) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.post('/api/room', data, optionAxios)
        .then((res) => {
                reset(defaultValues);
                setError("");
            }).catch(function (error) {
                setError(error.response.data.msg);
            })

    }
    const defaultValues: IFormInput = {
        label: "",
        capacity: 0
    }

    return (
            <Box
                p={2} sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Typography component={"h1"} variant={"h2"}>
                    Create room
                </Typography>
                <Box component={"form"} noValidate sx={{mt:1}}>
                    <Controller
                        name={"label"}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^.*[^ ].*$/u,
                                message: "Not valid label"
                            }
                        }}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                margin={"normal"}
                                onChange={onChange}
                                value={value}
                                type="text"
                                label={errors.label ? errors.label.message : "Label"}
                                error={!errors.label ? false : true}
                                name="label"
                            />
                        )}
                    />
                    <Controller
                        name={"capacity"}
                        control={control}
                        rules={{required: true, min: 1}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                margin={"normal"}
                                onChange={onChange}
                                value={value}
                                type="number"
                                label={errors.capacity ? "Bad capacity format" : "Capacity"}
                                error={!errors.capacity ? false : true}
                                name="capacity"
                            />
                        )}
                    />
                    { error !== "" && (<Alert severity="error">{error}</Alert>)}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit(onSubmit)}>
                        Create room
                    </Button>
            </Box>
        </Box>
    );
}
export default CreateRoom;