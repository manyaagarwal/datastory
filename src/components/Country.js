import React from 'react';
import { Table } from 'antd';
import { FirebaseDB } from '../lib/firebase';

const columns = [
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year'
    },
    {
        title: 'Average Annual Count',
        dataIndex: 'avgCount',
        key: 'avgCount'
    }
];

function getData(countryId) {
    let data = [];
    FirebaseDB.collection(countryId.toString()).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data.push({
                key: doc.data().id, 
                year: doc.data().year,
                avgCount: doc.data().avgCount
            });
        });
        return data;
    });
};

class Country extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const fetched = getData(id);
        this.setState({ data: fetched });
        console.log(this.state.data); 
    }

    render() {
        const {id} = this.props.match.params;

        return (
            <div className="container">
                <h3>{id}</h3>
                <Table columns={columns} dataSource={this.state.data} />
            </div> 
        );
    }
}

export default Country;