import React from 'react'
import { Table } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    }
];

const UnitsList = props => {
    console.log('units list');
    return (
        <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={props.units}
            rowKey="name"
        />
    )
}

export default UnitsList
