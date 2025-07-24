"use client"

import Image from "next/image";
import Calendar from "react-calendar";
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// Temporary
const events = [
    {
        "id": 1,
        "title": "Science Fair Showcase",
        "time": "9:00 AM - 1:00 PM",
        "description": "Students display projects, explore scientific wonders."
    },
    {
        "id": 2,
        "title": "Community Sports Day",
        "time": "10:00 AM - 3:00 PM",
        "description": "Fun games and activities for students."
    },
    {
        "id": 3,
        "title": "Talent Show Extravaganza",
        "time": "6:00 PM - 8:30 PM",
        "description": "Students showcase singing, dancing, and more!"
    },
    {
        "id": 4,
        "title": "Outdoor Movie Night",
        "time": "7:30 PM - 9:30 PM",
        "description": "Enjoy a family-friendly film under the stars."
    }
]

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

    return(
        <div className="bg-white p-4 rounded-md">
            <Calendar onChange={onChange} value={value} calendarType="gregory" />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Events</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <div className="flex flex-col gap-4">
                {events.map(event => (
                    <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-mapSky even:border-t-mapPurple" key={event.id}>
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-gray-600">{event.title}</h1>
                            <span className="text-gray-300 text-xs">{event.time}</span>
                        </div>
                        <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default EventCalendar;