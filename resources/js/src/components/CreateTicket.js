import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { Button, Form, Input, Select } from "antd";
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";
import ReactQuill from 'react-quill';
import RichTextEditor from 'react-rte';

const { Option } = Select;
const { TextArea } = Input;

const CreateTicket = props => {
    useEffect(() => {
        props.onGetServices();
        props.onGetUsers();
    }, []);

    const [internalText, setInternalText] = useState("");

    const handleSubmit = (values) => {
        props.onAddTicket(values);
        console.log('r');
    }

    return (
        <div>
            <Card title="Create ticket">
                <div>
                    <Form 
                        initialValues={{ internalUpdate: "", description: ""}} 
                        onFinish={handleSubmit} 
                        layout="vertical">

                        <div className="create-ticket-column">
                            <Form.Item
                                className="create-ticket-column__item-left"
                                label="Ticket Name"
                                name="name"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter ticket name!"
                                    },
                                    {
                                        max: 100,
                                        message: "Maximum of 100 characters."
                                    }
                                ]}
                            >
                                <Input placeholder="Enter Ticket Name" />
                            </Form.Item>

                            <Form.Item
                                className="create-ticket-column__item-right"
                                label="Service"
                                name="service"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose service!"
                                    }
                                ]}
                            >
                                <Select placeholder="Select a service" allowClear>
                                    {props.services.map(service => {
                                        return (
                                            <Option key={service.id} value={service.id}>
                                                {service.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                        

                        <Form.Item
                            label="Ticket Contributors"
                            name="contributors"
                            hasFeedback
                        >
                            <Select 
                                placeholder="Select a ticket contributors" 
                                allowClear
                                mode="multiple">
                                {props.users.map(user => {
                                    return (
                                        <Option key={user.id} value={user.id}>
                                            {user.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    max: 10000,
                                    message: "Maximum of 10000 characters."
                                }
                            ]}
                        >
                            <TextArea placeholder="Enter description" rows={6} />
                        </Form.Item>

                        <Form.Item
                            label="Internal Update"
                            name="internalUpdate"
                            rules={[
                                {
                                    max: 10000,
                                    message: "Maximum of 10000 characters."
                                }
                            ]}
                        >
                            <TextArea placeholder="Enter internal update" rows={6} />
                        </Form.Item>
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                        
                    </Form>
                </div>
            </Card>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        services: state.services.services,
        users: state.auth.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetServices: () => dispatch(actions.getServices()),
        onGetUsers: () => dispatch(actions.getUsers()),
        onAddTicket: ticket => dispatch(actions.addTicket(ticket))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket)
