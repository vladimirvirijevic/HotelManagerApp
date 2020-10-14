import React, { useEffect } from 'react'
import { Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons";

const Tickets = props => {
    const addTicket = () => {
        props.history.push('/tickets/create');
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
        </div>
    )
}

export default Tickets
