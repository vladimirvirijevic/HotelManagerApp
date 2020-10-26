import React from "react";
import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const BookingsList = (props) => {
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
        },
        {
            title: 'Delete',
            key: 'delete',
            dataIndex: 'delete',
            width: 100,
            render: (text, record) => (
             <Button icon={<CloseOutlined />} type="danger" onClick={()=> props.deleteBooking(record)}>
               {"Delete"}
             </Button>
            ),
        }
    ]; 
    
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
