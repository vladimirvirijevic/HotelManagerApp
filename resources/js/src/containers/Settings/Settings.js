import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { Link, Switch, Route, useRouteMatch, withRouter } from 'react-router-dom';
import Rooms from './Rooms';
import Clients from './Clients';

const Settings = props => {
    let { path, url } = useRouteMatch();

    useEffect(() => {
        props.history.push('/settings/rooms');
        console.log(props.location.pathname);
    }, []);

    const [activeRoute, setActiveRoute] = useState("rooms");

    console.log(`${path}, ${url}`);
    return (
        <div>
            <Menu selectedKeys={[activeRoute]} className="menu" mode="horizontal">
                <Menu.Item key="rooms">
                    <Link onClick={() => setActiveRoute("rooms")} to={`${url}/rooms`}>
                        Rooms
                    </Link>
                </Menu.Item>
                <Menu.Item key="clients">
                    <Link onClick={() => setActiveRoute("clients")} to={`${url}/clients`}>
                        Clients
                    </Link>
                </Menu.Item>
                <Menu.Item key="services">
                    Services
                </Menu.Item>
            </Menu>
            <Switch>
                <Route path={`${path}/rooms`} component={Rooms}/>
                <Route path={`${path}/clients`} component={Clients}/>
            </Switch>
        </div>
    )
}

export default withRouter(Settings)
