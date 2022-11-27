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
import {useForm} from "react-hook-form";

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

interface ITerm {
    course_id: number,
    label: string,
    min_points: number,
    max_points: number,
    from_time: number,
    to_time: string,
    room_id: string,
    date: string
}

interface ICourse {
    id: number,
    label: string,
    description: string,
    type: string,
    price: number,
    capacity: number,
    guarantor_id: number
}

interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
}

interface IRoom {
    id: number;
    label: string;
    capacity: number;
}

interface IActuality {
    id: number,
    description: string,
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 3},
    {field: 'label', headerName: 'Label', flex: 4},
    {field: 'description', headerName: 'Description', flex: 12},
    {field: 'type', headerName: 'Type', flex: 6},
    {field: 'price', headerName: 'Price', flex: 4},
    {field: 'capacity', headerName: 'Capacity', flex: 4},
];

const CoursesLector = () => {

    const defaultUser: IUser = {
        id: 0,
        name: "",
        surname: "",
        email: "",
    }

    const defaultCourse: ICourse = {
        id: 0,
        label: "",
        description: "",
        type: "",
        price: 0,
        capacity: 0,
        guarantor_id: 0,
    }
    const defaultTerm: ITerm = {
        course_id: 0,
        label: "",
        min_points: 0,
        max_points: 0,
        from_time: 0,
        to_time: "",
        room_id: "",
        date: ""
    }

    const {handleSubmit, reset, control, formState: {errors}} = useForm<ITerm>();
    const [obj, setObj] = useState<ICourse[]>([]);
    const [course, setCourse] = useState<ICourse>(defaultCourse);
    const [guarantor, setGuarantor] = useState<IUser>(defaultUser);
    const [lectors, setLectors] = useState<IUser[]>([]);
    const [usersA, setUsersA] = useState<IUser[]>([]);
    const [actuality, setActuality] = useState<IActuality[]>([]);
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [terms, setTerms] = useState<ITerm[]>([]);
    const [error, setError] = useState("")
    const user = useSelector((state: any) => state.user);
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onSubmit = async (data: ITerm) => {
        data.course_id = course.id;
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(data);
        await axios.post('/api/term', data, optionAxios)
            .then((res) => {
                console.log(res);
                reset(defaultTerm);
                setError("");
            }).catch(function (error) {
                console.log(error);
                setError(error.response.data.msg);
            })
    }

    const getRooms = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get('/api/room', optionAxios)
            .then(res => {
                let obj: IRoom[] = JSON.parse(res.data.room)
                setRooms(obj)
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

    const getTerms = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/term`, optionAxios)
            .then(res => {
                let obj: ITerm[] = res.data.term;
                setTerms(obj);
            })
    }

    const agreeStudent = async(idU: number, idC: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/course/${idC}/person/${idU}/agree`, optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.lector;
                setLectors(obj);
            }).catch(error => {
            })
    }

    const obscureStudent = async(idU: number, idC: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.delete(`/api/course/${idC}/person/${idU}`, optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.lector;
                setLectors(obj);
            }).catch(error => {
            })
    }

    const getUsersA = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/person/`, optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.lector;
                setLectors(obj);
            }).catch(error => {
            })
    }

    const getLectors = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/lector`, optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.lector;
                setLectors(obj);
            }).catch(error => {
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

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/person/${user.id}/guarantor`, optionAxios)
            .then(res => {
                let obj: ICourse[] = res.data.course;
                setObj(obj);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (course.label === ""){
            getValues();
        }else{
            getGuarantor(course.id);
            getLectors(course.id);
            getActuality(course.id);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"} display={"flex"}
                        justifyContent={"center"}>
                Lector courses
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
                            getRooms();
                            setCourse(row.row);
                            getGuarantor(row.row.guarantor_id);
                            getLectors(row.row.id);
                            getActuality(row.row.id);
                            getTerms(row.row.id);
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
            {course.label !== "" && (
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
                            <Tab label="Create Rank" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TableContainer sx={{mb: 5}} component={Paper}>
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
                                        key={course.label}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="left">
                                            {course.label}
                                        </TableCell>
                                        <TableCell align="left">{course.description}</TableCell>
                                        <TableCell align="left">{course.type}</TableCell>
                                        <TableCell align="left">{course.price}</TableCell>
                                        <TableCell align="left">{course.capacity}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
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
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TableContainer sx={{mb: 5}} component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Id</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {actuality.map((actual) => (
                                        <TableRow
                                            key={actual.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="left">{actual.id}</TableCell>
                                            <TableCell align="left">{actual.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel index={value} value={3}>
                        <DataGrid
                            style={{padding: 5, height: 381, width: 900}}
                            rows={terms}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={(params) => {
                                //setValues(params.row.id, params.row.label, params.row.capacity);
                            }}
                            sx={{
                                boxShadow: 4,
                            }}
                        />
                    </TabPanel>
                    {error !== "" && (<Alert severity="error">{error}</Alert>)}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => {
                            setCourse(defaultCourse);
                            setGuarantor(defaultUser);
                            setActuality([]);
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
export default CoursesLector;