import React, { useState } from 'react'
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ServicesCreate = props => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = values => {
        props.addService(values);
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
                Add Service
            </Button>
            <Modal
                title="Add Service"
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
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Service Name"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter service name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Service Name" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter service price!"
                            }
                        ]}
                    >
                        <InputNumber
                            className="input-number"
                            min={1}
                            max={30}
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
    )
}

export default ServicesCreate
