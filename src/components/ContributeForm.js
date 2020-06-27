import React, { Component } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    }
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        url: '${label} is not a valid ${type}'
    }
};

const submitForm = (values) => {
    console.log(values);
};

class ContributeForm extends Component {

    render() {
        return (
            <Form {...layout} name="nest-messages" onFinish={submitForm} validateMessages={validateMessages}>
                <Form.Item
                    name={['country']}
                    label="Country"
                    rules={[
                        {
                            required: true,
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['data']}
                    label="Upload Data"
                    rules={[
                        {
                            required: true
                        }
                    ]}>
                    <Upload name="data" action="/upload.do">
                        <Button>
                            <UploadOutlined /> Click to upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name={['source']}
                    label="Source"
                    rules={[
                        {
                            required: true,
                            type: 'url'
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default ContributeForm;