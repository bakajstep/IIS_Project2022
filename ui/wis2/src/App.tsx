import React from 'react';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ColorModeContext, useMode} from "./theme";
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Register from "./scenes/user/Register";
import "./App.sass";
import Login from "./scenes/user/Login";
import {useSelector} from "react-redux";
import Profile from "./scenes/user/Profile";
import ProfileList from "./scenes/user/ProfileList";
import CreateRoom from "./scenes/rooms/CreateRoom";
import EditRooms from "./scenes/rooms/EditRooms";
import CreateCourse from "./scenes/course/CreateCourse";
import ApproveCourse from "./scenes/course/ApproveCourse";
import ApprovedCoursesListPublic from "./scenes/course/ApprovedCoursesListPublic";
import ApprovedCoursesListPrivate from "./scenes/course/ApprovedCoursesListPrivate";
import CoursesStudent from "./scenes/course/CoursesStudent";
import CoursesGuarantor from "./scenes/course/CoursesGuarantor";
import CoursesLector from "./scenes/course/CoursesLector";
import Calendar from "./scenes/course/Calendar";

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