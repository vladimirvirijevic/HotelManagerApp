import React, { useState } from "react";
import {
    Modal,
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    DatePicker
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddBooking from "./AddBooking";

const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const BookingCalendar = props => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = values => {
        props.addBooking(values);
    };

    return (
        <div>
            {/* <Button
                className="settings__add-button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setVisible(true)}
            >
                Add Booking
            </Button>

            <Modal
                title="Add Booking"
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
                <Form
                    initialValues={{
                        ["note"]: ""
                    }}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                            {
                                required: true,
                                message: "Please choose booking status!"
                            }
                        ]}
                    >
                        <Select placeholder="Select a status" allowClear>
                            <Option value="CONFIRMED">Confirmed</Option>
                            <Option value="FINISHED">Finished</Option>
                            <Option value="PENDING_CONFIRMATION">
                                Pending Confirmation
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Booked Dates"
                        name="dates"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please choose booking dates!"
                            }
                        ]}
                    >
                        <RangePicker
                            className="date-picker"
                            format={dateFormat}
                        />
                    </Form.Item>

                    <Form.Item
                        name="room"
                        label="Room"
                        rules={[
                            {
                                required: true,
                                message: "Please choose booked room!"
                            }
                        ]}
                    >
                        <Select placeholder="Select a room" allowClear>
                            {props.rooms.map(room => {
                                return (
                                    <Option key={room.id} value={room.id}>
                                        {room.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="client"
                        label="Client"
                        rules={[
                            {
                                required: true,
                                message: "Please choose client!"
                            }
                        ]}
                    >
                        <Select placeholder="Select a client" allowClear>
                            {props.clients.map(client => {
                                return (
                                    <Option key={client.id} value={client.id}>
                                        {client.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="note"
                        label="Note"
                        rules={[
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Booking Note" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal> */}
            Booking Calendar
        </div>
    );
};

export default BookingCalendar;
