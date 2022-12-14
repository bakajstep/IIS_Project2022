/**
 @author Adam Kaňkovský
 */

import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid"
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ICourseModel} from "../../interfaces/Course";

const columns: GridColDef[] = [
    /*{field: 'id', headerName: 'ID', flex: 3},*/
    {field: 'label', headerName: 'Label', flex: 4},
    {field: 'description', headerName: 'Description', flex: 12},
    {field: 'type', headerName: 'Type', flex: 6},
    {field: 'price', headerName: 'Price', flex: 4},
];

const ApprovedCoursesListPublic = () => {
    const [obj, setObj] = useState<ICourseModel[]>([]);

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('/api/course/approved', optionAxios)
            .then(res => {
                let obj: ICourseModel[] = res.data.course;
                setObj(obj);
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box m={"20px"}>
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"} display={"flex"}
                        justifyContent={"center"}>
                Courses
            </Typography>
            <Box display="flex" justifyContent="center">
                <DataGrid
                    style={{padding: 5, height: 600, maxWidth: 900}}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    rows={obj}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick={true}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    sx={{
                        boxShadow: 4,
                    }}
                />
            </Box>
        </Box>
    );
}
export default ApprovedCoursesListPublic;