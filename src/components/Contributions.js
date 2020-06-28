import React from 'react';
import { Table,Tag, Button } from "antd"; 
import { FirebaseDB } from '../lib/firebase';
import update from 'immutability-helper';

const columns = [
    {
        title: "Contributor Id",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: text => <Tag>{text}</Tag>
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type"
    },
    {
        title: "Source",
        dataIndex: "source",
        key: "source",
        render: url => <a href={url}>{url}</a>
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: status => (
            <Button ghost type="primary">{status}</Button>
        )
    }

]; 

class Contributions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.getData = this.getData.bind(this);
    }

    getData() {
        FirebaseDB.collection('contributions').where("status", "==", "Pending").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let val = doc.data();
                var newData = {
                    id: val.contributorId, 
                    country: val.country,
                    type: val.type,
                    source: val.source,
                    status: val.status
                };
                var updatedData = update(this.state.data, {$push: [newData]});
                this.setState({ data: updatedData });
                console.log(this.state.data);
            });
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <Table columns={columns} rowKey={record => record.id} dataSource={this.state.data} />
        )
    }
}

export default Contributions;