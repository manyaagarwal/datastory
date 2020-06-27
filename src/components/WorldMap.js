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
    useEffect(() => {
        d3.csv("https://firebasestorage.googleapis.com/v0/b/datastory-a3e39.appspot.com/o/CTS12_Sexual_violence_Rate_per_100000.csv?alt=media&token=def22b68-541f-4933-91b3-ff773106de91")
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
                    console.log(data.geoData.features);
                    const svg = select(wrapperRef.current)
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g");
                    let minProp = d3.min(data.geoData.features, feature => feature.properties.stats[year]);
                    let maxProp = d3.max(data.geoData.features, feature => feature.properties.stats[year]);
                    console.log(minProp, maxProp)
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

    const styles = {
        container: {
            display: "grid",
            justifyItems: "center"
        }
    }

    return (
        <div ref={wrapperRef} style={styles.container}>
        </div>
    );
}

export default withRouter(WorldMap);