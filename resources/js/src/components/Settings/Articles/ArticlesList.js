import React from 'react'
import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const ArticlesList = props => {
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
             <Button icon={<CloseOutlined />} type="danger" onClick={()=> props.deleteArticle(record)}>
               {"Delete"}
             </Button>
            ),
        }
    ];

    return (
        <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={props.articles}
            rowKey="name"
        />
    )
}

export default ArticlesList
