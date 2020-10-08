import React, { useState } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Alert } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
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

const Clients = props => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = values => {
        props.addClient(values);
    };

    return (
        <div>
            <Button
                className="settings__add-button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setVisible(true)}
            >
                Add Client
            </Button>

            <Table
                pagination={{ pageSize: 6 }}
                columns={columns}
                dataSource={props.clients}
                rowKey="name"
            />

            <Modal
                title="Add Client"
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
                        label="Client Name"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter client name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Client Name" />
                    </Form.Item>

                    <Form.Item
                        label="Client Email"
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                            {
                                required: true,
                                message: "Please enter client name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Client Email" />
                    </Form.Item>

                    <Form.Item
                        label="Client Phone"
                        name="phone"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter client phone!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Client Phone" />
                    </Form.Item>

                    <Form.Item
                        label="Client Address"
                        name="address"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter client address!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Client Address" />
                    </Form.Item>

                    <Form.Item
                        label="Client Note"
                        name="note"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter client note!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Client Note" />
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

export default Clients;
