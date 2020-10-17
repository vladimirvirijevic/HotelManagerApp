import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Alert } from "antd";

const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Capacity",
        dataIndex: "capacity"
    },
    {
        title: "Price",
        dataIndex: "price"
    }
];

const Rooms = props => {
    const [visible, setVisible] = useState(false);
    let alertMessage = null;

    const handleSubmit = values => {
        props.addRoom(values);
        setVisible(false);
    };

    const [form] = Form.useForm();

    if (props.addSuccess) {
        form.resetFields();
    }

    
    if (props.addSuccess) {
        alertMessage = (
            <Alert
                className="alert-message"
                message="Room Added Successfully"
                type="success"
            />
        );
    }
    else if (props.error) {
        alertMessage = (
            <Alert
                className="alert-message"
                message={props.error}
                type="error"
            />
        );
    }

    return (
        <div>
            <Button
                className="settings__add-button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setVisible(true)}
            >
                Add Room
            </Button>
            {alertMessage}
            <Table
                pagination={{ pageSize: 6 }}
                columns={columns}
                dataSource={props.rooms}
                rowKey="name"
            />

            <Modal
                title="Add Room"
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                {/* {props.error ? (
                    <Alert
                        className="alert-message"
                        message={props.error}
                        type="error"
                        closable
                    />
                ) : null} */}
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Room Name"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter room name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Room Name" />
                    </Form.Item>

                    <Form.Item
                        label="Capacity"
                        name="capacity"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter room capacity!"
                            }
                        ]}
                    >
                        <InputNumber
                            className="input-number"
                            min={1}
                            max={30}
                            initialValue={1}
                            placeholder="Enter Capacity"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price Per Day"
                        name="price"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter room price!"
                            }
                        ]}
                    >
                        <InputNumber
                            className="input-number"
                            min={1}
                            max={100000}
                            initialValue={1}
                            placeholder="Enter Price"
                        />
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

export default Rooms;
