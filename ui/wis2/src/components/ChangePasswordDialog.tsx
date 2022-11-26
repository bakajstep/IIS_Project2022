import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useSelector} from "react-redux";

interface IFormInput{
    old_password: string;
    new_password: string;
}

const ChangePasswordDialog = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false)
    const user = useSelector((state: any) => state.user);

    const onSubmit = async (data: IFormInput) => {
        if (user != null) {
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.put(`/api/person/${user.id}/password`, data, optionAxios)
                .then(function (response){
                    setError(false);
                    setOpen(false);
            })
                .catch(function (error){
                    setError(true);
                })
                .finally(() =>{
                    reset(defaultValues);
            })
        }
    }
    const defaultValues: IFormInput = {
        old_password: "",
        new_password: ""
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return(
    <div>
        <Button onClick={handleClickOpen} color="secondary" variant="contained" sx={{margin: "20px"}}>
            Change password
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter old and new password and click to update
                </DialogContentText>
                { error == true && (<Alert severity="error">Wrong password</Alert>)}
                <Controller
                    name={"old_password"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value }}) => (
                        <TextField
                            fullWidth
                            onChange={onChange}
                            value={value}
                            variant="filled"
                            type="text"
                            label={errors.old_password ? "Input required" : "Old password"}
                            error={!errors.old_password ? false : true}
                            name="oldPassword"
                            sx={{gridColumn: "span 2"}}
                        />
                    )}
                />
                <Controller
                    name={"new_password"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value }}) => (
                        <TextField
                            fullWidth
                            onChange={onChange}
                            value={value}
                            variant="filled"
                            type="text"
                            label={errors.new_password ? "Input required" : "New password"}
                            error={!errors.new_password ? false : true}
                            name="newPassword"
                            sx={{gridColumn: "span 2"}}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => {handleClose();
                reset(defaultValues);
                setError(false);}}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} >Update</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
export default ChangePasswordDialog;