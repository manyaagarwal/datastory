import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
    select,
    scaleBand,
    axisBottom,
    stack,
    max,
    scaleLinear,
    axisLeft,
    stackOrderAscending
} from "d3";
import { Card } from "antd";


const margin = { top: 20, right: 160, bottom: 35, left: 30 };

const width = 560 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

export const CasesSVG = ({ url }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
        d3.csv(url).then(
            rawdata => {
                let svg = d3.select(wrapperRef.current)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "chart")

                let keys1 = Object.keys(rawdata[1]);
                let keys2 = Object.keys(rawdata[2]);
                delete rawdata[1][keys1[0]];
                delete rawdata[2][keys2[0]];
                let keys = keys1.slice(1);
                let data = [];
                keys.map(key => {
                    data.push({
                        "year": key,
                        "Reported": rawdata[2][key],
                        "Not Reported": rawdata[1][key],
                    })
                });
                const colors = {
                    "Not Reported": "#f03b20",
                    "Reported": "#feb24c",
                }
                const textKeys = ["Not Reported", "Reported"]
                const stackGenerator = stack()
                    .keys(textKeys)
                    .order(stackOrderAscending);
                const layers = stackGenerator(data);

                const extent = [
                    0,
                    100
                ];
                const xScale = scaleBand()
                    .domain(data.map(d => d.year ))
                    .range([0, 300])

                const yScale = scaleLinear()
                    .domain([0, 100])
                    .range([height, 0]);

                svg
                    .selectAll(".layer")
                    .data(layers)
                    .join("g")
                    .attr("class", "layer")
                    .attr("fill", layer => colors[layer.key])
                    .selectAll("rect")
                    .data(layer => layer)
                    .join("rect")
                    .attr("x", sequence => xScale(sequence.data.year))
                    .attr("width", 30)
                    // .attr("y", sequence => yScale(sequence[1]))
                    .attr("height", layer => layer[1]);

                var xAxis = axisBottom(xScale)
                    .ticks(3);

                svg.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", "translate(0," + 100 + ")")
                    .call(xAxis);

                svg.append("circle").attr("cx", 50).attr("cy", 150).attr("r", 6).style("fill", "#f03b20")
                svg.append("circle").attr("cx", 50).attr("cy", 170).attr("r", 6).style("fill", "#feb24c")
                svg.append("text").attr("x", 70).attr("y", 155).text("Rate of Cases Not Reported").style("font-size", "15px").attr("alignment-baseline", "middle")
                svg.append("text").attr("x", 70).attr("y", 175).text("Rate of Cases Reported").style("font-size", "15px").attr("alignment-baseline", "middle")
                // const yAxis = axisLeft(yScale).ticks(10);
                // svg.append("g").attr("class","y-axis").call(yAxis).attr("transform", "translate(0," + 100 + ")");
            }
        )
    }, []);

    return (
        <React.Fragment>
            <Card style={{ width: 500, marginTop: 50 }}>
                <div ref={wrapperRef} style={{ margin: "auto" }}>
                </div>
            </Card>
        </React.Fragment>
    );
}
