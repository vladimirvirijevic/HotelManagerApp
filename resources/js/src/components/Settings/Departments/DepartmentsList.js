import React from 'react'
import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const DepartmentsList = props => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: 'Delete',
            key: 'delete',
            dataIndex: 'delete',
            width: 100,
            render: (text, record) => (
             <Button icon={<CloseOutlined />} type="danger" onClick={()=> props.deleteDepartment(record)}>
               {"Delete"}
             </Button>
            ),
        }
    ];

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
