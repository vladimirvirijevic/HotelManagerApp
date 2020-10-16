import React, { useEffect } from 'react'
import { Button, Table } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";

const columns = [
    {
        title: "Id",
        dataIndex: "id"
    },
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Service",
        dataIndex: ['service', 'name']
    },
    {
        title: "Owner",
        dataIndex: ['owner', 'name']
    }
]; 

const Tickets = props => {
    useEffect(() => {
        props.onGetTickets();
    }, []);

    const addTicket = () => {
        props.history.push("/tickets/create");
    }

    const handleRowClick = (data) => {
        props.history.push(`/tickets/${data.id}`);
    }

    return (
        <div>
            <Button
                className="settings__add-button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={addTicket}
            >
                Add Ticket
            </Button>
            <Table
                className="tickets-table"
                pagination={{ pageSize: 6 }}
                columns={columns}
                dataSource={props.tickets}
                rowKey="id"
                onRow={(record) => {
                    return {
                      onClick: () => {
                          handleRowClick(record);
                      },
                    };
                }}
            />
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tickets: state.tickets.tickets
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTickets: () => dispatch(actions.getTickets())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
