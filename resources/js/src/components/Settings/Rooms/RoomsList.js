import React from 'react'
import { Table } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Capacity",
        dataIndex: "capacity"
    },
    {
        title: "Price",
        dataIndex: "price"
    }
]

const RoomsList = props => {
    console.log('rooms list');
    return (
        <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={props.rooms}
            rowKey="name"
        />
    )
}

export default RoomsList
