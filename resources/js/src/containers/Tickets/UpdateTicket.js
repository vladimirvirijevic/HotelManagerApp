import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import { Button, Form, Input, Tag, Card, TimePicker, Alert  } from "antd";
import UpdateTicketInfo from '../../components/Tickets/UpdateTicketInfo';
import OriginalTicketInfo from '../../components/Tickets/OriginalTicketInfo';

const { RangePicker } = TimePicker;
const { TextArea } = Input;
const format = 'HH:mm';

const UpdateTicket = props => {
    const params  = useParams();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [form] = Form.useForm();

    let alertMessage = null;

    const handleCloseAlert = () => {
        props.onClearAlertMessage();
        setShowErrorMessage(false);
    }

    if (showErrorMessage) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message="You must set time for at least one user"
                type="error"
            />
        );
    }
    else if (props.success) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message="Ticket updated successfully."
                type="success"
            />
        );
    }

    if (props.success) {
        form.resetFields();
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

        props.onAddTicketUpdate(ticketUpdate);
        props.onGetTicket(params.id);
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
                        form={form}
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
                            <p><b>Contributors</b></p>
                            {
                                props.ticket.contributors.map(contributor => {
                                    return <Tag color="#5e5ec5" key={contributor.id}>{contributor.name}</Tag>
                                })
                            }
                        </div>

                        <div className="update-ticket__time-worked">
                            <p><b>Time Worked</b></p>
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

    let ticketUpdates = null;

    if (props.ticket) {
        let updateCount = 0;
        ticketUpdates = (
            props.ticket.updates.map(update => {
                ++updateCount;
                return <UpdateTicketInfo 
                    updateNumber={updateCount} 
                    key={update.id} update={update}
                    />
            })
        )
    }

    return (
        <div>
            {alertMessage}
            {updateTicket}
            <OriginalTicketInfo ticket={props.ticket} />
            {ticketUpdates}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ticket: state.tickets.updateTicket,
        success: state.tickets.updateSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTicket: (id) => dispatch(actions.getTicketById(id)),
        onAddTicketUpdate: ticketUpdate => dispatch(actions.addTicketUpdate(ticketUpdate)),
        onClearAlertMessage: () => dispatch(actions.clearTicketMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTicket)
