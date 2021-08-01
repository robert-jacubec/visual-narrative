import { ApplyColorToAxis, AddLegend } from './utilities.js'

var housePriceScale;
var houseYearScale;
var houseSizeScale;

var focus;
var focusText;

export async function RenderGraphs() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 75, bottom: 30, left: 75 },
        width = 800 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;


    var svg = d3.select(".graph-goes-here")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var houseSizeData = await d3.csv("/visual-narrative/stats/year_to_house_size.csv", d => {
        // console.log(new Date(d.year), d.size)
        return { year: new Date(d.year), size: d.size }
    })

    var housePriceData = await d3.csv('/visual-narrative/stats/MSPUS.csv', d => {
        return { year: new Date(d.date), price: d.price }
    });

    var yearExtent = d3.extent(houseSizeData, d => +d.year)

    var filteredHousePrices = housePriceData.filter(d => {
        return d.year < yearExtent[1]
    });

    houseSizeScale = d3.scaleLinear().domain(d3.extent(houseSizeData, d => +d.size)).range([height, 0]);
    houseYearScale = d3.scaleTime().domain(yearExtent).range([0, width]);
    housePriceScale = d3.scaleLinear().domain(d3.extent(filteredHousePrices, d => +d.price)).range([height, 0]);

    var housePriceMoveOver = (e) => {
        var bisect = d3.bisector(d => d.year).left
        var x0 = houseYearScale.invert(d3.pointer(e)[0]);
        var i = bisect(filteredHousePrices, x0, 1);

        const selectedData = filteredHousePrices[i]
        focus
            .attr("cx", houseYearScale(selectedData.year))
            .attr("cy", housePriceScale(selectedData.price))

        if (i < 36) {
            focusText
                .attr("y", housePriceScale(selectedData.price) + 10)
                .attr("x", houseYearScale(selectedData.year))
        }
        else if (i > 100 && i < 180) {
            focusText.attr("x", houseYearScale(selectedData.year) - 10)
                .attr("y", housePriceScale(selectedData.price) + 50)
        }
        else if (i > 180) {
            focusText.attr("x", houseYearScale(selectedData.year) - 100)
                .attr("y", housePriceScale(selectedData.price) + 100)
        }
        else {
            focusText.attr("x", houseYearScale(selectedData.year) + 15)
                .attr("y", housePriceScale(selectedData.price) + 50)
        }

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        focusText
            .html("Price: " + formatter.format(selectedData.price))
    }

    var houseSizeMoveOver = e => {
        var bisect = d3.bisector(d => d.year).left
        var x0 = houseYearScale.invert(d3.pointer(e)[0]);
        var i = bisect(houseSizeData, x0, 1);

        const selectedData = houseSizeData[i]
        focus
            .attr("cx", houseYearScale(selectedData.year))
            .attr("cy", houseSizeScale(selectedData.size))

        if (i > 42) {
            focusText
                .attr("x", houseYearScale(selectedData.year) - 130)
                .attr("y", houseSizeScale(selectedData.size))
        }
        else {
            focusText
                .attr("x", houseYearScale(selectedData.year))
                .attr("y", houseSizeScale(selectedData.size) - 30)
        }

        focusText.html("Size: " + parseInt(selectedData.size).toLocaleString() + " sq. feet")
    }

    svg.append("path")
        .datum(houseSizeData)
        .attr("fill", "none")
        .attr("stroke", "Red")
        .attr("stroke-width", 3.0)
        .attr("class", "house-size-path")
        .attr("d", d3.line()
            // .curve(d3.curveBasis)
            .x(function (d) { return houseYearScale(d.year) })
            .y(function (d) { return houseSizeScale(d.size) })
        ).on("click", e => {
            AddMouseOver(svg, width, height, houseSizeMoveOver)

            d3.select(".house-size-path").attr("stroke-width", 5.0)
                .on("mouseout", e => { })

            d3.select(".house-price-path").attr("stroke-width", 3.0)
        })
        .on("mouseover", e => {
            d3.select(".house-size-path").attr("stroke-width", 5.0)
                .on("mouseout", e => { d3.select(".house-size-path").attr("stroke-width", 3.0) })
        })
        .on("mouseout", e => {
            d3.select(".house-size-path").attr("stroke-width", 3.0)
        })

    svg.append("path")
        .datum(filteredHousePrices)
        .attr("fill", "none")
        .attr("class", "house-price-path")
        .attr("stroke", "Green")
        .attr("stroke-width", 3.0)
        .attr("d", d3.line()
            // .curve(d3.curveBasis)
            .x(function (d) { return houseYearScale(d.year) })
            .y(function (d) { return housePriceScale(d.price) })
        ).on("click", e => {
            AddMouseOver(svg, width, height, housePriceMoveOver)

            d3.select(".house-size-path").attr("stroke-width", 3.0)
            d3.select(".house-price-path").attr("stroke-width", 5.0)
                .on("mouseout", e => { })
        })
        .on("mouseover", e => {
            d3.select(".house-price-path").attr("stroke-width", 5.0)
                .on("mouseout", e => { d3.select(".house-price-path").attr("stroke-width", 3.0) })
        })
        .on("mouseout", e => {
            d3.select(".house-price-path").attr("stroke-width", 3.0)
        })


    var yearAxis = svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(houseYearScale))
    var feetAxis = svg.append("g").attr("transform", "translate(" + width + ",0)").call(d3.axisRight(houseSizeScale).tickFormat(d => d + " sq. feet"))
    var priceAxis = svg.append("g").call(d3.axisLeft(housePriceScale).tickFormat(d3.format("$,")))

    ApplyColorToAxis(priceAxis, "green")
    ApplyColorToAxis(feetAxis, "red")

    AddAnnotations(svg, houseSizeScale, houseYearScale)
    AddLegend(svg, 325, 550, ["Average Square Foot of U.S. Home", "Average House Price of U.S. Home (USD)"], ["red", "green"])
}

function AddAnnotations(svg) {
    const type = d3.annotationCalloutCircle

    const annotations = [{
        note: {
            label: "The effects of the 2008 Great Recession",
            title: "Recession"
        },
        //can use x, y directly instead of data
        // data: { date: "18-Sep-09", close: 185.02 },
        className: "show-bg",
        subject: { radius: 30, radiusPadding: 1 },
        dy: -2,
        dx: -100,
        x: 590,
        y: 145
    },
    {
        note: {
            label: "The 1979 Energy Crisis",
            title: "Recession"
        },
        subject: { radius: 40, radiusPadding: 1 },
        dy: -80,
        dx: -10,
        x: 220,
        y: 530
    },
    {
        note: {
            label: "The Early 1990's Recession",
            title: "Recession"
        },
        subject: { radius: 50, radiusPadding: 1 },
        dy: -80,
        dx: -10,
        x: 360,
        y: 364
    }]

    const parseTime = d3.timeParse("%d-%b-%y")
    const timeFormat = d3.timeFormat("%d-%b-%y")

    const makeAnnotations = d3.annotation()
        // .editMode(true)
        // //also can set and override in the note.padding property
        // //of the annotation object
        // .notePadding(15)
        .type(type)
        // //accessors & accessorsInverse not needed
        //if using x, y in annotations JSON
        // .accessors({
        //     x: d => xScale(parseTime(d.date)),
        //     y: d => yScale(d.close)
        // })
        // .accessorsInverse({
        //     date: d => timeFormat(xScale.invert(d.x)),
        //     close: d => yScale.invert(d.y)
        // })
        .annotations(annotations)

    svg
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)
}

export function AddMouseOver(svg, width, height, moveOverFunc) {

    // Create the circle that travels along the curve of chart
    if (d3.select(".focus").size() == 0) {
        focus = svg
            .append('g')
            .append('circle')
            .style("fill", "black")
            .attr("stroke", "black")
            .attr('r', 3.5)
            .attr("class", "focus")
            .style("opacity", 0)
    }

    // Create the text that travels along the curve of chart
    if (d3.select(".focus-text").size() == 0) {
        focusText = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr("text-anchor", "left")
            .attr("alignment-baseline", "middle")
            .attr("class", "focus-text")
    }

    // apply the rect that tracks
    var selectRect;
    if (d3.select(".select-rect").size() == 0) {
        selectRect = svg
            .append('rect')
            .style("opacity", 0)
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            .attr("class", "select-rect");

        // selectRect = d3.select(".select-rect");
    }

    selectRect
        .on('mouseover', (e) => {
            focus.style("opacity", 1)
            focusText.style("opacity", 1)
        })
        .on('mouseout', (e) => {
            focus.style("opacity", 0)
            focusText.style("opacity", 0)
        })
        .on('mousemove', moveOverFunc)
        .on("click", e => {
            d3.select(".house-size-path").attr("stroke-width", 3.0)
            d3.select(".house-price-path").attr("stroke-width", 3.0)

            focus.style("opacity", 0)
            focusText.style("opacity", 0)

            d3.select(".select-rect").remove()
        });
}
