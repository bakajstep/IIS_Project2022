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

interface IActuality {
    id: number,
    description: string,
}

type ActualityProps = {
    courseID: number
}

const Actuality = ({courseID}: ActualityProps) => {
    const [actuality, setActuality] = useState<IActuality[]>([]);
    const getActuality = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${courseID}/actuality`, optionAxios)
            .then(res => {
                setActuality(res.data.actuality);
            })
    }
    useEffect(() => {
        getActuality(courseID);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <TableContainer sx={{mb: 5}} component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {actuality.map((actual) => (
                        <TableRow
                            key={actual.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{actual.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default Actuality;