import React from 'react'
import { Table } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    }
];

const DepartmentsList = props => {
    console.log('dept list')
    return (
        <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={props.departments}
            rowKey="name"
        />
    )
}

export default DepartmentsList
