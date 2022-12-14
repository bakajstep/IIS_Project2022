import {
    Alert,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useSelector} from "react-redux";
import bcrypt from "bcryptjs-react";
import {IUserPasswordUpdate} from "../interfaces/User";

const ChangePasswordDialog = () => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IUserPasswordUpdate>();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("")
    const user = useSelector((state: any) => state.user);

    const onSubmit = async (data: IUserPasswordUpdate) => {
        const old_password = data.old_password;
        data.old_password = bcrypt.hashSync(old_password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        const new_password = data.new_password;
        data.new_password = bcrypt.hashSync(old_password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        if (user != null) {
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.put(`/api/person/${user.id}/password`, data, optionAxios)
                .then(function (response) {
                    setError("");
                    setOpen(false);
                })
                .catch(function (error) {
                    setError(error.response.data.message)
                    data.old_password = old_password;
                    data.new_password = new_password;
                })
        }
    }
    const defaultValues: IUserPasswordUpdate = {
        old_password: "",
        new_password: ""
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset(defaultValues);
    };
    return (
        <ButtonBase sx={{mt: 3, mb: 2, width: "49%"}}>
            <Button variant="contained"
                    fullWidth
                    onClick={handleClickOpen}>
                Change password
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter old and new password and click to update
                    </DialogContentText>
                    {error !== ""  && (<Alert severity="error">{error}</Alert>)}
                    <Controller
                        name={"old_password"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                margin={"normal"}
                                onChange={onChange}
                                value={value}
                                type="password"
                                label={errors.old_password ? "Old password required" : "Old password"}
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
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                margin={"normal"}
                                onChange={onChange}
                                value={value}
                                type="password"
                                label={errors.new_password ? "New password required" : "New password"}
                                error={!errors.new_password ? false : true}
                                name="newPassword"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                        reset(defaultValues);
                        setError("");
                    }}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Update</Button>
                </DialogActions>
            </Dialog>
        </ButtonBase>
    );
}
export default ChangePasswordDialog;