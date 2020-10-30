import React from 'react'
import { Card, Table  } from "antd";

const columns = [
    {
        title: "Person",
        dataIndex: ["user", "name"]
    },
    {
        title: "Start Time",
        dataIndex: "startTime"
    },
    {
        title: "End Time",
        dataIndex: "endTime"
    },
    {
        title: "Duration",
        dataIndex: "duration"
    }
];

const UpdateTicketInfo = props => {
    return (
        <div class="ticket-update">
            <Card title={`Update Id: #${props.update.id} - ${props.update.name}`}>
                <div className="ticket-update__info">
                    <div className="ticket-update__info-item">
                        <h4 className="ticket-update__subtitle">Date</h4>
                        <p>{props.update.created_at.substring(0, 10).split('-').reverse().join('. ') + '.'}</p>
                    </div>
                    <div className="ticket-update__info-item">
                        <h4 className="ticket-update__subtitle">Person</h4>
                        <p>{props.update.user.name}</p>
                    </div>
                </div>
                <div className="time-entries">
                    <h4 className="ticket-update__subtitle">Time Entries</h4>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={props.update.timeEntries}
                        rowKey="name"
                    />
                </div>
                <div className="ticket-update__descriptions">
                    <h4 className="ticket-update__subtitle">Description</h4>
                    <p>{props.update.description}</p>
                    <h4 className="ticket-update__subtitle">Internal Description</h4>
                    <p>{props.update.internalUpdate}</p>
                </div>
                
            </Card>
        </div>
    )
}

export default UpdateTicketInfo
