import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { fetchCSV } from "../actions/user";
import { CasesSVG } from "./CasesSVG";
import { Row, Empty, Button, Progress } from 'antd';
import MinoritySVG from './MinoritySVG';
import HelpCentres from './HelpCentre';

class Country extends React.Component {
    componentDidMount() {
        if (this.props.match.params.id === "USA") {
            this.props.fetchCSV("United States of America (the)", "minority");
            this.props.fetchCSV("United States of America (the)", "cases");
            this.props.fetchCSV("United States of America (the)", "rate");
        } else {
            this.props.user.data = {};
        }
    }
    render() {
        const { id } = this.props.match.params;
        const { data } = this.props.user;
        return (
            <>
                <h1>{id}</h1>
                {
                    (id !== "USA") ?
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 60,
                            }}
                            description={
                                <span>
                                    No data exists for this Country
                                </span>
                            }
                        >
                            <Button type="primary" onClick={() => this.props.history.push("/contribute")}>Contribute Now</Button>
                        </Empty> :
                        <>
                            <Row>
                                {!!data.minority ? <MinoritySVG url={data.minority} /> : <Progress type="circle" percent={75} />}
                            </Row>

                            {!!data.cases ? <Row> <CasesSVG url={data.cases} /> <HelpCentres /> </Row> : <Progress type="circle" percent={50} />}
                        </>
                }

            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    fetchCSV
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Country)); 