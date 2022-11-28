// import {Box, List, ListItem, Typography, useTheme} from "@mui/material";
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {useEffect, useState} from "react";
// import {tokens} from "../../theme";
// import axios from "axios";
// import {useSelector} from "react-redux";
//
// const Calendar = () => {
//     /*const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const [currentEvents, setCurrentEvents] = useState([]);
//     const user = useSelector((state: any) => state.user);
//
//     const getValues = async () => {
//         const optionAxios = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };
//         await axios.get(`/api/course/${user.id}/term`, optionAxios)
//             .then(res => {
//                 let obj: ITerm[] = res.data.term;
//                 setTerms(obj);
//             }).catch(error => {
//                 console.log(error);
//             })
//     }
//
//     useEffect(() => {
//         getValues();
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps*/
//
//
//     return(
//         <Box m="20px">
//
//
//             <Box display="flex" justifyContent="space-between">
//                 {/* CALENDAR SIDEBAR */}
//
//                 <Box
//                     flex="1 1 20%"
//                     p="15px"
//                     borderRadius="4px"
//                 >
//                     <Typography variant="h5">Events</Typography>
//                     <List>
//                         {currentEvents.map((event) => (
//                             <ListItem
//                                 key={event.id}
//                                 sx={{
//                                     margin: "10px 0",
//                                     borderRadius: "2px",
//                                 }}
//                             >
//                                 <ListItemText
//                                     primary={event.title}
//                                     secondary={
//                                         <Typography>
//                                             {formatDate(event.start, {
//                                                 year: "numeric",
//                                                 month: "short",
//                                                 day: "numeric",
//                                             })}
//                                         </Typography>
//                                     }
//                                 />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//
//                 {/* CALENDAR */}
//                 <Box flex="1 1 100%" ml="15px">
//                     <FullCalendar
//                         height="75vh"
//                         plugins={[
//                             dayGridPlugin,
//                             timeGridPlugin,
//                             interactionPlugin,
//                             listPlugin,
//                         ]}
//                         headerToolbar={{
//                             left: "prev,next today",
//                             center: "title",
//                             right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//                         }}
//                         initialView="dayGridMonth"
//                         editable={true}
//                         selectable={true}
//                         selectMirror={true}
//                         dayMaxEvents={true}
//                         eventsSet={(events) => setCurrentEvents(events)}
//                     />
//                 </Box>
//             </Box>
//         </Box>
//     );
// }
//
// export default Calendar;

const Calendar = () => {
return(
    <div/>
);
}

export default Calendar;