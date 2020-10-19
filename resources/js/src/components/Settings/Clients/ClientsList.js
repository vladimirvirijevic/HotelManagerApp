import React from 'react'
import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const ClientsList = props => {
    
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
        },
        {
            title: 'Delete',
            key: 'delete',
            dataIndex: 'delete',
            width: 100,
            render: (text, record) => (
             <Button icon={<CloseOutlined />} type="danger" onClick={()=> props.deleteClient(record)}>
               {"Delete"}
             </Button>
            ),
        }
    ];

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
