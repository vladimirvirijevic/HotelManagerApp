import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { Link, Switch, Route, useRouteMatch, withRouter } from 'react-router-dom';
import Rooms from './Rooms';
import Clients from './Clients';
import Services from './Services';
import Departments from './Departments';
import Units from './Units';
import Articles from './Articles';

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
                    <Link onClick={() => setActiveRoute("services")} to={`${url}/services`}>
                        Services
                    </Link>
                </Menu.Item>
                <Menu.Item key="departments">
                    <Link onClick={() => setActiveRoute("departments")} to={`${url}/departments`}>
                        Departments
                    </Link>
                </Menu.Item>
                <Menu.Item key="articles">
                    <Link onClick={() => setActiveRoute("articles")} to={`${url}/articles`}>
                        Articles
                    </Link>
                </Menu.Item>
                <Menu.Item key="units">
                    <Link onClick={() => setActiveRoute("units")} to={`${url}/units`}>
                        Units
                    </Link>
                </Menu.Item>
            </Menu>
            <Switch>
                <Route path={`${path}/rooms`} component={Rooms}/>
                <Route path={`${path}/clients`} component={Clients}/>
                <Route path={`${path}/services`} component={Services}/>
                <Route path={`${path}/departments`} component={Departments}/>
                <Route path={`${path}/articles`} component={Articles}/>
                <Route path={`${path}/units`} component={Units}/>
            </Switch>
        </div>
    )
}

export default withRouter(Settings)
