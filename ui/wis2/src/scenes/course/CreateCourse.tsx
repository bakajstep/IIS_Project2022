import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {Alert, Checkbox, FormControlLabel} from "@mui/material";
import {useSelector} from "react-redux";
import {ICourse} from "../../interfaces/Course";

const CreateCourse = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<ICourse>();
    const [error, setError] = useState("")
    const user = useSelector((state: any) => state.user);

    const onSubmit = async (data: ICourse) => {
        if (user != null) {
            data.guarantor = user.id;
            if (data.autoReg == null){
                data.autoReg = false;
            }
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post('/api/course', data, optionAxios)
                .then(function (response) {
                    setError("");
                    reset(defaultValues);
                })
                .catch(function (error) {
                    setError(error.response.data.message);
                })
        }
    }
    const defaultValues: ICourse = {
        label: "",
        description: "",
        type: "",
        price: 0,
        capacity: 0,
        autoReg: false,
        guarantor: 0
    }

    return (
        <Box p={2}
             sx={{
                 marginTop: 8,
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center'
             }}>
            <Typography component={"h1"} variant={"h2"}>
                Create course
            </Typography>
            <Box
                component={"form"} noValidate sx={{mt: 1}}
            >
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
                            label={errors.label ? "Not valid label" : "Label"}
                            error={!errors.label ? false : true}
                            name="label"
                        />
                    )}
                />
                <Controller
                    name={"description"}
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value: /^.*[^ ].*$/u,
                            message: "Not valid description"
                        }
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            fullWidth
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="text"
                            label={errors.description ? "Not valid description" : "Description"}
                            error={!errors.description ? false : true}
                            name="description"
                        />
                    )}
                />
                <Controller
                    name={"type"}
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value: /^.*[^ ].*$/u,
                            message: "Not valid type"
                        }
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            fullWidth
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="text"
                            label={errors.type ? "Not valid type" : "Type"}
                            error={!errors.type ? false : true}
                            name="type"
                        />
                    )}
                />
                <Controller
                    name={"price"}
                    control={control}
                    rules={{required: true, min: 0}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            fullWidth
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="number"
                            label={errors.price ? "Bad price format" : "Price"}
                            error={!errors.price ? false : true}
                            name="price"
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
                            sx={{gridColumn: "span 4"}}
                        />
                    )}
                />
                {
                    <FormControlLabel
                        control={
                            <Controller
                                name={"autoReg"}
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <Checkbox
                                        defaultChecked={false}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}/>
                        }
                        label={"Auto registration"}
                    />}
                {error !== "" && (<Alert severity="error">{error}</Alert>)}
                <Button type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit(onSubmit)}>
                    Create course
                </Button>
            </Box>
        </Box>
    );
}
export default CreateCourse;