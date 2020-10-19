import React from 'react'
import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const ServicesList = props => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: 'Delete',
            key: 'delete',
            dataIndex: 'delete',
            width: 100,
            render: (text, record) => (
             <Button icon={<CloseOutlined />} type="danger" onClick={()=> props.deleteService(record)}>
               {"Delete"}
             </Button>
            ),
        }
    ];

    return (
        <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={props.services}
            rowKey="name"
        />
    )
}

export default ServicesList
