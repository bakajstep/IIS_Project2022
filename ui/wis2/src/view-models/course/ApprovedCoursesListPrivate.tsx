import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

interface ICourse {
    id: number,
    label: string,
    description: string,
    type: string,
    price: number,
    guarantor_id: null
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 3},
    {field: 'label', headerName: 'Label', flex: 4},
    {field: 'description', headerName: 'Description', flex: 12},
    {field: 'type', headerName: 'Type', flex: 6},
    {field: 'price', headerName: 'Price', flex: 4},
];

interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    admin: boolean
}

const ApprovedCoursesListPrivate = () => {
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
        await axios.get(`/api/person/${id}`, optionAxios)
            .then(res => {
                setGuarantor(res.data.user);
            })
        await axios.get(`/api/person/${id}`, optionAxios)
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
        await axios.get(`/api/course/${id}/actuality`, optionAxios)
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
        await axios.get('/api/course/approved', optionAxios)
            .then(res => {
                let obj: ICourse[] = res.data.course;
                setObj(obj);
                console.log(obj);
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box m={"20px"}>
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"} display={"flex"} justifyContent={"center"}>
                Courses
            </Typography>
            <Box display="flex" justifyContent="center">
                <DataGrid
                    style={{ padding: 5, height: 600, maxWidth: 900}}
                    getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                    rows={obj}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={{
                        boxShadow: 4,
                    }}
                />
            </Box>
        </Box>
    );
}
export default ApprovedCoursesListPrivate;