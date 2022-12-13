import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

type InfoProps = {
    courseDB: ICourse
}

interface ICourse {
    id: number,
    label: string,
    description: string,
    type: string,
    price: number,
    capacity: number
}

const BasicInfo = ({courseDB}: InfoProps) => {
    return(<TableContainer sx={{mb: 5}} component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Label</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Capacity</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    <TableRow
                        key={courseDB.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="left">{courseDB.label}</TableCell>
                        <TableCell align="left">{courseDB.description}</TableCell>
                        <TableCell align="left">{courseDB.type}</TableCell>
                        <TableCell align="left">{courseDB.price}</TableCell>
                        <TableCell align="left">{courseDB.capacity}</TableCell>
                    </TableRow>
            </TableBody>
        </Table>
    </TableContainer>)
}
export default BasicInfo;