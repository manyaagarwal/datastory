import React from "react";
import * as d3 from "d3";
import { withRouter } from "react-router-dom";

 const margin = 75;
const width = 1200 - margin;
const height = 600 - margin;
class WorldMap extends React.Component {
    componentDidMount() {
        const { data } = this.props; 
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
                    .style("fill", "rgb(9, 157, 217)")
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
                <p style={{ textAlign: "center" }}> Sexual Harassment Cases Reported WorldWide
           </p>
            </div>
        );
    }
}

export default withRouter(WorldMap);