import React from 'react'
import { Table } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Price",
        dataIndex: "price"
    }
];

const ServicesList = props => {
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
