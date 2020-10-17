import React, { useState } from 'react'
import { Modal, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ClientsCreate = props => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = values => {
        props.addClient(values);
        setVisible(false);
    };

    if (props.success) {
        form.resetFields();
    }

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
            <Modal
                title="Add Client"
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
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
    )
}

export default ClientsCreate
