import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Alert } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    }
];

const Departments = props => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = values => {
        props.addDepartment(values);
    };

    return (
        <div>
            <Button
                className="settings__add-button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setVisible(true)}
            >
                Add Department
            </Button>

            <Table
                pagination={{ pageSize: 6 }}
                columns={columns}
                dataSource={props.departments}
                rowKey="name"
            />

            <Modal
                title="Add Department"
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                {props.error ? (
                    <Alert
                        className="alert-message"
                        message={props.error}
                        type="error"
                        closable
                    />
                ) : null}
                <Form onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Department Name"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter department name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Department Name" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Departments;
