import {Box, IconButton, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useSelector} from "react-redux";

interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    admin: boolean
}

const ProfileList = () => {
    const [obj, setObj] = useState<IUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const user = useSelector((state: any) => state.user);

    const deleteValue = async (id: number) => {
        if( user.id !== id) {
            const optionAxios = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.delete(`/api/person/${id}`, optionAxios).then(() => {
                getValues();
            })
        }
    }

    const deleteValues = async () => {
        for (let i = 0; i < selectedUsers.length; i++){
            await deleteValue(selectedUsers[i].id);
        }
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 3},
        {field: 'name', headerName: 'Name', flex: 4},
        {field: 'surname', headerName: 'Surname', flex: 4},
        {field: 'email', headerName: 'Email', flex: 4},
        {field: 'admin', headerName: 'Admin', flex: 4, type: "boolean"},
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <IconButton
                        onClick={() => {
                            deleteValues()
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            }
        }
    ];

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('/api/person', optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.user;
                setObj(obj)
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box p={2}
             sx={{
                 marginTop: 8}}>
            <Typography display={"flex"} justifyContent={"center"} component={"h1"} variant={"h2"}>
                Profiles
            </Typography>
            <Box marginTop={"20px"} display={"flex"} justifyContent={"center"}>
            <DataGrid
                rows={obj}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = obj.filter((row) =>
                        selectedIDs.has(row.id)
                );
                    setSelectedUsers(selectedRowData);
                }}
                sx={{
                    marginTop: 1 ,height: 631, maxWidth: 900, boxShadow: 4,
                }}
            />
            </Box>
        </Box>
    );
}
export default ProfileList;