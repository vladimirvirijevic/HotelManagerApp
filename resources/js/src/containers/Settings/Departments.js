import React, { useState, useEffect } from "react";
import { Alert } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import DepartmentsList from "../../components/Settings/Departments/DepartmentsList";
import DepartmentsCreate from "../../components/Settings/Departments/DepartmentsCreate";

const Departments = props => {
    useEffect(() => {
        props.onGetDepartments();
    }, []);

    const handleCloseAlert = () => {
        props.onClearMessage();
    }

    let alertMessage = null;

    if (props.success) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message="Department Added Successfully"
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
            <DepartmentsCreate success={props.success} addDepartment={props.onAddDepartment} />
            {alertMessage}
            <DepartmentsList deleteDepartment={props.onDeleteDepartment} departments={props.departments} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        departments: state.departments.departments,
        error: state.departments.error,
        success: state.departments.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDepartments: () => dispatch(actions.getDepartments()),
        onAddDepartment: department => dispatch(actions.addDepartment(department)),
        onClearMessage: () => dispatch(actions.clearDepartmentsMessage()),
        onDeleteDepartment: (department) => dispatch(actions.deleteDepartment(department))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
