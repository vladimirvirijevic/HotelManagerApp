import React, { useState } from 'react'
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UnitsCreate = props => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = values => {
        props.addUnit(values);
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
                Add Unit
            </Button>

            <Modal
                title="Add Unit"
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
                        label="Unit Name"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter unit name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Unit Name" />
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

export default UnitsCreate
