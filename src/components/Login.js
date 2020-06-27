import React from 'react';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { signIn } from '../actions/user';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    componentDidUpdate(prevProps){ 
        if(prevProps.user !== this.props.user)
        { 
            console.log(this.props.user);
            if(this.props.user.error !== null)
            { 
                message.error(this.props.user.error);
            } 
            if(this.props.user.user !== null)
            { 
                this.props.history.push('/');
            } 
        }
    }
    render() {
        const onFinish = values => {
            console.log('Received values of form: ', values);
            this.props.signIn(values.username,values.password);
        };

        return (
            <div className="loginContainer">
                <img src="https://firebasestorage.googleapis.com/v0/b/datastory-a3e39.appspot.com/o/logo.png?alt=media&token=9b68ff2a-6028-42d8-b765-c286005ad369"
                    width="400" />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
        </Button>
        Or <Link to="/signup">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { signIn })(LoginForm);