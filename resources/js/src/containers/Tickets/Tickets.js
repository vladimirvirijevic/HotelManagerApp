import React, { useEffect } from 'react'
import { Button, Table } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner';

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

    let tickets = <Spinner />

    if (!props.loading) {
        tickets = (
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
                }}/>
        );
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

            {tickets}            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tickets: state.tickets.tickets,
        loading: state.tickets.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTickets: () => dispatch(actions.getTickets()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
