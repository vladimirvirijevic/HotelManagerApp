import React, { useEffect } from "react";
import { Tabs } from "antd";
import { CalendarOutlined, UnorderedListOutlined } from "@ant-design/icons";
import BookingCalendar from "../../components/Bookings/BookingCalendar";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import AddBooking from "../../components/Bookings/AddBooking";
import BookingsList from "../../components/Bookings/BookingsList";

const { TabPane } = Tabs;

const Bookings = props => {
    useEffect(() => {
        props.onGetBookings();
        props.onGetRooms();
        props.onGetClients();
        
    }, []);

    const onAddBooking = bookingInfo => {
        const booking = {
            startDate: bookingInfo.dates[0].format("DD-MM-YYYY"),
            endDate: bookingInfo.dates[1].format("DD-MM-YYYY"),
            status: bookingInfo.status,
            client: bookingInfo.client,
            room: bookingInfo.room,
            note: bookingInfo.note
        };

        props.onAddBooking(booking);
    };

    return (
        <div>
            <div>
                <Tabs className="settings__tabs" defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <CalendarOutlined />
                                Calendar
                            </span>
                        }
                        key="1"
                    >
                        <AddBooking
                            error={props.bookingError}
                            rooms={props.rooms}
                            clients={props.clients}
                            addBooking={onAddBooking}
                        />
                        <BookingCalendar rooms={props.rooms} bookings={props.bookings} />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <UnorderedListOutlined />
                                Bookings
                            </span>
                        }
                        key="2"
                    >
                        <AddBooking
                            error={props.bookingError}
                            rooms={props.rooms}
                            clients={props.clients}
                            addBooking={onAddBooking}
                        />
                        <BookingsList bookings={props.bookings} />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        rooms: state.rooms.rooms,
        clients: state.clients.clients,
        bookings: state.bookings.bookings,
        bookingError: state.bookings.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRooms: () => dispatch(actions.getRooms()),
        onGetClients: () => dispatch(actions.getClients()),
        onAddBooking: bookings => dispatch(actions.addBooking(bookings)),
        onGetBookings: () => dispatch(actions.getBookings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
