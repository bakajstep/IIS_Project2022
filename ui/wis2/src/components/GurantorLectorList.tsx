/**
 @author Štěpán Bakaj
 */

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
import {Box} from "@mui/material";
import {IUserModel} from "../interfaces/User";

type GLProps = {
    courseID: number
}

const GuarantorLector = ({courseID}: GLProps)=>{
    const defaultUser: IUserModel = {
        id: 0,
        name: "",
        surname: "",
        email: "",
    }
    const [guarantor, setGuarantor] = useState<IUserModel>(defaultUser);
    const [lectors, setLectors] = useState<IUserModel[]>([]);

    const getLectors = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/lector`, optionAxios)
            .then(res => {
                let obj: IUserModel[] = res.data.lector;
                setLectors(obj);
            })
    }

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
    }
    useEffect(() => {
        getGuarantor(courseID);
        getLectors(courseID);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <Box>
            <TableContainer sx={{mb: 5}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Guarantor Name</TableCell>
                            <TableCell align="left">Guarantor Surname</TableCell>
                            <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={guarantor.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">
                                {guarantor.name}
                            </TableCell>
                            <TableCell align="left">{guarantor.surname}</TableCell>
                            <TableCell align="left">{guarantor.email}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer sx={{mb: 5}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Lector Name</TableCell>
                            <TableCell align="left">Lector Surname</TableCell>
                            <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lectors.map((actual) => (
                            <TableRow
                                key={actual.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{actual.name}</TableCell>
                                <TableCell align="left">{actual.surname}</TableCell>
                                <TableCell align="left">{actual.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default GuarantorLector;