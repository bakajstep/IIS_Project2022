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

interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    admin: boolean
}

const ApprovedCoursesList = () => {
    const [obj, setObj] = useState<ICourse[]>([]);
    const [guarantor, setGuarantor] = useState<IUser | undefined>(undefined)

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('http://localhost:5000/api/course/approved', optionAxios)
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
            {guarantor === undefined && (
                <List sx={{maxWidth: '1000px', bgcolor: 'background.paper'}}>
                    {obj.map((value: any) => (
                        <Button>
                            <ListItem
                                key={value}
                                disableGutters
                                secondaryAction={
                                    <IconButton aria-label="">
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={`Course Name: ${value.label} description: ${value.description} type: ${value.type} price: ${value.price}`}/>
                            </ListItem>
                        </Button>
                    ))}
                </List>
            )}
            {guarantor !== undefined && (
                <Box>

                </Box>
            )}
        </Box>
    );
}
export default ApprovedCoursesList;