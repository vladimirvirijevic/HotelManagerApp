import React, { useEffect } from 'react'
import ChangeName from '../../components/Profile/ChangeName'
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const Profile = props => {
    useEffect(() => {
        props.onGetUser();  
    }, []);

    return (
        <div>
            <ChangeName 
                user={props.user}
                changeName={props.onChangeName}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.profile.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUser: () => dispatch(actions.getProfileInfo()),
        onChangeName: user => dispatch(actions.changeName(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
