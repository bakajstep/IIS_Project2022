import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {IActuality} from "../interfaces/Course";
import {IUserModel} from "../interfaces/User";

type ActualityProps = {
    courseID: number
}

const StudentsInCourse = ({courseID}: ActualityProps) => {
    const [students, setStudents] = useState<IUserModel[]>([]);
    const getStudents = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/person/approved`, optionAxios)
            .then(res => {
                let obj: IUserModel[] = res.data.student;
                setStudents(obj);
            }).catch(() => {
            })
    }
    useEffect(() => {
        getStudents(courseID);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <TableContainer sx={{mb: 5}} component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Surname</TableCell>
                        <TableCell align="left">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{user.name}</TableCell>
                            <TableCell align="left">{user.surname}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default StudentsInCourse;