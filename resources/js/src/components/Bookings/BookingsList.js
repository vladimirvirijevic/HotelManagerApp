import React, { useState } from "react";
import { Table, Button } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import UpdateBooking from "./UpdateBooking";

const BookingsList = (props) => {
    const [visible, setVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const onUpdateBooking = booking => {
        setVisible(true);
        setSelectedBooking(booking);
    }

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
            title: 'Update',
            key: 'update',
            dataIndex: 'update',
            width: 100,
            render: (text, record) => (
             <Button icon={<EditOutlined />} type="primary" onClick={() => onUpdateBooking(record)}>
               {"Update"}
             </Button>
            ),
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
        <UpdateBooking
            updateBooking={props.updateBooking}
            booking={selectedBooking}
            visible={visible} 
            onCancel={() => setVisible(false)}/>
    </div>
};

export default BookingsList;
