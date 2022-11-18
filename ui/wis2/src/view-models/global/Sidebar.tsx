import {useEffect, useState} from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import {tokens} from "../../theme";
import "./styles.css"
import Logo from "./logo.png"
import LogoD from "./logo_dark.png"
import { setLogout } from "../../state/UserState";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

interface IUser{
    admin: boolean
    name: string
    surname: string
    id: number
    email: string
}

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
    const [isCollapsed, setIsCollapsed] = useState(false);
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
                                {theme.palette.mode == "light" ? (<img width={80} src={Logo}/>): (<img width={80} src={LogoD}/>)}
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
                                    <Typography
                                        variant="h2"
                                        color={colors.Primary[700]}
                                        fontWeight="bold"
                                        sx={{m: "10px 0 0 0"}}
                                    >
                                        {user == null ? "" : user.name}
                                    </Typography>
                                    <Typography variant="h5" color={colors.Primary[500]}>
                                        {user == null ? "" : user.email}
                                    </Typography>
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
                        {user != null && user.admin == true && (
                            <Item
                                title="Register"
                                to="/register"
                                icon={<HomeOutlinedIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )
                        }
                        <Typography
                            variant="h6"
                            color={colors.Primary[600]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Data
                        </Typography>
                        <Item
                            title="jine"
                            to="/jine"
                            icon={<PeopleOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Contacts Information"
                            to="/contacts"
                            icon={<ContactsOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoices Balances"
                            to="/invoices"
                            icon={<ReceiptOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.Primary[600]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Pages
                        </Typography>
                        <Item
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlinedIcon/>}
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
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.Primary[600]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Charts
                        </Typography>
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Geography Chart"
                            to="/geography"
                            icon={<MapOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;