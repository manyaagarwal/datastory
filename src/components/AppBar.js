import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { signOut } from '../actions/user';

const { Header, Content, Footer } = Layout;

class AppBar extends React.Component {
    componentDidMount() {

    }
    render() {
        const { children } = this.props;
        const { user,admin } = this.props.user;
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={(admin) ? "/contributions" : "/contribute"}>{(user && admin) ? "Contributions" : "Contribute"}</Link></Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                        {user && (
                            <Button icon={<LogoutOutlined />} onClick={() => this.props.signOut()}>Logout</Button>
                        )}
                        {!user && <Link to="/login"><Button icon={<LoginOutlined />}>Login</Button></Link>}
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    signOut
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AppBar)
);
