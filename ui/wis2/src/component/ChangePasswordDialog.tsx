import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import axios from "axios";
import * as React from "react";

interface IFormInput {
    userId: number;
    oldPassword: string;
    newPassword: string;
}

const ChangePasswordDialog = () => {
    const [open, setOpen] = useState(false);
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();
    const user = useSelector((state: any) => state.user);

    const defaultValues: IFormInput =  {
        userId: 0,
        oldPassword: "",
        newPassword: "",
    }

    const onSubmit = async (data: IFormInput) => {
        if( user != null) {
            data.userId = user.userId;
            alert(JSON.stringify(data));
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            let res = await axios.post('http://localhost:5000/api/person/register', data, optionAxios);
            reset(defaultValues);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ChangePassword</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write your old password and new password.
                    </DialogContentText>
                    <Controller
                        name={"oldPassword"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}

                                variant="filled"
                                type="text"
                                label={errors.oldPassword ? "Input required" : "Old password"}
                                error={!errors.oldPassword ? false : true}
                                name="oldPassword"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                    <Controller
                        name={"newPassword"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                onChange={onChange}
                                value={value}

                                variant="filled"
                                type="text"
                                label={errors.newPassword ? "Input required" : "New password"}
                                error={!errors.newPassword ? false : true}
                                name="newPassword"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={ () => {
                        handleSubmit(onSubmit);
                        handleClose();
                    }}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ChangePasswordDialog;