import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {Alert, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";

interface ICourse {
    label: string,
    description: string,
    type: string,
    price: number,
    capacity: number,
    guarantor: number
}

const CreateCourse = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<ICourse>();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [error, setError] = useState("")
    const user = useSelector((state: any) => state.user);

    const onSubmit = async (data: ICourse) => {
        if (user != null){
            data.guarantor = user.id;
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post('/api/course', data, optionAxios)
                .then(function (response) {
                    setError("");
                })
                .catch(function (error) {
                    setError(error.message);
                })
                .then(() => {
                    reset(defaultValues);
                })
        }
    }
    const defaultValues: ICourse = {
        label: "",
        description: "",
        type: "",
        price: 0,
        capacity: 0,
        guarantor: 0
    }

    return (
        <Box m="20px">
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"}>
                Create course
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
                    { error !== "" && (<Alert severity="error">{error}</Alert>)}
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
                        name={"description"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="text"
                                label={errors.description ? "Input required" : "Description"}
                                error={!errors.description ? false : true}
                                name="description"
                                sx={{gridColumn: "span 4"}}
                            />
                        )}
                    />
                    <Controller
                        name={"type"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="text"
                                label={errors.type ? "Input required" : "Type"}
                                error={!errors.type ? false : true}
                                name="type"
                                sx={{gridColumn: "span 4"}}
                            />
                        )}
                    />
                    <Controller
                        name={"price"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="number"
                                label={errors.price ? "Input required" : "Price"}
                                error={!errors.price ? false : true}
                                name="price"
                                sx={{gridColumn: "span 4"}}
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
                    {/*
                    <FormControlLabel
                        control={
                            <Controller
                                name={""}
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <Checkbox
                                        defaultChecked={false}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}/>
                        }
                        label={"Admin"}
                    />*/}
                </Box>
                <Box display="flex" justifyContent="Center" mt="50px">
                    <Button onClick={handleSubmit(onSubmit)} color="secondary" variant="contained">
                        Create course
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
export default CreateCourse;