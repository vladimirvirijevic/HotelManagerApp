import React, { useEffect } from "react";
import { Alert } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ServicesList from "../../components/Settings/Services/ServicesList";
import ServicesCreate from "../../components/Settings/Services/ServicesCreate";

const Services = props => {
    useEffect(() => {
        props.onGetServices();
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
                message="Service Added Successfully"
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
            <ServicesCreate addService={props.onAddService} success={props.success} />
            {alertMessage}
            <ServicesList deleteService={props.onDeleteService} services={props.services} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        services: state.services.services,
        error: state.services.error,
        success: state.services.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetServices: () => dispatch(actions.getServices()),
        onAddService: service => dispatch(actions.addService(service)),
        onClearMessage: () => dispatch(actions.clearServicesMessage()),
        onDeleteService: (service) => dispatch(actions.deleteService(service))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
