import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { withRouter } from "react-router-dom";
import { select } from "d3";
import useResizeObserver from "./useResizeObserver";

const margin = 75;
const width = 1200 - margin;
const height = 600 - margin;
const WorldMap = ({ data, history,year }) => {
    const wrapperRef = useRef();
    const svgRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [statData, setStatData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        d3.csv("https://firebasestorage.googleapis.com/v0/b/datastory-a3e39.appspot.com/o/CTS12_Sexual_violence_Rate_per_100000(1).csv?alt=media&token=9b18ce0b-40b7-45fc-85e2-db9ea61b9563")
            .then(
                statData => {
                    setStatData(statData)
                    console.log(statData);
                    data.geoData.features.map(
                        feature => {
                            const stats = statData.filter(obj => obj["Country/territory"] === feature.properties.name);
                            if (stats.length !== 0) {
                                feature.properties["stats"] = stats[0];
                            } else {
                                feature.properties["stats"] = {
                                    "2003":"0",
                                    "2004":"0",
                                    "2005":"0",
                                    "2006":"0",
                                    "2007":"0",
                                    "2008":"0",
                                    "2009":"0",
                                    "2010": "0"
                                }
                            }
                        }
                    )
                    setLoaded(true); 
                    const svg = select(wrapperRef.current)
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g");
                    let minProp = d3.min(data.geoData.features, feature => (feature.properties.stats[year] !== "") ? feature.properties.stats[year] : 0);
                    let maxProp = d3.max(data.geoData.features, feature => feature.properties.stats[year]);
                    let colorScale = d3.scaleLinear().domain([minProp, maxProp]).range(['#e7e1ef', "#dd1c77"]);
                    const projection = d3.geoMercator().scale(130).translate([width / 2, height / 1.4]);
                    const path = d3.geoPath().projection(projection);

                    svg
                        .selectAll("path")
                        .data(data.geoData.features)
                        .enter()
                        .append("path")
                        .on("click", feature => history.push('/country/' + feature.properties.name))
                        .attr("fill", feature => colorScale(feature.properties.stats["2010"]))
                        .attr("class", "state")
                        .attr("d", path)
                        .style("stroke", "black")
                        .style("stroke-width", 0.5);
                }
            )

    }, [data])

    useEffect(() => {
        if(loaded){ 
            let minProp = d3.min(data.geoData.features, feature => (feature.properties.stats[year] !== "") ? feature.properties.stats[year] : 0);
            let maxProp = d3.max(data.geoData.features, feature => feature.properties.stats[year]);
            console.log(minProp,maxProp);
            let colorScale = d3.scaleLinear().domain([minProp, maxProp]).range(['#e7e1ef', "#dd1c77"]);
        }
    })

    const styles = {
        container: {
            display: "grid",
            justifyItems: "center"
        }
    }

    return (
        <div ref={wrapperRef} style={styles.container}>
            <p>Rate of Reported Cases of Sexual Harassment Worldwide</p>
        </div>
    );
}

export default withRouter(WorldMap);