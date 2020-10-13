import React, { useEffect } from "react";
import {
    Tooltip,
    Select,
    DatePicker
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddBooking from "./AddBooking";

const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const BookingCalendar = props => {

    useEffect(() => {
        const now = new Date();
        labelDays = getLabelDays(now);
    }, []);

    const getLabelDays = (startDay) => {
        const DAY = 1000 * 60 * 60 * 24;
        let dates = [];

        // start Day is 6 days before (beforeDates) before real start date
        startDay.setTime(startDay.getTime() - 6 * DAY);

        for (let i = 0; i < 14; i++) {
            startDay.setTime(startDay.getTime() + DAY);
            const dateAsString = startDay.getDate() + '-' + (startDay.getMonth() + 1) + '-' + startDay.getFullYear();

            dates.push(dateAsString);
        }

        return dates;
    }

    const isBooked = (room, day) => {
        const roomBookings = props.bookings.filter(x => x.room.id == room.id);
        const result = dateIsBooked(roomBookings, day);

        let bookingType = "";

        if (result == null) {
            bookingType = '';
        }
        else if (result.status == "NEW") {
            bookingType = 'field-is-booked-new b-' + result.id;
        }
        else if (result.status == "CONFIRMED") {
            bookingType = 'field-is-booked-confirmed b-' + result.id;
        }
        else if (result.status == "CHECKEDIN") {
            bookingType = 'field-is-booked-checkedin b-' + result.id;
        }
        else if (result.status == "CHECKEDOUT") {
            bookingType = 'field-is-booked-checkedout b-' + result.id;
        }
        else {
            bookingType = 'field-is-booked b-' + result.id;
        }


        return bookingType;
    }

    const dateIsBooked = (roomBookings, day) => {
        day = day.split('-').reverse().join('-');
        const fieldDate = new Date(day);
        fieldDate.setHours(0,0,0,0);

        for (let i = 0; i < roomBookings.length; i++) {
            const startDate = new Date(roomBookings[i].startDate.split("-").reverse().join("-"));
            const endDate = new Date(roomBookings[i].endDate.split("-").reverse().join("-"));

            const bookedDates = getDates(startDate, endDate);

            for (let j = 0; j < bookedDates.length; j++) {
                if (bookedDates[j].getTime() === fieldDate.getTime()) {
                    return roomBookings[i];
                }
            }
        }

        return null;
    }

    const getDates = (startDate, stopDate) => {
        const DAY = 1000 * 60 * 60 * 24;

        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            const date = new Date(currentDate);
            currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            dateArray.push(new Date(currentDate));
            currentDate.setTime(currentDate.getTime() + DAY);
        }

        return dateArray;
    }

    let labelDays = getLabelDays(new Date());

    let uniqueKey = 'key';

    return (
        <div>
            <div className="calendar">
                <div className="calendar-row">
                    <div className="calendar-field room-name">
                        Choose Date Here
                    </div>
                    {
                        labelDays.map(labelDay => {
                            return <div className="calendar-field calendar-date-field" key={labelDay}>{ labelDay.split('-')[0] + '. ' + labelDay.split('-')[1]  + '.' }</div>  
                        })
                    }
                </div>
                {
                    props.rooms.map((room, j) => {
                        uniqueKey++;
                        return (
                            <div className="calendar-row">
                                <div key={"key" + uniqueKey} className="calendar-field room-name">
                                    { room.name }
                                </div>
                                {
                                    labelDays.map((labelDay, i) => {
                                        let field = "";
                                        if (isBooked(room, labelDay)) {
                                            const bookingId = isBooked(room, labelDay).split(' ')[1].split('-')[1];
                                            let bookingInfo = props.bookings.filter(b => b.id == bookingId)[0];
                                            let tooltipText = () => {
                                                return (
                                                  <>
                                                     <p>Room: {bookingInfo.room.name}</p>
                                                     <p>Client {bookingInfo.client.name}</p>
                                                     <p>Total: {bookingInfo.price}</p>
                                                     <p>Start Date: {bookingInfo.startDate}</p>
                                                     <p>End Date: {bookingInfo.endDate}</p>
                                                </>
                                               )
                                            }
                                            field = <Tooltip arrowPointAtCenter className={"calendar-field can-book " + (isBooked(room, labelDay))} title={tooltipText}><div></div></Tooltip> 
                                        }
                                        else {
                                            field = <div className={"calendar-field can-book "} key={i}></div> 
                                        }
                                        return field;
                                    })
                                }
                            </div>                
                        )
                    })
                }
            </div>
        </div>
    );
};

export default BookingCalendar;
