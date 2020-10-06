import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Register = () => {
    const onFinish = values => {
        console.log("Received values of form: ", values);
    };

    return (
        <div className="auth">
            <Form className="auth__form" onFinish={onFinish}>
                <h1 className="auth__title">Hotel Manager</h1>
                <h4 className="auth__subtitle">Register</h4>
                <Form.Item
                    name="fullName"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please enter your full name!"
                        },
                        {
                            max: 100,
                            message: "Maximum of 100 characters."
                        }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="input-icon" />}
                        placeholder="Full Name"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!"
                        },
                        {
                            required: true,
                            message: "Please enter your full email!"
                        },
                        {
                            max: 100,
                            message: "Maximum of 100 characters."
                        }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="input-icon" />}
                        placeholder="Email"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!"
                        },
                        {
                            min: 6,
                            message: "Password must be minimum 6 characters."
                        },
                        {
                            max: 100,
                            message: "Maximum of 100 characters."
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="input-icon" />}
                        type="password"
                        placeholder="Password"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    placeholder="Confirm Password"
                    dependencies={["password"]}
                    size="large"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                );
                            }
                        })
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="input-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                        size="large"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Log in
                    </Button>
                    <div className="auth__bottom-text">
                        Or
                        <NavLink className="auth__link" to="/" exact>
                            login now!
                        </NavLink>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
