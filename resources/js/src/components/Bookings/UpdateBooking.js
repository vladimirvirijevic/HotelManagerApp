import React from 'react'
import {
    Modal,
    Form,
    Select,
    Button
} from "antd";

const { Option } = Select;

const UpdateBooking = props => {

    const handleSubmit = values => {
        if (props.booking) {
            props.updateBooking(props.booking.id, values);
        }
    };

    return (
        <div>
            <Modal
                title="Update Booking"
                visible={props.visible}
                footer={null}
                onCancel={props.onCancel}
            >
                <Form
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
                            <Option value="NEW">New</Option>
                            <Option value="CONFIRMED">Confirmed</Option>
                            <Option value="CHECKEDIN">Checked In</Option>
                            <Option value="CHECKEDOUT">Checked Out</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UpdateBooking
