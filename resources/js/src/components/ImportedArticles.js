import React, { useState } from 'react'
import { Modal, Button, Form, DatePicker, Select, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const ImportedArticles = props => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = values => {
        props.addImportedArticle(values);
    };

    return (
        <div>
            <Button
                className="settings__add-button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setVisible(true)}
            >
                Add
            </Button>

            <Modal
                title="Add Article"
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
                <Form onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Date"
                        name="date"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter date!"
                            }
                        ]}
                    >
                        <DatePicker className="date-picker" />
                    </Form.Item>

                    <Form.Item
                        name="department"
                        label="Department"
                        rules={[
                            {
                                required: true,
                                message: "Please choose department!"
                            }
                        ]}
                    >
                        <Select placeholder="Select a department" allowClear>
                            {props.departments.map(department => {
                                return (
                                    <Option key={department.id} value={department.id}>
                                        {department.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="article"
                        label="Article"
                        rules={[
                            {
                                required: true,
                                message: "Please choose article!"
                            }
                        ]}
                    >
                        <Select placeholder="Select a article" allowClear>
                            {props.articles.map(article => {
                                return (
                                    <Option key={article.id} value={article.id}>
                                        {article.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please enter article amount!"
                            }
                        ]}
                    >
                        <InputNumber
                            className="input-number"
                            min={1}
                            max={100000}
                            initialValue={1}
                            placeholder="Enter Amount"
                        />
                    </Form.Item>

                    <Form.Item
                        name="unit"
                        label="Unit"
                        rules={[
                            {
                                required: true,
                                message: "Please choose unit!"
                            }
                        ]}
                    >
                        <Select placeholder="Select a unit" allowClear>
                            {props.units.map(unit => {
                                return (
                                    <Option key={unit.id} value={unit.id}>
                                        {unit.name}
                                    </Option>
                                );
                            })}
                        </Select>
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

export default ImportedArticles;

