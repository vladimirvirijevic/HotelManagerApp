import React from "react";
import { Table, Alert } from "antd";

const columns = [
    {
        title: "Id",
        dataIndex: "id"
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
