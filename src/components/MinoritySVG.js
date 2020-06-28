import React, { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import { Row, Card, Select, Form, Col } from "antd";
import * as d3 from "d3";

const { Option } = Select;

class MinoritySVG extends React.Component {
    // const [genderData, setGenderData] = useState([]);
    // const [ageData, setAgeData] = useState([]);
    // const [ethnicityData, setEthnicityData] = useState([]);
    // const [yearRange, setYearRange] = useState("2005-2010");
    // const [ isLoading, setIsLoading ] = useState(true)
    constructor(props) {
        super(props);
        this.state = {
            ageData: [],
            incomeData: [],
            ethnicityData: [],
            yearRange: "2005-2010"
        }
    }

    componentDidMount() {
        d3.csv(this.props.url).then(
            data => {
                console.log(data);
                let _agedata = data.slice(2, 5);
                let _ethnicityData = data.slice(7, 11);
                let _incomeData = data.slice(19,22);
                let aData = []
                let eData = []
                let iData = []
                const colors = {
                    "12-17": "#E38627",
                    "18-34": "#C13C37",
                    "35-64": "#6A2135",
                    "Whitea": "#003f5c",
                    "Blacka" : "#11c3c3",
                    "Hispanic/Latin/a": "#00a0b0",
                    "American Indian/Alaska Native/a": "#007e98",
                    "Asian/Pacific Islander/a": "#005e7b",
                    "Less than $25,000": "#533d79",
                    "$25,000-$49,999": "#3c294e",
                    "$50,000 or more": "#6753a9",
                }
                _agedata.map(data => {
                    aData.push({
                        title: data["Victim  Characteristic"],
                        value: parseInt(data[this.state.yearRange]),
                        color: colors[data["Victim  Characteristic"]]
                    })
                    this.setState({ ageData: [...aData] })
                });
                _ethnicityData.map(data => {
                    eData.push({
                        title: data["Victim  Characteristic"],
                        value: parseInt(data[this.state.yearRange]),
                        color: colors[data["Victim  Characteristic"]]
                    })
                    this.setState({ ethnicityData: [...eData] });
                })
                _incomeData.map(data=> { 
                    iData.push({ 
                        title: data["Victim  Characteristic"],
                        value: parseInt(data[this.state.yearRange]),
                        color: colors[data["Victim  Characteristic"]]
                    })
                    this.setState({incomeData: [...iData]});
                })
                console.log(this.state.ethnicityData);
            }
        )
    }
    render() {
        const { ageData, incomeData, ethnicityData, yearRange } = this.state;
        return (
            <Card style={{ height: 600 }}>
                <Form.Item
                    name="year"
                    label="Year Range">
                    <Select defaultValue={yearRange} onChange={(value) => this.setState({ yearRange: value })}>
                        <Option value="1994-1998">1994-1998</Option>
                        <Option value="1999-2004">1999-2004</Option>
                        <Option value="2005-2010">2005-2010</Option>
                    </Select>
                </Form.Item>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <h2>Reported Cases by Yearly Income</h2>
                        <PieChart style={{ width: "75%" }} data={incomeData}  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`} />
                    </Col>
                    <Col span={8}>
                        <h2>Reported Cases by Age</h2>
                        <PieChart style={{ width: "70%", fontSize: "14px" }} data={ageData} label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`} />
                    </Col>
                    <Col span={8}>
                        <h2>Reported Cases by Ethnicity</h2>
                        <PieChart style={{ width: "70%" }} data={ethnicityData} label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}/>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default MinoritySVG;