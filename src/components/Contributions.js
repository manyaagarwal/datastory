import React from 'react';
import  { Table,Tag, Button } from "antd"; 

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

const data = []; 

class Contributions extends React.Component {
    render() {
        return (
            <Table columns={columns} dataSource={data} />
        )
    }
}

export default Contributions;