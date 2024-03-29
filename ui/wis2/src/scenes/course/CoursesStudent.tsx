/**
 @author Aliaksei Slepitsa
 */

import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid"
import {Alert, Box, Button, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";
import Actuality from "../../components/Actuality";
import BasicInfo from "../../components/BasicInfo";
import GurantorLector from "../../components/GurantorLectorList";
import {ICourseModel, ITermModel} from "../../interfaces/Course";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 3},
    {field: 'label', headerName: 'Label', flex: 4},
    {field: 'description', headerName: 'Description', flex: 12},
    {field: 'type', headerName: 'Type', flex: 6},
    {field: 'price', headerName: 'Price', flex: 4},
    {field: 'capacity', headerName: 'Capacity', flex: 4},
];

const CoursesStudent = () => {

    const defaultCourse: ICourseModel = {
        id: 0,
        label: "",
        description: "",
        type: "",
        price: 0,
        capacity: 0,
        guarantor_id: 0,
    }

    const [obj, setObj] = useState<ICourseModel[]>([]);
    const [course, setCourse] = useState<ICourseModel>(defaultCourse);
    const [termsR, setTermsR] = useState<ITermModel[]>([]);
    const [termsU, setTermsU] = useState<ITermModel[]>([]);
    const [error, setError] = useState("")
    const user = useSelector((state: any) => state.user);
    const [value, setValue] = React.useState(0);
    const [points, setPoints] = React.useState<number[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const registerTerm = async (idU: number, idT: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/person/${idU}/term/${idT}`, optionAxios)
            .then(res => {
                console.log(res)
                getTermsNonRegistered(idU, course.id);
                getTermsRegistered(idU, course.id);
                setError("")
            }).catch(error => {
                setError(error.response.data.message)
            })
    }

    const getTermsNonRegistered = async (idU: number, idC: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/person/${idU}/course/${idC}/term/nonregistered`, optionAxios)
            .then(res => {
                let obj: ITermModel[] = res.data.term;
                setTermsU(obj);
            }).catch(error => {
                setError(error.response.data.msg);
            })
    }

    const getTermsRegistered = async (idU: number, idC: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/person/${idU}/course/${idC}/term/registered`, optionAxios)
            .then(res => {
                let obj: ITermModel[] = res.data.term;
                setTermsR(obj);
            }).catch(error => {
                setError(error.response.data.msg);
            })
        await axios.get(`/api/person/${idU}/course/${idC}/term/registered/points`, optionAxios)
            .then(res => {
                let obj: any = res.data.points;
                let obj2: number[] = []
                console.log(obj);
                setPoints(obj);
            }).catch(error => {
                setError(error.response.data.msg);
            })
    }

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/person/${user.id}/course`, optionAxios)
            .then(res => {
                let obj: ICourseModel[] = res.data.course;
                setObj(obj);
                console.log(res.data)
            }).catch(error=>{
                setError("error")
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"} display={"flex"}
                        justifyContent={"center"}>
                Student courses
            </Typography>
            {course?.label === "" && (
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
                        onRowClick={(row) => {
                            setCourse(row.row);
                            getTermsRegistered(user.id, row.row.id);
                            getTermsNonRegistered(user.id, row.row.id);
                        }}
                        components={{Toolbar: GridToolbar}}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: {debounceMs: 500},
                            },
                        }}
                        sx={{
                            boxShadow: 4,
                        }}
                    />
                </Box>
            )}
            {course.label !== "" &&(
                <Box p={2}
                     sx={{
                         marginTop: 8,
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center'
                     }}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Basic Info" {...a11yProps(0)} />
                            <Tab label="Guarantor and Lectors" {...a11yProps(1)} />
                            <Tab label="Actuality" {...a11yProps(2)} />
                            <Tab label="Non Registered terms" {...a11yProps(2)} />
                            <Tab label="Registered terms" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <BasicInfo courseDB={course}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <GurantorLector courseID={course.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Actuality courseID={course.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TableContainer sx={{mb: 5}} component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Label</TableCell>
                                        <TableCell align="left">From time</TableCell>
                                        <TableCell align="left">To time</TableCell>
                                        <TableCell align="left">Min points</TableCell>
                                        <TableCell align="left">Max points</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {termsU.map((term) => (
                                        <TableRow
                                            key={term.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="left">{term.label}</TableCell>
                                            <TableCell align="left">{term.from_time}</TableCell>
                                            <TableCell align="left">{term.to_time}</TableCell>
                                            <TableCell align="left">{term.min_points}</TableCell>
                                            <TableCell align="left">{term.max_points}</TableCell>
                                            <TableCell><Button color={"success"} onClick={() => registerTerm(user.id, term.id)}>
                                                Register
                                            </Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <TableContainer sx={{mb: 5}} component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Label</TableCell>
                                        <TableCell align="left">From time</TableCell>
                                        <TableCell align="left">To time</TableCell>
                                        <TableCell align="left">Min points</TableCell>
                                        <TableCell align="left">Max points</TableCell>
                                        <TableCell align="left">Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {termsR.map((term) => (
                                        <TableRow
                                            key={term.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="left">{term.label}</TableCell>
                                            <TableCell align="left">{term.from_time}</TableCell>
                                            <TableCell align="left">{term.to_time}</TableCell>
                                            <TableCell align="left">{term.min_points}</TableCell>
                                            <TableCell align="left">{term.max_points}</TableCell>
                                            <TableCell align="left">{points[term.id]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    {error !== "" && (<Alert severity="error">{error}</Alert>)}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => {
                            setCourse(defaultCourse);
                            setError("");
                        }}
                    >
                        Back
                    </Button>
                </Box>
            )}
        </Box>
    );
}
export default CoursesStudent;