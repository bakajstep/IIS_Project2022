import {Box, Button, IconButton, List, ListItemText} from "@mui/material";
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

    const deleteValue = (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.delete('http://localhost:5000/api/person/', optionAxios)
            .then(res => {

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
                let obj: IUser[] = JSON.parse(res.data.user)
                setObj(obj)
            })
    }

    useEffect(() => {
        getValues();
    }, []);

    return (
        <Box padding="20px" display="flex" justifyContent={"center"} position={"relative"}>

            <List sx={{ maxWidth: '100%', bgcolor: 'background.paper'}}>
                {obj.map((value: any ) => (
                    <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="">
                            </IconButton>
                        }
                    >
                        <ListItemText primary={`Name: ${value.name} ${value.surname} Email: ${value.email}`}/>
                        <Button onChange={() =>{deleteValue(value.id)}}>
                            <DeleteIcon/>
                        </Button>
                    </ListItem>
                )) }
            </List>
        </Box>
    );
}
export default ProfileList;