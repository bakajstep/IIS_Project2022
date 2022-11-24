import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {Alert} from "@mui/material";
import {useSelector} from "react-redux";

interface ICourse {
    label: string,
    description: string,
    type: string,
    price: number,
    guarantor: number
}

const CreateCourse = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<ICourse>();
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
            await axios.post('http://localhost:5000/api/course', data, optionAxios)
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