import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid"
import {Alert, Box, Button, FormControlLabel, MenuItem, Select, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {LocalizationProvider, TimePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CreateActualityDialog from "../../components/CreateActualityDialog";
import AddLectorsDialog from "../../components/AddLectorsDialog";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TermRank from "../../components/TermRank";

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

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 3},
    {field: 'label', headerName: 'Label', flex: 4},
    {field: 'description', headerName: 'Description', flex: 12},
    {field: 'type', headerName: 'Type', flex: 6},
    {field: 'price', headerName: 'Price', flex: 4},
    {field: 'capacity', headerName: 'Capacity', flex: 4},
];

const CoursesGuarantor = () => {
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
    const [usersA, setUsersA] = useState<IUser[]>([]);
    const [rooms, setRooms] = useState<IRoom[]>([]);
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
        await axios.post('/api/term', data, optionAxios)
            .then((res) => {
                reset(defaultTerm);
                setError("");
            }).catch(function (error) {
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

    const agreeStudent = async(idC: number, idU: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/course/${idC}/person/${idU}`, optionAxios)
            .then(() => {
                getUsersA(idC);
            })
    }

    const obscureStudent = async(idC: number, idU: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.delete(`/api/course/${idC}/person/${idU}`, optionAxios)
            .then(() => {
                getUsersA(idC)
            }).catch(() => {
            })
    }

    const getUsersA = async (id: number) => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/course/${id}/person/pending`, optionAxios)
            .then(res => {
                let obj: IUser[] = res.data.student;
                setUsersA(obj);
            }).catch(() => {
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
            })
    }

    useEffect(() => {
        if (course.label === ""){
            getValues();
        }else{
            getUsersA(course.id);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Typography paddingTop={"20px"} paddingBottom={"40px"} variant={"h2"} display={"flex"}
                        justifyContent={"center"}>
                Guarantor courses
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
                            getUsersA(row.row.id);
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
                            <Tab label="Agree Students" {...a11yProps(3)} />
                            <Tab label="Create Term" {...a11yProps(4)} />
                            <Tab label="Create Rank" {...a11yProps(5)} />
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
                        <AddLectorsDialog idC={course.id} idG={course.guarantor_id}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CreateActualityDialog idC={course.id}/>
                    </TabPanel>
                    <TabPanel index={value} value={3}>
                        <TableContainer sx={{mb: 5}} component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Id</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Surname</TableCell>
                                        <TableCell align="left">email</TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersA.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="left">{user.id}</TableCell>
                                            <TableCell align="left">{user.name}</TableCell>
                                            <TableCell align="left">{user.surname}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                            <TableCell align="left"><Button color={"success"} onClick={() => agreeStudent(course.id, user.id)}>
                                                <DoneIcon/>
                                            </Button></TableCell>
                                            <TableCell><Button color={"error"} onClick={() => obscureStudent(course.id, user.id)}>
                                                <CloseIcon/>
                                            </Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel index={value} value={4}>
                        <Box component={"form"} noValidate sx={{mt: 1}}>
                            <Controller
                                name={"label"}
                                control={control}
                                rules={{required: true}}
                                render={({field: {onChange, value}}) => (
                                    <TextField
                                        fullWidth
                                        margin={"normal"}
                                        onChange={onChange}
                                        value={value}
                                        type="text"
                                        label={errors.label ? "Input required" : "Label"}
                                        error={!errors.label ? false : true}
                                        name="label"
                                    />
                                )}
                            />
                            <Controller
                                name={"min_points"}
                                control={control}
                                rules={{required: true}}
                                render={({field: {onChange, value}}) => (
                                    <TextField
                                        margin={"normal"}
                                        onChange={onChange}
                                        value={value}
                                        type="number"
                                        label={errors.min_points ? "Input required" : "Min points"}
                                        error={!errors.min_points ? false : true}
                                        name="min_points"
                                        sx={{width: "49%", mr: "2%", mb:4}}
                                    />
                                )}
                            />
                            <Controller
                                name={"max_points"}
                                rules={{
                                    required: true,
                                }}
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <TextField
                                        fullWidth
                                        margin={"normal"}
                                        onChange={onChange}
                                        value={value}
                                        type="number"
                                        label={errors.max_points ? "Bad email format" : "Max points"}
                                        error={!errors.max_points ? false : true}
                                        name="max_points"
                                        sx={{width: "49%", mb: 4}}
                                    />
                                )}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    name={"from_time"}
                                    rules={{
                                        required: true,
                                    }}
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TimePicker

                                            ampm={false}
                                            label="From time"
                                            value={value}
                                            onChange={onChange}
                                            renderInput={(params) => <TextField sx={{width: "49%", mr: "2%", mb: 4}} {...params} />}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    name={"to_time"}
                                    rules={{
                                        required: true,
                                    }}
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TimePicker
                                            ampm={false}
                                            label="To time"
                                            value={value}
                                            onChange={onChange}
                                            renderInput={(params) => <TextField sx={{width: "49%"}} {...params} />}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <FormControlLabel control={
                                <Controller
                                    name={"room_id"}
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    onChange={onChange}
                                    sx={{mb: 3}}
                                >
                                    {rooms.map((room) => (
                                        <MenuItem value={room.id}>{room.label}</MenuItem>
                                    ))}
                                </Select>
                                    )}/>
                            }
                            label={"Room"}
                            />
                            <Controller
                                name={"date"}
                                rules={{
                                    required: true,
                                }}
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <TextField
                                        fullWidth
                                        margin={"normal"}
                                        onChange={onChange}
                                        value={value}
                                        placeholder={"year/mm/dd,year/mm/dd"}
                                        type="text"
                                        label={errors.date ? "Bad email format" : "Date"}
                                        error={!errors.date ? false : true}
                                        name="date"
                                    />
                                )}
                            />
                            <Button type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={handleSubmit(onSubmit)}>
                                Create New Term
                            </Button>
                        </Box>
                    </TabPanel>
                    <TabPanel index={value} value={5}>
                        <TermRank courseID={course.id} />
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
export default CoursesGuarantor;