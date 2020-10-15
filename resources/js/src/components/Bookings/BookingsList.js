import React from "react";
import { Table } from "antd";

const columns = [
    {
        title: "Id",
        dataIndex: "id"
    },
    {
        title: "Room",
        dataIndex: ['room', 'name']
    },
    {
        title: "Client",
        dataIndex: ['client', 'name']
    },
    {
        title: "Start Date",
        dataIndex: "startDate"
    },
    {
        title: "End Date",
        dataIndex: "endDate"
    },
    {
        title: "Status",
        dataIndex: "status"
    }
]; 


const BookingsList = (props) => {
    return <div>
        <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={props.bookings}
            rowKey="id"
        />
    </div>
};

export default BookingsList;
