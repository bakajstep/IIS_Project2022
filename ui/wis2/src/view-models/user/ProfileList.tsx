import {Box, Button, IconButton, List, ListItemText, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import {useEffect, useState} from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    admin: boolean
}

const ProfileList = () => {
    const [obj, setObj] = useState<IUser[]>([]);

    const deleteValue = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const rel = await axios.delete(`http://localhost:5000/api/person/${id}`, optionAxios).then(res => {
            getValues();
        })
    }

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('http://localhost:5000/api/person', optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.user;
                setObj(obj)
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box padding="20px" display="flex" justifyContent={"center"}>
            <Box display={"grid"} gridTemplateColumns={"10fr, 1fr, 10fr, 1fr, 10fr, 1fr, 10fr"}>
                <Typography gridColumn={1} variant={"h5"}>Name</Typography>
                <Typography gridColumn={3} variant={"h5"}>Surname</Typography>
                <Typography gridColumn={5} variant={"h5"}>Email</Typography>
                <Typography gridColumn={7} variant={"h5"}>Delete</Typography>
            </Box>
            <Box position={"relative"}>
                <List sx={{maxWidth: '100%', bgcolor: 'background.paper'}}>
                    {obj.map((value: any) => (
                        <ListItem
                            key={value}
                            disableGutters
                            secondaryAction={
                                <IconButton aria-label="">
                                </IconButton>
                            }
                        >
                            <ListItemText primary={`Name: ${value.name} ${value.surname} Email: ${value.email}`}/>
                            <Button onClick={() => deleteValue(value.id)}>
                                <DeleteIcon/>
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}
export default ProfileList;