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
                            <Route path="/createRoom" element={<CreateRoom/>}/>
                            <Route path="/profiles" element={<ProfileList/>}/>
                            <Route path="/editRoom" element={<EditRooms/>}/>
                            <Route path="/createCourse" element={<CreateCourse/>}/>
                            <Route path="/ApproveCourse" element={<ApproveCourse/>}/>
                            <Route path="/ApprovedCourses" element={<ApprovedCoursesListPublic/>}/>
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
