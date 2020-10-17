import React from 'react'
import { Table } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Id",
        dataIndex: "id"
    },
    {
        title: "Phone",
        dataIndex: "phone"
    },
    {
        title: "Email",
        dataIndex: "email"
    },
    {
        title: "Address",
        dataIndex: "address"
    },
    {
        title: "Note",
        dataIndex: "note"
    }
];

const ClientsList = props => {
    return (
        <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={props.clients}
            rowKey="id"
        />
    )
}

export default ClientsList
