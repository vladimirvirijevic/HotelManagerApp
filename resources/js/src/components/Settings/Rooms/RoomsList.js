import React from 'react'
import { Button, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const RoomsList = props => {
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
        },
        {
            title: 'Delete',
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => (
             <Button icon={<CloseOutlined />} type="danger" onClick={()=> props.deleteRoom(record)}>
               {"Delete"}
             </Button>
            ),
        }
    ]

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
