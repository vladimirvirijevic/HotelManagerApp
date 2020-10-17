import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Alert } from "antd";
import * as actions from "../../store/actions/index";
import ClientsList from "../../components/Settings/Clients/ClientsList";
import ClientsCreate from "../../components/Settings/Clients/ClientsCreate";

const Clients = props => {
    useEffect(() => {
        props.onGetClients();
    }, []);

    let alertMessage = null;

    const handleCloseAlert = () => {
        props.onClearMessage();
    }

    if (props.success) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message="Client Added Successfully"
                type="success"
            />
        );
    }
    else if (props.error) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message={props.error}
                type="error"
            />
        );
    }

    return (
        <div>
            <ClientsCreate addClient={props.onAddClient} success={props.success} />
            {alertMessage}
            <ClientsList clients={props.clients} />            
        </div>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
        error: state.clients.error,
        success: state.clients.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetClients: () => dispatch(actions.getClients()),
        onAddClient: client => dispatch(actions.addClient(client)),
        onClearMessage: () => dispatch(actions.clearClientsMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
