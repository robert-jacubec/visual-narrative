import { ApplyColorToAxis, AddLegend } from './utilities.js'

var focus;
var focusText;

var rateScale;
var yearScale;
var priceScale;

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

    var interestData = await d3.csv('../stats/MORTGAGE30US.csv', d => {
        return { year: new Date(d.year), rate: d.rate }
    })

    var housePriceData = await d3.csv('../stats/MSPUS.csv', d => {
        return { year: new Date(d.date), price: d.price }
    });

    // we only want to show from 1983 and on
    var filteredInterestData = interestData.filter(d => d.year >= new Date("1983"))
    const yearExtent = d3.extent(filteredInterestData, d => d.year);

    var filteredHousePrices = housePriceData.filter(d => {
        return d.year > yearExtent[0];
    })

    rateScale = d3.scaleLinear().domain([2, d3.max(filteredInterestData, d => +d.rate)]).range([height, 0]);
    yearScale = d3.scaleTime().domain(yearExtent).range([0, width]);
    priceScale = d3.scaleLinear().domain(d3.extent(filteredHousePrices, d => +d.price)).range([height, 0])

    var priceMoveOver = e => {
        var bisect = d3.bisector(d => d.year).left
        var x0 = yearScale.invert(d3.pointer(e)[0]);
        var i = bisect(filteredHousePrices, x0, 1);

        const selectedData = filteredHousePrices[i]
        focus
            .attr("cx", yearScale(selectedData.year))
            .attr("cy", priceScale(selectedData.price))


        if (i < 12) {
            focusText
                .attr("x", yearScale(selectedData.year) + 10)
                .attr("y", priceScale(selectedData.price))
        }
        else if (i > 125) {
            focusText
                .attr("x", yearScale(selectedData.year) - 130)
                .attr("y", priceScale(selectedData.price))
        }
        else {
            focusText
                .attr("x", yearScale(selectedData.year))
                .attr("y", priceScale(selectedData.price) + 30)
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        focusText.html("Price: " + formatter.format(selectedData.price))
    }

    var rateMoveOver = e => {
        var bisect = d3.bisector(d => d.year).left
        var x0 = yearScale.invert(d3.pointer(e)[0]);
        var i = bisect(filteredInterestData, x0, 1);

        const selectedData = filteredInterestData[i]
        focus
            .attr("cx", yearScale(selectedData.year))
            .attr("cy", rateScale(selectedData.rate))

        if (i > 212 && i < 1574) {
            focusText
                .attr("x", yearScale(selectedData.year))
                .attr("y", rateScale(selectedData.rate) - 100)
        }
        else if (i > 1574 && i < 1948) {
            focusText
                .attr("x", yearScale(selectedData.year) - 100)
                .attr("y", rateScale(selectedData.rate) - 100)
        }
        else if (i > 1948) {
            focusText
                .attr("x", yearScale(selectedData.year) - 130)
                .attr("y", rateScale(selectedData.rate) - 130)
        }
        else {
            focusText
                .attr("x", yearScale(selectedData.year))
                .attr("y", rateScale(selectedData.rate) + 30)
        }


        focusText.html("Rate: " + selectedData.rate + "%")
    }

    // Add the population line
    svg.append("path")
        .datum(filteredInterestData)
        .attr("fill", "AliceBlue")
        .attr("stroke", "blue")
        .attr("stroke-width", 1.0)
        .attr("class", "house-rate-path")
        .attr("d", d3.area()
            .x(function (d) { return yearScale(d.year) })
            .y(d => rateScale(d.rate))
            .y0(rateScale(2))
            .y1(function (d) { return rateScale(d.rate) })
        )
        .on("click", e => {
            AddMouseOver(svg, width, height, rateMoveOver)
            d3.select(".house-rate-path").attr("stroke-width", 3.0)
            d3.select(".house-rate-path").on("mouseout", e => { })
        })
        .on("mouseover", e => {
            d3.select(".house-rate-path").attr("stroke-width", 3.0)
            d3.select(".house-rate-path").on("mouseout", e => {
                d3.select(".house-rate-path").attr("stroke-width", 1.0)
            })
        })
        .on("mouseout", e => {
            d3.select(".house-rate-path").attr("stroke-width", 1.0)
        })

    svg.append("path")
        .datum(filteredHousePrices)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("class", "house-price-path")
        .attr("stroke-width", 3.0)
        .attr("d", d3.line()
            // .curve(d3.curveBasis)
            .x(function (d) { return yearScale(d.year) })
            .y(function (d) { return priceScale(d.price) })
        )
        .on("click", e => {
            AddMouseOver(svg, width, height, priceMoveOver)
            d3.select(".house-price-path").attr("stroke-width", 5.0)
            d3.select(".house-price-path").on("mouseout", e => { })
        })
        .on("mouseover", e => {
            d3.select(".house-price-path").attr("stroke-width", 5.0)
            d3.select(".house-price-path").on("mouseout", e => {
                d3.select(".house-price-path").attr("stroke-width", 3.0)
            })
        })
        .on("mouseout", e => {
            d3.select(".house-price-path").attr("stroke-width", 3.0)
        })

    var yearAxis = svg.append("g").attr("transform", "translate(0," + (height) + ")").call(d3.axisBottom(yearScale))
    var interestAxis = svg.append("g").attr("transform", "translate(" + width + ",0)").call(d3.axisRight(rateScale));
    var priceAxis = svg.append("g").attr("transform", "translate(" + 0 + "," + 0 + ")").call(d3.axisLeft(priceScale).tickFormat(d3.format('$,')))

    ApplyColorToAxis(priceAxis, "green")
    ApplyColorToAxis(interestAxis, "blue")
    AddLegend(svg, 150, 600, ["U.S. 30 Year Mortgage Rate Percentage", "Average House Price of U.S. Home (USD)"], ["blue", "green"])
    AddAnnotations(svg)
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
            d3.select(".house-price-path").attr("stroke-width", 3.0)
            d3.select(".house-rate-path").attr("stroke-width", 1.0)

            focus.style("opacity", 0)
            focusText.style("opacity", 0)

            d3.select(".select-rect").remove()
        });
}

function AddAnnotations(svg) {
    const type = d3.annotationCalloutCircle

    const annotations = [{
        note: {
            label: "The 2008 Great Recession",
            title: "Recession"
        },
        //can use x, y directly instead of data
        // data: { date: "18-Sep-09", close: 185.02 },
        className: "show-bg",
        subject: { radius: 30, radiusPadding: 1 },
        dy: -200,
        dx: 0,
        x: 450,
        y: 308
    },
    {
        note: {
            label: "The Early 1990's Recession",
            title: "Recession"
        },
        subject: { radius: 30, radiusPadding: 1 },
        dy: -80,
        dx: -10,
        x: 140,
        y: 550
    },
    {
        note: {
            label: "The mid 1980's unprecedented mortgage rates were fueled by rising oil prices, government overspending, and rising wages.",
            title: "Unprecedented Percentages"
        },
        subject: { radius: 150, radiusPadding: 1 },
        dy: -60,
        dx: 150,
        x: 70,
        y: 143
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