import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from "react-hook-form";
import {Checkbox, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import axios from 'axios';

interface IRegister {
    name: string;
    surname: string;
    email: string;
    password: string;
    admin: boolean;
}

const Register = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IRegister>();

    const onSubmit = async (data: IRegister) => {
        if (data.admin === undefined){
            data.admin = false;
        }
        alert(JSON.stringify(data));
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.post('http://localhost:5000/api/person/register', data, optionAxios).then( (res) => {
            reset(defaultValues);
        });
    }
    const defaultValues: IRegister = {
        name: "",
        surname: "",
        email: "",
        password: "",
        admin: false
    }

    return (
        <Box m="20px">
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"}>
                Register
            </Typography>
            <form>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                    <Controller
                        name={"name"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}

                                variant="filled"
                                type="text"
                                label={errors.name ? "Input required" : "First Name"}
                                error={!errors.name ? false : true}
                                id="firstName"
                                name="firstName"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                    <Controller
                        name={"surname"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="text"
                                label={errors.surname ? "Input required" : "Last Name"}
                                error={!errors.surname ? false : true}
                                id="lastName"
                                name="lastName"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                    <Controller
                        name={"email"}
                        rules={{
                            required: true,
                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Not valid Email"}
                        }}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                inputMode={"email"}
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="text"
                                label={errors.email ? "Bad email format" : "Email"}
                                error={!errors.email ? false : true}
                                id="email"
                                name="email"
                                sx={{gridColumn: "span 4"}}
                            />
                        )}
                    />
                    <Controller
                        name={"password"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                required
                                fullWidth
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="password"
                                label={errors.password ? "Input required" : "Password"}
                                error={!errors.password ? false : true}
                                id="password"
                                name="password"
                                sx={{gridColumn: "span 4"}}
                            />
                        )}
                    />
                    <FormControlLabel
                        control={
                            <Controller
                                name={"admin"}
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
                    />
                </Box>
                <Box display="flex" justifyContent="Center" mt="50px">
                    <Button onClick={handleSubmit(onSubmit)} color="secondary" variant="contained">
                        Create New User
                    </Button>
                </Box>

            </form>
        </Box>
    );
}
export default Register;