import React, { useEffect, useState } from "react";
import {
    Tooltip,
    Select,
    DatePicker
} from "antd";
import moment from 'moment';
import Spinner from "../UI/Spinner";

const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const BookingCalendar = props => {
    let [labelDaysState, setLabelDays] = useState([]);
    
    let startDate = moment();

    useEffect(() => {
        const now = new Date();
        labelDays = getLabelDays(now);
        labelDaysState = setLabelDays(getLabelDays(new Date));
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

        if (roomBookings.length > 0) {
            for (let i = 0; i < roomBookings.length; i++) {
                const startDate = new Date(roomBookings[i].startDate.split("-").reverse().join("-"));
                const endDate = new Date(roomBookings[i].endDate.split("-").reverse().join("-"));
    
                const bookedDates = getDates(startDate, endDate);
                console.log(bookedDates.length);

                if (bookedDates.length > 0) {
                    for (let j = 0; j < bookedDates.length; j++) {
                        if (bookedDates[j].getTime() === fieldDate.getTime()) {
                            return roomBookings[i];
                        }
                    }
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

    console.log('test 2');

    let labelDays = getLabelDays(new Date());

    let uniqueKey = 'key';

    const onDateChange = (date, dateString) => {
        labelDays = getLabelDays(date.toDate());

        const formatedDate = stringToDate(dateString, "dd/MM/yyyy","/");
        setLabelDays(getLabelDays(formatedDate));
    }

    const stringToDate = (date, format, delimiter) => {
        let formatLowerCase = format.toLowerCase();
        let formatItems = formatLowerCase.split(delimiter);
        let dateItems =date.split(delimiter);
        let monthIndex = formatItems.indexOf("mm");
        let dayIndex = formatItems.indexOf("dd");
        let yearIndex = formatItems.indexOf("yyyy");
        let month=parseInt(dateItems[monthIndex]);

        month -= 1;

        let formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        return formatedDate;
    }

    let calendar = <Spinner />

    if (!props.loading) {
        calendar = (
            <div className="calendar">
                    <div className="calendar-row">
                        <div className="calendar-field room-name">
                            <DatePicker 
                                defaultValue={moment()} 
                                format={dateFormat} 
                                onChange={onDateChange} />
                        </div>
                        {
                            labelDaysState.map(labelDay => {
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
                                        labelDaysState.map((labelDay, i) => {
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
        );
    }

    if (props.bookings.length == 0) {
        calendar = "There are no bookings."
    }
    return (
        <div>
            {calendar}
        </div>
    );
};

export default BookingCalendar;
