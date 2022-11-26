import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, IconButton, List, ListItemText} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

interface ICourse {
    id: number,
    label: string,
    description: string,
    type: string,
    guarantor_id: null
}

const ApproveCourse = () => {
    const [obj, setObj] = useState<ICourse[]>([]);

    const approveCourse = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/course/${id}/approved`, optionAxios).then(res => {
            getValues();
        })
    }
    const deleteValue = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.delete(`/api/course/${id}`, optionAxios).then(res => {
            getValues();
        })
    }

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('/api/course/pending', optionAxios)
            .then(res => {
                let obj: ICourse[] = res.data.course;
                setObj(obj)
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box padding="20px" display="flex" justifyContent={"center"} position={"relative"}>
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
                        <ListItemText primary={`Course Name: ${value.label} description: ${value.description} type: ${value.type} price: ${value.price}`}/>
                        <Button color={"success"} onClick={() => approveCourse(value.id)}>
                            <DoneIcon/>
                        </Button>
                        <Button color={"error"} onClick={() => deleteValue(value.id)}>
                            <CloseIcon/>
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
export default ApproveCourse;