import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";
import { Button, Form, Input, Tag, Card, TimePicker, Alert  } from "antd";

const { RangePicker } = TimePicker;
const { TextArea } = Input;
const format = 'HH:mm';

const UpdateTicket = props => {
    const params  = useParams();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    let errorMessage = null;

    if (showErrorMessage) {
        errorMessage = (
            <Alert
                className="alert-message"
                message="You must set time for at least one user"
                type="error"
            />
        );
    }

    useEffect(() => {
        props.onGetTicket(params.id);
    }, []);

    const handleSubmit = values => {
        let contributors = [];

        Object.keys(values).map(key => {
            if (key.includes("contributor-")) {
                if (values[key]) {
                    const contributor = {
                        contributor_id: key.split('-')[1],
                        startTime: values[key][0].format("hh:mm"),
                        endTime: values[key][1].format("hh:mm"),
                        duration: values[key][1].diff(values[key][0], 'minutes')
                    }

                    contributors.push(contributor);
                }
            }
        });

        if (contributors.length == 0) {
            setShowErrorMessage(true);
            return;
        }
        else {
            setShowErrorMessage(false);
        }

        const ticketUpdate = {
            ticketId: props.ticket.id,
            name: values.name,
            description: values.description,
            internalUpdate: values.internalUpdate,
            contributors: contributors
        }

        console.log(ticketUpdate);

        props.onAddTicketUpdate(ticketUpdate);
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
            {errorMessage}
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
        onGetTicket: (id) => dispatch(actions.getTicketById(id)),
        onAddTicketUpdate: ticketUpdate => dispatch(actions.addTicketUpdate(ticketUpdate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTicket)
