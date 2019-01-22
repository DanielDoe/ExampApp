import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import { Switch, Route } from 'react-router-dom';
import './dashboard.css';
import { HeaderComponent } from './header';
import DashboardRoutes from './dashboardRoutes';
import Logo from './logo.svg';
import Sidemenu from './Sidemenu';
import ErrorComponent from '../Error';

const { Sider, Content, Header } = Layout;


let header;

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            path: this.props.history.location.pathname,
            siderCollapsed: false,
            title: 'Home'
        };

        this.toggle = this.toggle.bind(this);
        this.pathChanged = this.pathChanged.bind(this);
        this.renderBody = this.renderBody.bind(this);
    }

    componentWillMount() {
        this.props.history.listen(location => this.setState({ path: location.pathname }));
    }

    toggle() {
        this.setState({ siderCollapsed: !this.state.siderCollapsed });
    }

    pathChanged(path: string = '/') {
        if (path !== this.state.path) {
            this.props.history.push(path);
        }
    }

    renderHeader(headertext:?string) {
    }

    renderBody() {
        const routes = DashboardRoutes.map((route: Object, index: number) => {
            const key: string = `route-key-${index}`;
            const Rendered = route.component;
            const render = () => (
                <Content className="body">
                    <HeaderComponent headerTitle={route.title} onIconSelect={() => this.toggle()} />
                    <Rendered title={route.title} />
                </Content>
            );
            
            return (
                <Route
                    selectedPath={this.state.path}
                    path={route.path}
                    render={render}
                    exact={route.exact}
                    key={key} />
            );
        });

        routes.push(<Route key="error-component" component={ErrorComponent} />);

        return routes;
    }

    render() {
        return (
            <Layout id="dashboard">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.siderCollapsed}>

                    <div className="logo">
                        <img src={Logo} alt="ExamApp Logo" />
                    </div>

                    <Sidemenu
                        selectedPath={this.state.path}
                        onPathChanged={this.pathChanged} />

                    <div className="trigger">
                        <button onClick={this.toggle}>
                            <Icon
                                className="trigger-icon"
                                type={this.state.siderCollapsed ? 'menu-unfold' : 'menu-fold'} />
                        </button>
                    </div>
                </Sider>

                <Layout>
                    <div className="layoutBody">
                            <Switch>
                                {this.renderBody()}
                            </Switch>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

Dashboard.propTypes = {
    history: PropTypes.shape({
        listen: PropTypes.func,
        location: PropTypes.shape(),
        push: PropTypes.func
    }).isRequired
};
