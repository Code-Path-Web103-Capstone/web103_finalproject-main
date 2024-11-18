import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BudgetCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Budget Summary",
      start: new Date(2024, 10, 1), // November 1, 2024
      end: new Date(2024, 10, 1),
    },
  ]);

  const handleSelectEvent = (event) => {
    alert(`Clicked event: ${event.title}`);
  };

  const handleNavigate = (date) => {
    console.log("Current view date:", date);
  };

  return (
    <div className="container flex-grow border-2 border-blue-600">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.MONTH} // Default to Month View
        views={["month", "year"]} // Enable only Month and Year views
        onSelectEvent={handleSelectEvent}
        onNavigate={handleNavigate}
        style={{
          height: "800px",
          backgroundColor: "#f9f9f9",
          border: "2px solid #blue",
        }}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
        }}
      />
    </div>
  );
};

const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <button
        onClick={() => onNavigate("PREV")}
        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        Prev
      </button>
      <span className="text-lg font-semibold">{label}</span>
      <button
        onClick={() => onNavigate("NEXT")}
        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        Next
      </button>
      <div className="flex space-x-2">
        <button
          onClick={() => onView("month")}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Month
        </button>
        <button
          onClick={() => onView("year")}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Year
        </button>
      </div>
    </div>
  );
};

export default BudgetCalendar;
