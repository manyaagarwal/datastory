import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { signUp } from '../actions/user';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const SignUp = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        props.signUp(values.email, values.password, values.website, values.nickname);
        props.history.push("/");
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = value => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));
    return (
        <div className="loginContainer">
            <img src="https://firebasestorage.googleapis.com/v0/b/datastory-a3e39.appspot.com/o/logo.png?alt=media&token=9b68ff2a-6028-42d8-b765-c286005ad369"
                width="400" />
            <Form
                {...formItemLayout}
                className="login-form"
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="nickname"
                    label={
                        <span>
                            Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                 >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="website"
                    label="Website"
                >
                    <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                        <Input />
                    </AutoComplete>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                        </Button>
                        Or <Link to="/login">Sign In!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
  });
  
  const mapDispatchToProps = {
    signUp
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp);