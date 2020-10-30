import React from 'react'
import { Card  } from "antd";

const OriginalTicketInfo = props => {
    let originalInfo = null;

    if (props.ticket) {
        originalInfo = (
            <Card title="Original Ticket">
                <div className="ticket-update__descriptions">
                    <h4 className="ticket-update__subtitle">Description</h4>
                    <p>{props.ticket.description}</p>
                    <h4 className="ticket-update__subtitle">Internal Description</h4>
                    <p>{props.ticket.internalUpdate}</p>
                </div>
            </Card>
        );
    }

    return (
        <div class="ticket-update">
            {originalInfo}
        </div>
    )
}

export default OriginalTicketInfo
