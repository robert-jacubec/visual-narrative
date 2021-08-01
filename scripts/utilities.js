export function ApplyColorToAxis(axis, color){
    axis.selectAll("line").style("stroke", color)
    axis.selectAll("path").style("stroke", color)
}


export function AddLegend(svg, width, height, legend_keys, colors) {
    var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
        .enter().append("g")
        .attr("class", "lineLegend")
        .attr("transform", function (d, i) {
            return "translate(" + width + "," + (i * 20 + height)  + ")";
        });

    lineLegend.append("text").text(function (d) { return d; })
        .attr("transform", "translate(15,9)"); //align texts with boxes

    lineLegend.append("rect")
        .attr("fill", function (d, i) { return colors[i]; })
        .attr("width", 10).attr("height", 10);
}