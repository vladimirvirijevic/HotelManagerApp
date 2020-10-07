import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Menu } from "antd";

const Login = props => {
    const onFinish = values => {
        props.onLogin(values);
    };

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <Alert
                className="alert-message"
                message={props.error}
                type="error"
                closable
            />
        );
    }

    let redirect = props.isAuth ? <Redirect to="/bookings" /> : null;

    return (
        <div className="auth-wrapper">
            <div className="auth">
                {redirect}
                <Form className="auth__form" onFinish={onFinish}>
                    {errorMessage}
                    <h1 className="auth__title">Hotel Manager</h1>
                    <h4 className="auth__subtitle">Login</h4>
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
                                message:
                                    "Password must be minimum 6 characters."
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
                    <Form.Item>
                        <Button
                            loading={props.loading}
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            Log in
                        </Button>
                        <div className="auth__bottom-text">
                            Or
                            <NavLink
                                className="auth__link"
                                to="/register"
                                exact
                            >
                                register now!
                            </NavLink>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

const mapStateToPros = state => {
    return {
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: loginInfo => dispatch(actions.login(loginInfo))
    };
};

export default connect(mapStateToPros, mapDispatchToProps)(Login);
