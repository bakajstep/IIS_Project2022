import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLogin} from "../../state/UserState";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import bcrypt from "bcryptjs-react";

interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (data: IFormInput) => {
        const password = data.password;
        data.password = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.post('/api/person/login', data, optionAxios)
            .then( (res) => {
                dispatch(
                    setLogin<any>({
                        user: res.data.user
            })
                );
                setError("");
                reset(defaultValues);
                navigate("/approvedCourses");
            }).catch(function (error) {
                setError(error.response.data.msg);
                data.password = password;
            })
    }
    const defaultValues: IFormInput = {
        email: "",
        password: ""
    }

    return (
            <Box
                p={2}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h2">
                    Login
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
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
                                autoFocus
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
                                label={errors.password ? "Input required" : "Password"}
                                error={!errors.password ? false : true}
                                id="password"
                                name="password"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                    { error !== "" && (<Alert severity="error">{error}</Alert>)}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
    );
}
export default Login;