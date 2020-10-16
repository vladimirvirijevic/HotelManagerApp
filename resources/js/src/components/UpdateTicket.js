import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";
import { Button, Form, Input, Tag, Card, TimePicker  } from "antd";

const { RangePicker } = TimePicker;
const { TextArea } = Input;
const format = 'HH:mm';

const UpdateTicket = props => {
    const params  = useParams();

    useEffect(() => {
        props.onGetTicket(params.id);
    }, []);

    const handleSubmit = values => {
        console.log(values);
    }

    const handleGoBack = () => {
        props.history.goBack();
    }

    let updateTicket = null;
    if (props.ticket) {
        updateTicket = (
            <Card title="Update ticket">
                <div>
                    <Form 
                        initialValues={{ internalUpdate: "", description: "", service: props.ticket.serviceName}} 
                        onFinish={handleSubmit} 
                        layout="vertical">

                        <div className="create-ticket-column">
                            <Form.Item
                                className="create-ticket-column__item-left"
                                label="Ticket Update Name"
                                name="name"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter ticket update name!"
                                    },
                                    {
                                        max: 100,
                                        message: "Maximum of 100 characters."
                                    }
                                ]}
                            >
                                <Input placeholder="Enter Ticket Update Name" />
                            </Form.Item>

                            <Form.Item
                                className="create-ticket-column__item-right"
                                label="Service"
                                name="service"
                                hasFeedback
                            >
                                <Input 
                                    disabled/>
                            </Form.Item>
                        </div>

                        <div className="update-ticket__tags">
                            <p>Contributors</p>
                            {
                                props.ticket.contributors.map(contributor => {
                                    return <Tag color="#5e5ec5" key={contributor.id}>{contributor.name}</Tag>
                                })
                            }
                        </div>

                        <div className="update-ticket__time-worked">
                            <p>Time Worked</p>
                            {
                                props.ticket.contributors.map(contributor => {
                                    return (
                                        <div className="update-ticket__time-worked-item">
                                            <p>{contributor.name}</p>
                                            <Form.Item
                                                name={`contributor-${contributor.id}`}
                                            >
                                                <RangePicker 
                                                    format={format} 
                                                    className="update-ticket__rangepicker" />
                                            </Form.Item>
                                            <p>Total Hours: 0</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        
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
                            <Button className="form-button" type="primary" htmlType="submit">
                                Create
                            </Button>
                            <Button type="secondary" htmlType="button" onClick={handleGoBack}>
                                Go Back
                            </Button>
                        </Form.Item>
                        
                    </Form>
                </div>
            </Card>
        );
    }

    return (
        <div>
            {updateTicket}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ticket: state.tickets.updateTicket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTicket: (id) => dispatch(actions.getTicketById(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTicket)
