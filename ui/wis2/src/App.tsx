import React from 'react';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ColorModeContext, useMode} from "./theme";
import Topbar from './view-models/global/Topbar';
import Sidebar from "./view-models/global/Sidebar";
import Register from "./view-models/user/Register";
import "./App.sass";
import Login from "./view-models/user/Login";
import {useSelector} from "react-redux";
import Profile from "./view-models/user/Profile";
import ProfileList from "./view-models/user/ProfileList";
import CreateRoom from "./view-models/rooms/CreateRoom";
import EditRooms from "./view-models/rooms/EditRooms";
import CreateCourse from "./view-models/course/CreateCourse";
import ApproveCourse from "./view-models/course/ApproveCourse";
import ApprovedCoursesListPublic from "./view-models/course/ApprovedCoursesListPublic";
import ApprovedCoursesListPrivate from "./view-models/course/ApprovedCoursesListPrivate";
import CoursesStudent from "./view-models/course/CoursesStudent";
import CoursesGuarantor from "./view-models/course/CoursesGuarantor";
import CoursesLector from "./view-models/course/CoursesLector";
import Calendar from "./view-models/course/Calendar";

function App() {
    const [theme, colorMode] = useMode();
    const user = useSelector((state: any) => state.user);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="App">
                    <Sidebar/>
                    <main className={"content"}>
                        <Topbar/>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/" element={<ApprovedCoursesListPublic/>}/>
                            {user != null && user.admin === true && (
                                <Route path="/register" element={<Register/>}/>
                            )}
                            {user != null && (
                                <Route path="/profile" element={<Profile/>}/>)
                            }
                            {user != null && (
                                <Route path="/createRoom" element={<CreateRoom/>}/>)
                            }
                            {user != null && (
                                <Route path="/profiles" element={<ProfileList/>}/>)
                            }
                            {user != null && (
                                <Route path="/editRoom" element={<EditRooms/>}/>)
                            }
                            {user != null && (
                                <Route path="/createCourse" element={<CreateCourse/>}/>)
                            }
                            {user != null && (
                                <Route path="/ApproveCourse" element={<ApproveCourse/>}/>)
                            }
                            {user != null && (
                                <Route path="/ApprovedCourses" element={<ApprovedCoursesListPrivate/>}/>)
                            }
                            {user != null && (
                                <Route path="/coursesStudent" element={<CoursesStudent/>}/>)
                            }
                            {user != null && (
                                <Route path="/coursesLector" element={<CoursesLector/>}/>)
                            }
                            {user != null && (
                                <Route path="/coursesGuarantor" element={<CoursesGuarantor/>}/>)
                            }
                            {user != null && (
                                <Route path="/calendar" element={<Calendar/>}/>)
                            }
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;