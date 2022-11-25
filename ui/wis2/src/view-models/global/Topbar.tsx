import {Box, Button, IconButton, InputBase, Typography, useTheme} from "@mui/material";
import {useContext} from "react";
import {ColorModeContext, tokens} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    return (
        <Box display={"flex"} p={2} justifyContent={"space-between"} bgcolor={colors.Last[50]} sx={{ boxShadow: 4 }}>
            {/* SEARCH BAR */}
            <Box display={"flex"} bgcolor={colors.Third[300]} borderRadius="3px"
            >
                <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>
                <IconButton type="button" sx={{p: 1}}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
                {user != null && (
                    <div>
                <IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon/>
                </IconButton>
                    </div>
                    )}
                {user == null && (
                <Button onClick={() => {
                    navigate("/login");
                }}>
                    <Typography variant="h6">Login</Typography>
                </Button>
                    )}
            </Box>
        </Box>
    );
};

export default Topbar;
