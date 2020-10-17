import React, { useEffect } from "react";
import { Alert } from "antd";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import UnitsList from "../../components/Settings/Units/UnitsList";
import UnitsCreate from "../../components/Settings/Units/UnitsCreate";

const Units = props => {
    useEffect(() => {
        props.onGetUnits();
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
                message="Unit Added Successfully"
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
            <UnitsCreate addUnit={props.onAddUnit} success={props.success} />
            {alertMessage}
            <UnitsList units={props.units} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        units: state.articles.units,
        error: state.articles.errorUnits,
        success: state.articles.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUnits: () => dispatch(actions.getUnits()),
        onAddUnit: unit => dispatch(actions.addUnit(unit)),
        onClearMessage: () => dispatch(actions.clearUnitsMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Units);
