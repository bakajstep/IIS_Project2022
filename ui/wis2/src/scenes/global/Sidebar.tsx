import {useState} from "react";
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {Box, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import CreateIcon from '@mui/icons-material/Create';

import {tokens} from "../../theme";
import "./styles.css"
import Logo from "./logo.png"
import LogoD from "./logo_dark.png"
import {setLogout} from "../../state/UserState";
import {useDispatch, useSelector} from "react-redux";

const Item = ({
                  title,
                  to,
                  icon,
                  selected,
                  setSelected
              }: { title: any, to: any, icon: any, selected: any, setSelected: any }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.Primary[800],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isCollapsed, setIsCollapsed] = useState(!isNonMobile);
    const [selected, setSelected] = useState("Dashboard");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.Last[50]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                boxShadow: 4
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.Primary[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display={"flex"}
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                {theme.palette.mode == "light" ? (<img width={80} src={Logo} alt={"Logo-light"}/>) : (
                                    <img width={80} src={LogoD} alt={"logo-dark"}/>)}
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            {user?.id != null && (
                                <Box textAlign="center">
                                    <MenuItem
                                        style={{
                                            color: colors.Primary[800],
                                        }}
                                        onClick={() => {
                                            navigate("/profile");
                                        }}
                                    >
                                        <Typography
                                            variant="h2"
                                            color={colors.Primary[700]}
                                            fontWeight="bold"
                                            sx={{m: "10px 0 0 0"}}
                                        >
                                            {user == null ? "" : user.name}
                                        </Typography>
                                        <Typography variant={"subtitle1"} color={colors.Primary[500]}>
                                            {user == null ? "" : user.email}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        style={{
                                            color: colors.Primary[800],
                                        }}
                                        onClick={() => {
                                            dispatch(setLogout());
                                            navigate("/");
                                        }}
                                    >
                                        <Typography>Logout</Typography>
                                    </MenuItem>
                                </Box>
                            )
                            }
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {user === null && (
                            <Item
                                title="Courses"
                                to="/"
                                icon={<CalendarMonthIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {user !== null && (
                            <div>
                            <Typography
                                variant="h6"
                                color={colors.Primary[600]}
                                sx={{m: "15px 0 5px 20px"}}
                            >
                                Studies
                            </Typography>
                            <Item
                            title="Register course"
                            to="/approvedCourses"
                            icon={<EventAvailableIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            />
                            <Item
                            title="Courses Student"
                            to="/coursesStudent"
                            icon={<SchoolIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            />
                            <Item
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            />
                            <Typography
                            variant="h6"
                            color={colors.Primary[600]}
                            sx={{m: "15px 0 5px 20px"}}
                            >
                            Teaching
                            </Typography>
                            <Item
                            title="Courses Lector"
                            to="/coursesLector"
                            icon={<PsychologyIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            />
                            <Typography
                            variant="h6"
                            color={colors.Primary[600]}
                            sx={{m: "15px 0 5px 20px"}}
                            >
                            Guarantor
                            </Typography>
                            <Item
                            title="Create course"
                            to="/createCourse"
                            icon={<CreateIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            />
                            <Item
                            title="Courses Guarantor"
                            to="/coursesGuarantor"
                            icon={<PsychologyAltIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            />
                            </div>
                        )}
                        {user != null && user.admin == true && (
                            <div>
                                <Typography
                                    variant="h6"
                                    color={colors.Primary[600]}
                                    sx={{m: "15px 0 5px 20px"}}
                                >
                                    Admin
                                </Typography>
                                <Item
                                    title="Register"
                                    to="/register"
                                    icon={<HowToRegIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Profiles"
                                    to="/profiles"
                                    icon={<GroupIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Create room"
                                    to="/createRoom"
                                    icon={<MeetingRoomIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Edit room"
                                    to="/editRoom"
                                    icon={<RoomPreferencesIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Approve course"
                                    to="/approveCourse"
                                    icon={<DomainVerificationIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                        )
                        }
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;