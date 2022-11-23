import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControlLabel} from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import ChangePasswordDialog from "../../component/ChangePasswordDialog";

interface IFormInput {
    name: string;
    surname: string;
    email: string;
}

const Profile = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();
    const user = useSelector((state: any) => state.user);

    const onSubmit = async (data: IFormInput) => {
        alert(JSON.stringify(data));
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let res = await axios.post('http://localhost:5000/api/person/register', data, optionAxios);

        let datas = res.data;
        console.log(datas);
        reset(defaultValues);
    }
    const defaultValues: IFormInput = {
        name: "",
        surname: "",
        email: ""
    }


    return (
        <Box m="20px">
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"}>
                Profile
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
                        render={({field: {onChange, value = user.name}}) => (
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
                        render={({field: {onChange, value = user.surname}}) => (
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
                        render={({field: {onChange, value = user.email}}) => (
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
                </Box>
                <Box display="flex" justifyContent="Center" mt="50px">
                    <Button onClick={handleSubmit(onSubmit)} color="secondary" variant="contained" sx={{margin: "20px"}}>
                        Update Profile
                    </Button>
                    <Button color="secondary" variant="contained" sx={{margin: "20px"}}>
                        Change password
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
export default Profile;