import React from 'react'
import { Card, Button, Form, Input } from 'antd';

const ChangeName = props => {
    const [form] = Form.useForm();

    const handleSubmit = values => {
        const userInfo = {
            id: props.user.id,
            name: values.name
        };

        console.log(userInfo);

        props.changeName(userInfo);
    };

    let changeName = null;

    if (props.user) {
        changeName = (
            <Card title="Change name" style={{ maxWidth: 600 }}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <p>{props.user.name}</p>
                    <Form.Item
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter new name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter New Name" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

    return changeName;
}

export default ChangeName
