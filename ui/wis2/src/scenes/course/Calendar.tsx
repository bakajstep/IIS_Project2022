import {Box, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
import FullCalendar, {EventSourceInput, formatDate} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {useEffect, useState} from "react";
import {tokens} from "../../theme";
import axios from "axios";
import {useSelector} from "react-redux";
import {IEvent} from "../../interfaces/Course";

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState<IEvent[]>([]);
    const [calendar, setCalendar] = useState<EventSourceInput>();
    const user = useSelector((state: any) => state.user);

    const getValues = async () => {
        const optionAxios = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.get(`/api/person/${user.id}/schedule`, optionAxios)
            .then(res => {
                setCalendar(res.data)
                let obj: IEvent[] = res.data.events;
                setCurrentEvents(obj);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getValues();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return(
        <Box m="20px">


            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="timeGridDay"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        events={currentEvents}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Calendar;