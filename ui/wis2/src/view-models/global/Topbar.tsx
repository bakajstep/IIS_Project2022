import {Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import {useContext} from "react";
import {ColorModeContext, tokens} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    return (
        <Box display={"flex"} p={2} justifyContent={"right"} bgcolor={colors.Last[50]} sx={{ boxShadow: 4 }}>
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
                <IconButton onClick={() => (navigate("/profile"))}>
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
