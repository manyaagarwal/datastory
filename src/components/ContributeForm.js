import React, { Component } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { countryList } from '../shared/countryList';
import { FirebaseDB, FirebaseStorage } from '../lib/firebase';

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
    FirebaseDB.collection('contributions').add({
        contributorId: "",
        country: values.country,
        source: values.source
    }).then((val) => {
        var file = values.data.file.originFileObj;
        FirebaseStorage.ref('/' + values.country + '/' + file.name).put(file, {
            customMetadata: {
                'contributorId': ""
            }
        });
    });
};

class ContributeForm extends Component {

    render() {
        const countries = countryList.map((country) => {
            return (
                <Select.Option value={country}>{country}</Select.Option>
            );
        });

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
                    <Select>
                        {countries}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['data']}
                    label="Upload Data"
                    rules={[
                        {
                            required: true
                        }
                    ]}>
                    <Upload accept=".json,.csv">
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