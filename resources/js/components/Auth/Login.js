import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Login = props => {
    const onFinish = values => {
        console.log("Received values of form: ", values);
    };

    return (
        <div className="auth">
            <Form className="auth__form" onFinish={onFinish}>
                <h1 className="auth__title">Hotel Manager</h1>
                <h4 className="auth__subtitle">Login</h4>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!"
                        }
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!"
                        }
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                        size="large"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Log in
                    </Button>
                    <div className="auth__bottom-text">
                        Or
                        <NavLink className="auth__link" to="/register" exact>
                            register now!
                        </NavLink>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
