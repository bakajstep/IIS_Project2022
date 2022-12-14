import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from "react-hook-form";
import {Alert, Checkbox, FormControlLabel} from "@mui/material";
import axios from 'axios';
import bcrypt from 'bcryptjs-react'
import {IUserRegister} from "../../interfaces/User";

const Register = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IUserRegister>();
    const [error, setError] = useState("");

    const onSubmit = async (data: IUserRegister) => {
        if (data.admin === undefined) {
            data.admin = false;
        }
        const password = data.password;
        data.password = bcrypt.hashSync(password,  '$2a$10$CwTycUXWue0Thq9StjUM0u')
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios.post('/api/person/register', data, optionAxios)
            .then(() => {
            reset(defaultValues);
            setError("");
        }).catch(function (error) {
            setError(error.response.data.msg);
            data.password = password;
        })
    }
    const defaultValues: IUserRegister = {
        name: "",
        surname: "",
        email: "",
        password: "",
        admin: false
    }

    return (
        <Box p={2}
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'}}>
            <Typography component={"h1"} variant={"h2"}>
                Register
            </Typography>
            <Box component={"form"} noValidate sx={{mt: 1}}>
                <Controller
                    name={"name"}
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-].*[^ ].*$/u,
                            message: "Not valid name"
                        }
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="text"
                            label={errors.name ? "Bad name format" : "First Name"}
                            error={!errors.name ? false : true}
                            id="firstName"
                            name="firstName"
                            sx={{width: "49%", mr: "2%"}}
                        />
                    )}
                />
                <Controller
                    name={"surname"}
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-].*[^ ].*$/u,
                            message: "Not valid surname"
                        }
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="text"
                            label={errors.surname ? "Bad surname format" : "Last Name"}
                            error={!errors.surname ? false : true}
                            id="lastName"
                            name="lastName"
                            sx={{width: "49%"}}
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
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="text"
                            label={errors.email ? "Bad email format" : "Email"}
                            error={!errors.email ? false : true}
                            id="email"
                            name="email"
                            autoComplete="email"
                        />
                    )}
                />
                <Controller
                    name={"password"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            fullWidth
                            margin={"normal"}
                            onChange={onChange}
                            value={value}
                            type="password"
                            label={errors.password ? "Password required" : "Password"}
                            error={!errors.password ? false : true}
                            id="password"
                            name="password"
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
                { error !== "" && (<Alert severity="error">{error}</Alert>)}
                <Button type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit(onSubmit)}>
                    Create New User
                </Button>
            </Box>
        </Box>
    );
}
export default Register;