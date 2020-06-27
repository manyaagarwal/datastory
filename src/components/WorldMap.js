import React from "react";
import * as d3 from "d3";
import { withRouter } from "react-router-dom";

 const margin = 75;
const width = 1200 - margin;
const height = 600 - margin;
class WorldMap extends React.Component {
    componentDidMount() {
        const { data } = this.props; 
        const csvData = d3.csv("https://firebasestorage.googleapis.com/v0/b/datastory-a3e39.appspot.com/o/USA%2Ffvsv9410at03.csv?alt=media&token=080732d2-1259-4c75-97b0-9bb77a8957e9").then((data) => console.log(data));
        const svg = d3
            .select(this.refs.chart)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g"); const projection = d3
                .geoMercator()
                .scale(130)
                .translate([width / 2, height / 1.4]); const path = d3.geoPath().projection(projection); const map = svg
                    .selectAll("path")
                    .data(data.geoData.features)
                    .enter()
                    .append("path")
                    .on("click", feature => this.props.history.push('/country/'+ feature.id))
                    .attr("d", path)
                    .attr("class", "state")
                    .style("stroke", "black")
                    .style("stroke-width", 0.5);
                    
    } render() {
        const { data } = this.props;
         const styles = {
            container: {
                display: "grid",
                justifyItems: "center"
            }
        }; return (
            <div ref="chart" style={styles.container}>
                <p style={{ textAlign: "center" }}> Sexual Harassment Cases Reported WorldWide </p>
            </div>
        );
    }
}

export default withRouter(WorldMap);