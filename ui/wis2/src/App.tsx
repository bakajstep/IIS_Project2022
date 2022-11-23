import React from 'react';
import {CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ColorModeContext, useMode} from "./theme";
import Topbar from './view-models/global/Topbar';
import Sidebar from "./view-models/global/Sidebar";
import Register from "./view-models/user/Register";
import "./App.sass";
import Login from "./view-models/user/Login";
import Mainpage from "./view-models/mainpage/Mainpage";
import {useSelector} from "react-redux";
import Profile from "./view-models/user/Profile";

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
                            <Route path="/" element={<Mainpage/>}/>
                            {user != null && user.admin == true && (
                                <Route path="/register" element={<Register/>}/>
                                )}
                            {user != null && (
                                <Route path="/profile" element={<Profile/>}/>
                            )}
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
