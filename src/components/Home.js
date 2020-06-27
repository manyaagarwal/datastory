import React from 'react';
import WorldMap from "./WorldMap";
import { Form, Select } from "antd"; 

const { Option } = Select; 

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                geoData: null,
                cupData: null, 
                year: "2010",
            }
        }
    }
    componentDidMount() {
        Promise.all([fetch("https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"),
        fetch("https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_cup_geo.json")])
            .then(responses => Promise.all(responses.map(resp => resp.json())))
            .then(([geoData, cupData]) => {
                this.setState({
                    data: {
                        geoData: geoData,
                        cupData: cupData
                    }
                });
            }).catch(error => console.log(error));
        this.setState({year:"2010"})
    }

    render() {
        const { data,year } = this.state;
        return <div>
             <Form.Item
                    name="year"
                    label="Year">
                    <Select defaultValue="2010" onChange={(value)=>this.setState({year:value})}>
                        <Option value="2003">2003</Option>
                        <Option value="2004">2004</Option>
                        <Option value="2005">2005</Option>
                        <Option value="2006">2006</Option>
                        <Option value="2007">2007</Option>
                        <Option value="2008">2008</Option>
                        <Option value="2009">2009</Option>
                        <Option value="2010">2010</Option>
                    </Select>
                </Form.Item>
            {data.geoData && <WorldMap data={data} year={year} />}
        </div>;
    }
}

export default Home; 