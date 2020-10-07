import React from "react";
import { Form, Input, Button, Alert } from "antd";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    HomeOutlined
} from "@ant-design/icons";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Register = props => {
    const onFinish = values => {
        props.onRegister(values);
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

    let redirect = props.isAuth ? <Redirect to="/test" /> : null;

    return (
        <div className="auth-wrapper">
            <div className="auth">
                {redirect}
                <Form className="auth__form" onFinish={onFinish}>
                    {errorMessage}
                    <h1 className="auth__title">Hotel Manager</h1>
                    <h4 className="auth__subtitle">Register</h4>
                    <Form.Item
                        name="name"
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
                        name="hotel"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter hotel name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input
                            prefix={<HomeOutlined className="input-icon" />}
                            placeholder="Hotel Name"
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
                        <Button
                            loading={props.loading}
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            Register
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
        </div>
    );
};

const mapStateToPros = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: registerInfo => dispatch(actions.register(registerInfo))
    };
};

export default connect(mapStateToPros, mapDispatchToProps)(Register);
