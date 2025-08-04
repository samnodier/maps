"use client";

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { adjustScheduleToCurrentWeek } from '@/lib/utils';

const localizer = momentLocalizer(moment);

/**
 * BigCalendar component
 * 
 * @param {{data: any}} props - properties passed by parent component
 * @returns {JSX.Element} - JSX element
 * 
 * This component displays a calendar in the page. It displays either a work week view or a day view.
 * The user can switch between these two views by clicking on the buttons at the top of the calendar.
 * The calendar is restricted to display events between 8am and 5pm.
 */
const BigCalendar = ({
    data
}: {
    data: { title: string; start: Date; end: Date }[];
}) => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);
    const handleOnViewChange = (selectedView: View) => {
        setView(selectedView);
    };


    return (
        <Calendar
            localizer={localizer}
            events={data}
            startAccessor="start"
            endAccessor="end"
            views={["work_week", "day"]}
            view={view}
            style={{ height: "98%" }}
            onView={handleOnViewChange}
            min={new Date(2025, 8, 0, 8, 0, 0, 0)}
            max={new Date(2025, 8, 0, 17, 0, 0, 0)}
        />
    );
};

export default BigCalendar;