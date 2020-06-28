import React from 'react';
import { Table,Tag, Button } from "antd"; 
import { FirebaseDB } from '../lib/firebase';

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
        title: "Sources",
        dataIndex: "sources",
        key: "sources",
        render: sources => (
            <>
                {sources.map(source => <a href={source}>{source}</a>)}
            </>
        )
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: status => <Button>{status}</Button>
    }

]; 

function getData() {
    let data = [];
    FirebaseDB.collection('contributions').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let val = doc.data();
            data.push({
                id: val.contributoriId, 
                country: val.country,
                type: val.type,
                sources: val.sources,
                status: val.status
            });
        });
        return data;
    });
}



class Contributions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        var fetched = getData();
        this.setState({ data: fetched }); 
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.data} />
        )
    }
}

export default Contributions;