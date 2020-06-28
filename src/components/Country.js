import React from 'react';
import { connect } from 'react-redux';
import { fetchCSV } from "../actions/user";
import { CasesSVG } from "./CasesSVG";
import { Row } from 'antd';
import MinoritySVG from './MinoritySVG';

class Country extends React.Component {
    componentDidMount() {
        if (this.props.match.params.id  === "USA") {
            this.props.fetchCSV("United States of America (the)", "minority");
            this.props.fetchCSV("United States of America (the)", "cases");
            this.props.fetchCSV("United States of America (the)", "rate");
        }
    }
    render() {
        const { id } = this.props.match.params;
        const { data } = this.props.user;
        return (
            <>
            <h1>{id}</h1>
            <Row>
            { !!data.minority ? <MinoritySVG url={data.minority} /> : null }
            </Row>
            <Row>
            { !!data.cases ? <CasesSVG url={data.cases}/> : null}
            </Row>
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


export default connect(mapStateToProps, mapDispatchToProps)(Country); 