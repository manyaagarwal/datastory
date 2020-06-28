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

const width = 460 - margin.left - margin.right;
const height = 200 - margin.top - margin.bottom;

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
                console.log(rawdata[2]);
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
                    "Not Reported": "red",
                    "Reported": "blue",
                }
                const textKeys = ["Not Reported", "Reported"]
                const stackGenerator = stack()
                    .keys(textKeys)
                    .order(stackOrderAscending);
                const layers = stackGenerator(data);

                console.log(layers);

                const extent = [
                    0,
                    100
                ];
                const xScale = scaleBand()
                    .domain(data.map(d => { console.log(d); return d.year }))
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

                var legend = svg.selectAll(".legend")
                    .data(colors)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; });

                legend.append("rect")
                    .attr("x", width - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    // .style("fill", function (d, i) { return colors.reverse()[i]; });

                legend.append("text")
                    .attr("x", width + 5)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "start")
                    .text(function (d, i) {
                        switch (i) {
                            case 0: return "Not Reported";
                            case 1: return "Reported";
                        }
                    });
                // const yAxis = axisLeft(yScale).ticks(10);
                // svg.append("g").attr("class","y-axis").call(yAxis).attr("transform", "translate(0," + 100 + ")");
            }
        )
    }, []);

    return (
        <React.Fragment>
            <Card style={{width:500, marginTop:50}}>
                <div ref={wrapperRef} style={{margin:"auto"}}>
                </div>
            </Card>
        </React.Fragment>
    );
}
