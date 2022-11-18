import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { setLogin } from "../../state/UserState";
import {useNavigate} from "react-router-dom";

interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: IFormInput) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let res = await axios.post('http://localhost:5000/api/person/login', data, optionAxios);
        if (res){
            console.log("login");
            dispatch(
                setLogin({
                    user: res.data.user
                })
            );
            navigate("/");
        }
        reset(defaultValues);
    }
    const defaultValues: IFormInput = {
        email: "",
        password: ""
    }

    return (
        <Box m="20px">
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"}>
                Login
            </Typography>
            <form>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
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
                                sx={{gridColumn: "span 2", justifyContent: "center"}}
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
                                onChange={onChange}
                                value={value}
                                variant="filled"
                                type="password"
                                label={errors.password ? "Input required" : "Password"}
                                error={!errors.password ? false : true}
                                id="password"
                                name="password"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                </Box>
                <Box display="flex" justifyContent="Center" mt="50px">
                    <Button onClick={handleSubmit(onSubmit)} color="secondary" variant="contained">
                        Login
                    </Button>
                </Box>

            </form>
        </Box>
    );
}
export default Login;