import React, { useState } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const Rooms = props => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = values => {
        props.onAddRoom(values);
    };

    // const handleCancel = () => {
    //     setModalVisible(false);
    // };

    return (
        <div>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setVisible(true)}
            >
                Add Room
            </Button>
            <Modal
                title="Add Room"
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                <Form onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Room Name"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter room name!"
                            },
                            {
                                max: 100,
                                message: "Maximum of 100 characters."
                            }
                        ]}
                    >
                        <Input placeholder="Enter Room Name" />
                    </Form.Item>

                    <Form.Item
                        label="Capacity"
                        name="capacity"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter room capacity!"
                            }
                        ]}
                    >
                        <InputNumber
                            className="input-number"
                            min={1}
                            max={30}
                            initialValue={1}
                            placeholder="Enter Capacity"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price Per Day"
                        name="price"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter room price!"
                            }
                        ]}
                    >
                        <InputNumber
                            className="input-number"
                            min={1}
                            max={100000}
                            initialValue={1}
                            placeholder="Enter Price"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.settings.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddRoom: room => dispatch(actions.addRoom(room))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
