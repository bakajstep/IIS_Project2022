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

interface IActuality {
    description: string,
}

type DialogProps = {
    idC: number
}

const ChangePasswordDialog = ({idC} : DialogProps) => {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IActuality>();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("")
    const user = useSelector((state: any) => state.user);

    const onSubmit = async (data: IActuality) => {
        if (user != null) {
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            console.log(data);
            await axios.post(`/api/course/${idC}/actuality`, data, optionAxios)
                .then(function (response) {
                    setError("");
                    setOpen(false);
                })
                .catch(function (error) {
                    setError(error.response.data.message)
                })
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const defaultActuality: IActuality =  {
        description: "",
    }

    const handleClose = () => {
        setOpen(false);
        reset(defaultActuality);
    };
    return (
        <ButtonBase sx={{mt: 3, mb: 2, width: "100%"}}>
            <Button
                    variant="contained"
                    fullWidth
                    onClick={handleClickOpen}>
                Create Actuality
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create actuality</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new actuality
                    </DialogContentText>
                    {error !== ""  && (<Alert severity="error">{error}</Alert>)}
                    <Controller
                        name={"description"}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                fullWidth
                                margin={"normal"}
                                onChange={onChange}
                                value={value}
                                type="text"
                                label={errors.description ? "Input required" : "Description"}
                                error={!errors.description ? false : true}
                                name="oldPassword"
                                sx={{gridColumn: "span 2"}}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                        reset(defaultActuality);
                        setError("");
                    }}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Create</Button>
                </DialogActions>
            </Dialog>
        </ButtonBase>
    );
}
export default ChangePasswordDialog;