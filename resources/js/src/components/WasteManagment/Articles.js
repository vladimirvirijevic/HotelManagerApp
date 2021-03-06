import React, { useState } from 'react'
import { Modal, Button, Form, DatePicker, Select, Table, InputNumber, Alert } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const Articles = props => {
    const columns = [
        {
            title: "Id",
            dataIndex: "id"
        },
        {
            title: "Department",
            dataIndex: ['department', 'name']
        },
        {
            title: "Article",
            dataIndex: ['article', 'name']
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Unit",
            dataIndex: ['unit', 'name']
        },
        {
            title: "Date",
            dataIndex: "date"
        },
        {
            title: 'Delete',
            key: 'key',
            dataIndex: 'key',
            width: 100,
            render: (text, record) => (
             <Button icon={<CloseOutlined />} type="danger" onClick={()=> props.deleteImportedArticle(record)}>
               {"Delete"}
             </Button>
            ),
        }
    ];

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = values => {
        values.type = props.type;
        props.addImportedArticle(values);
        setVisible(false);
    };

    const handleCloseAlert = () => {
        props.clearAlertMessage();
    }

    let alertMessage = null;

    if (props.success) {
        form.resetFields();
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message="Article Added Successfully"
                type="success"
            />
        );
    }

    let allArticles = [];

    if (props.type == "export" && props.importedArticles) {
        allArticles = props.importedArticles.filter(x => x.type == "export");
    }
    else if (props.type == "import" && props.importedArticles) {
        allArticles = props.importedArticles.filter(x => x.type == "import");
    }

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
            <a className="export-button" href="//127.0.0.1:8000/api/importedArticle/export" target="_blank"><i className="fas fa-table"></i> Export Excel</a>
            {alertMessage}
            <Table
                pagination={{ pageSize: 6 }}
                columns={columns}
                dataSource={allArticles}
                rowKey="id"
            />
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
                <Form form={form} onFinish={handleSubmit} layout="vertical">
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

export default Articles;

