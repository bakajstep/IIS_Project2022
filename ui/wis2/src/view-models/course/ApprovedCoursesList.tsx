import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, IconButton, List, ListItemText} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";

interface ICourse {
    id: number,
    label: string,
    description: string,
    type: string,
    price: number,
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
    const [course, setCourse] = useState<ICourse | undefined>(undefined);
    const [actuality, setActuality] = useState<any[]>([]);

    const getGuarantor = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`http://localhost:5000/api/person/${id}`, optionAxios)
            .then(res => {
                setGuarantor(res.data.user);
            })
        await axios.get(`http://localhost:5000/api/person/${id}`, optionAxios)
            .then(res => {
                setGuarantor(res.data.user);
            })
    }

    const getActuality = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`http://localhost:5000/api/course/${id}/actuality`, optionAxios)
            .then(res => {
                setActuality(res.data.actuality);
            })
    }

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
                        <Button onClick={() => {getGuarantor(value.guarantor_id);
                            getActuality(value.id)
                            setCourse(value);
                        }}>
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
                    <p>Course Name: {course?.label} description: {course?.description} type: {course?.type} price: {course?.price}</p>
                    <p>Guarantor Name: {guarantor.name} surname: {guarantor.surname} type: {guarantor.email}</p>
                    <List sx={{maxWidth: '100%', bgcolor: 'background.paper'}}>
                        {actuality?.map((value: any) => (
                            <ListItem
                                key={value}
                                disableGutters
                                secondaryAction={
                                    <IconButton aria-label="">
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={`Cislo: ${value.id} aktualita: ${value.description}`}/>
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setGuarantor(undefined)}> back </Button>
                </Box>
            )}
        </Box>
    );
}
export default ApprovedCoursesList;