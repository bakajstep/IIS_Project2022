/**
 @author Adam Kaňkovský
 */

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import ChangePasswordDialog from "../../components/ChangePasswordDialog";
import {setLogin} from "../../state/UserState";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {IUserUpdate} from "../../interfaces/User";

const Profile = () => {
    const {handleSubmit, reset, control, formState: {errors}, setValue} = useForm<IUserUpdate>();
    const user = useSelector((state: any) => state.user);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setValues = () => {
        setValue('name', user.name);
        setValue('surname', user.surname);
        setValue('email', user.email);
    }

    const onSubmit = async (data: IUserUpdate) => {
        if (user != null) {
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.put(`/api/person/${user.id}`, data, optionAxios)
                .then((res) => {
                    dispatch(
                        setLogin<any>({
                            user: res.data.user
                        })
                    );
                    setError("");
                    navigate("/approvedCourses");
                    reset(defaultValues);
                }).catch(function (error) {
                    setError(error.response.data.msg);
                })
        }

    }
    const defaultValues: IUserUpdate = {
        name: user.name,
        surname: user.surname,
        email: user.email
    }

    useEffect(() => {
        setValues();
    }, []);

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
            <Typography component={"h1"} variant={"h2"}>
                Profile
            </Typography>
            <Box
                component="form" noValidate sx={{mt: 1}}
            >
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
                            sx={{width: "49%", mr: "2%"}}
                            focused={value !== ""}
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
                            message: "Not valid Surname"
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
                            name="lastName"
                            autoFocus
                            sx={{width: "49%"}}
                            focused={value !== ""}
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
                            focused={value !== ""}
                        />
                    )}
                />
                {error !== "" && (<Alert severity="error">{error}</Alert>)}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2, width: "49%", mr: "2%"}}
                    onClick={handleSubmit(onSubmit)}
                >
                    Update Profile
                </Button>
                <ChangePasswordDialog/>
            </Box>
        </Box>
    );
}
export default Profile;