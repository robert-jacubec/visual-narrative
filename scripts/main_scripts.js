export function hello(text) {
    const div = document.createElement('div');
    div.textContent = `Hello ${text}`;
    document.body.appendChild(div);
}


import { ApplyColorToAxis, AddLegend } from './utilities.js'

// export async function LoadFirstGraph() {


//     // set the dimensions and margins of the graph
//     var margin = { top: 10, right: 30, bottom: 30, left: 60 },
//         width = 500 - margin.left - margin.right,
//         height = 00 - margin.top - margin.bottom;


//     // append the svg object to the body of the page
//     //var svg = d3.select(".main")

//     var svg = d3.select(".graph-goes-here")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     //Read the data
//     var data = await d3.csv('../stats/year_to_inflation_percentage.csv', d => {
//         return { year: new Date(d.year), rate: d.rate }
//     });

//     console.log(typeof (data))

//     // Add the x axis stuff
//     var x = d3.scaleTime()
//         // .domain(d3.extent(data, function (d) { return new Date(parseInt(d.year), 0); }))
//         .domain(d3.extent(data, d => d.year))
//         .range([0, width]);

//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));

//     // Add the y axis stuff
//     var y = d3.scaleLinear()
//         .domain([0, d3.max(data, function (d) { return +d.rate; })])
//         .range([height, 0]);

//     // add the percentage to axis
//     svg.append("g")
//         .call(d3.axisLeft(y).tickFormat(d => d + "%"));

//     // Add the line
//     svg.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "green")
//         .attr("stroke-width", 1.5)
//         .attr("d", d3.line()
//             .x(function (d) { return x(d.year) })
//             .y(function (d) { return y(d.rate) })
//         )

//     //         svg.append("line")
//     // .attr("x1", x(new Date(2017)))  //<<== change your code here
//     // .attr("y1", 0)
//     // .attr("x2", x(new Date(2017)))  //<<== and here
//     // .attr("y2", height - margin.top - margin.bottom)
//     // .style("stroke-width", 2)
//     // .style("stroke", "red")
//     // .style("fill", "none");


//     // This allows to find the closest X index of the mouse:
//     var bisect = d3.bisector(function (d) { return d.year; }).left


//     // Create the circle that travels along the curve of chart
//     var focus = svg
//         .append('g')
//         .append('circle')
//         .style("fill", "black")
//         .attr("stroke", "black")
//         .attr('r', 3.5)
//         .style("opacity", 0)

//     // Create the text that travels along the curve of chart
//     var focusText = svg
//         .append('g')
//         .append('text')
//         .style("opacity", 0)
//         .attr("text-anchor", "left")
//         .attr("alignment-baseline", "middle")

//     function mouseMove(e) {
//         // recover coordinate we need
//         var x0 = x.invert(d3.pointer(e)[0]);
//         var i = bisect(data, x0, 1);

//         // console.log(x(x0))
//         console.log(i)

//         console.log(data[i])

//         const selectedData = data[i]
//         focus
//             .attr("cx", x(selectedData.year))
//             .attr("cy", y(selectedData.rate))


//         if (i > 33) {
//             focusText.attr("x", x(selectedData.year) - 135)
//         }
//         else {
//             focusText.attr("x", x(selectedData.year) + 15)
//         }
//         focusText
//             // .html("x:" + selectedData.year + "  -  " + "y:" + selectedData.rate)
//             .html("Percentage: " + selectedData.rate + "%")

//             .attr("y", y(selectedData.rate))
//     }


//     svg
//         .append('rect')
//         .style("opacity", 0)
//         .style("fill", "none")
//         .style("pointer-events", "all")
//         .attr('width', width)
//         .attr('height', height)
//         .on('mouseover', (e) => {

//             focus.style("opacity", 1)
//             focusText.style("opacity", 1)


//             // console.log(data[0].rate)

//             // console.log(d3.pointer(e))
//         })
//         .on('mousemove', mouseMove)
//         .on('mouseout', (e) => {

//             focus.style("opacity", 0)
//             focusText.style("opacity", 0)

//             //  console.log(d3.pointer(e))
//         });




//     // What happens when the mouse move -> show the annotations at the right positions.
//     // function mouseover() {
//     //     focus.style("opacity", 1)
//     //     focusText.style("opacity", 1)
//     // }

//     // function mousemove() {
//     //     // recover coordinate we need
//     //     var x0 = x.invert(d3.pointer(this)[0]);
//     //     var i = bisect(data, x0, 1);
//     //     selectedData = data[i]
//     //     focus
//     //         .attr("cx", x(selectedData.x))
//     //         .attr("cy", y(selectedData.y))
//     //     focusText
//     //         .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
//     //         .attr("x", x(selectedData.x) + 15)
//     //         .attr("y", y(selectedData.y))
//     // }
//     // function mouseout() {
//     //     focus.style("opacity", 0)
//     //     focusText.style("opacity", 0)
//     // }

//     // Create a rect on top of the svg area: this rectangle recovers mouse position
//     //   svg
//     //   .append('rect')
//     //   .style("fill", "none")
//     //   .style("pointer-events", "all")
//     //   .attr('width', width)
//     //   .attr('height', height)
//     //   .on('mouseover', mouseover)
//     //   .on('mousemove', mousemove)
//     //   .on('mouseout', mouseout);



//     // const scaleY = d3.scaleLinear().domain([0, 42]).range([200, 0]);
//     // const scaleX = d3.scaleLinear().domain([0, 42]).range([200, 0]);

//     // const pop_trend_data = await d3.csv('../stats/year_to_inflation_percentage.csv');

//     // console.log(pop_trend_data)

//     // // x_axis = d3.

//     // d3.select('.main_svg').attr("width", 600)
//     // .attr("height", 600);

//     // d3.select(".main_svg")
//     //     // .attr("style", "background-color:grey")
//     //     .append('g').attr("transform", "translate(50, 50)")
//     //     .selectAll('rect')
//     //     .data(pop_trend_data)
//     //     .enter()
//     //     .append('rect')
//     //     .attr("x", (d,i) => {    
//     //         return i;
//     //     })
//     //     .attr("y", (d, i) => d.rate*100)
//     //     .attr('width', (d, i) => i)
//     //     .attr('height', (d, i) => d.rate*100)

//     // .append('g')
//     // .attr("transform", "translate(" + 50 + "," + 50 + ")")
//     // .append('path')
//     // .datum(pop_trend_data)
//     // .attr("fill", "none")
//     // .attr("stroke", "steelblue")
//     // .attr("stroke-width", 1.5)
//     // .attr("d", d3.line()
//     //   .x(d => {
//     //       console.log(d.year);
//     //       return d.year;
//     //     }
//     //       )
//     //   .y(d => d.rate)
//     //   )


//     // d3.select('.main').text("hello there, person!");
// }


var focus;
var focusText;

export async function LoadFirstGraph() {


    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 75, bottom: 30, left: 75 },
        width = 800 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    //var svg = d3.select(".main")

    var svg = d3.select(".graph-goes-here")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    var data = await d3.csv('../stats/MSPUS.csv', d => {
        return { year: new Date(d.date), price: d.price }
    });

    var usPop = await d3.csv('../stats/POPTOTUSA647NWDB.csv', d => {
        return { year: new Date(d.year), population: d.population }
    });

    // The axis information goes here
    // add the population axis
    var popScale = d3.scaleLinear().domain(d3.extent(usPop, d => d.population)).range([height, 0])

    var populationAxis = svg.append('g').attr("transform", "translate(" + width + ",0)").call(d3.axisRight(popScale));
    ApplyColorToAxis(populationAxis, "orange")

    // Add the time (x) axis stuff
    var x = d3.scaleTime()
        // .domain(d3.extent(data, function (d) { return new Date(parseInt(d.year), 0); }))
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the price (y) axis stuff
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return +d.price; })])
        .range([height, 0]);

    // add the dollar sign to y axis
    var priceAxis = svg.append("g")
        .call(d3.axisLeft(y).tickFormat(d3.format('$,')));

    ApplyColorToAxis(priceAxis, "green")

    // This allows to find the closest X index of the mouse:
    var bisect = d3.bisector(function (d) { return d.year; }).left


    var mouseMovePrice = e => {
        // recover coordinate we need
        var x0 = x.invert(d3.pointer(e)[0]);
        var i = bisect(data, x0, 1);

        const selectedData = data[i]
        focus
            .attr("cx", x(selectedData.year))
            .attr("cy", y(selectedData.price))


        if(i < 36){
            focusText
            .attr("y", y(selectedData.price) + 10)
            .attr("x", x(selectedData.year))
        }
        else if (i > 100 && i < 180) {
            focusText.attr("x", x(selectedData.year) - 10)
            .attr("y", y(selectedData.price) + 50)
        }
        else if (i > 180){
            focusText.attr("x", x(selectedData.year) - 100)
            .attr("y", y(selectedData.price) + 100)
        }
        else {
            focusText.attr("x", x(selectedData.year) + 15)
            .attr("y", y(selectedData.price) + 50)
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        focusText
            // .html("x:" + selectedData.year + "  -  " + "y:" + selectedData.price)
            .html("Price: " + formatter.format(selectedData.price))
            
    }

    var mouseMovePopulation = e => {
        // recover coordinate we need
        var x0 = x.invert(d3.pointer(e)[0]);
        var i = bisect(usPop, x0, 1);

        const selectedData = usPop[i]
        focus
            .attr("cx", x(selectedData.year))
            .attr("cy", popScale(selectedData.population))


        if((x(selectedData.year) -10) > 180){
            focusText.attr("x", x(selectedData.year) - 200)
            focusText.attr("y", popScale(selectedData.population) )
        }
        else{
            focusText.attr("x", x(selectedData.year) - 10)
            focusText.attr("y", popScale(selectedData.population) - 30)
        }
        
        focusText.html("Population: " + parseInt(selectedData.population).toLocaleString() )
    }

    // Add the house price
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 3.0)
        .attr("class", "house-price-path")
        .attr("d", d3.line()
            .x(function (d) { return x(d.year) })
            .y(function (d) { return y(d.price) })
        )
        .on("click", e => {
            AddMouseOver(svg, width, height, mouseMovePrice)
            d3.select(".house-price-path")
                .attr("stroke-width", 5.0)
                .on("mouseout", e => { })
        })
        .on("mouseover", e => {
            d3.select(".house-price-path")
                .attr("stroke-width", 5.0)
                .on("mouseout", e => { d3.select(".house-price-path").attr("stroke-width", 3.0) })
        })
        .on("mouseout", e => {
            d3.select(".house-price-path").attr("stroke-width", 3.0)
        })

    // Add the population line
    svg.append("path")
        .datum(usPop)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 3.0)
        .attr("class", "house-pop-path")
        .attr("d", d3.line()
            .x(function (d) { return x(d.year) })
            .y(function (d) { return popScale(d.population) })
        )
        .on("click", e => {
            AddMouseOver(svg, width, height, mouseMovePopulation)
            d3.select(".house-pop-path")
                .attr("stroke-width", 5.0)
                .on("mouseout", e => { })
        })
        .on("mouseover", e => {
            d3.select(".house-pop-path")
                .attr("stroke-width", 5.0)
                .on("mouseout", e => { d3.select(".house-pop-path").attr("stroke-width", 3.0) })
        })
        .on("mouseout", e => {
            d3.select(".house-pop-path").attr("stroke-width", 3.0)
        })

    AddLegend(svg, 110, 200, ["U.S. Population", "Average House Price of U.S. Home (USD)"], ["orange", "green"])
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
            d3.select(".house-price-path").attr("stroke-width", 3.0)
            d3.select(".house-pop-path").attr("stroke-width", 3.0)

            // d3.select(".house-size-path").attr("stroke-width", 3.0)
            // d3.select(".house-price-path").attr("stroke-width", 3.0)

            focus.style("opacity", 0)
            focusText.style("opacity", 0)

            d3.select(".select-rect").remove()
        });
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
        dy: 100,
        dx: 0,
        x: 525,
        y: 260
    },
    {
        note: {
            label: "The 1973 oil crisis",
            title: "Recession"
        },
        subject: { radius: 20, radiusPadding: 1 },
        dy: -100,
        dx: 0,
        x: 75,
        y: 610
    },
    {
        note: {
            label: "The Early 1990's Recession",
            title: "Recession"
        },
        subject: { radius: 20, radiusPadding: 1 },
        dy: 100,
        dx: 50,
        x: 310,
        y: 430
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



// // Create the circle that travels along the curve of chart
    // var focus = svg
    //     .append('g')
    //     .append('circle')
    //     .style("fill", "black")
    //     .attr("stroke", "black")
    //     .attr('r', 3.5)
    //     .style("opacity", 0)

    // // Create the text that travels along the curve of chart
    // var focusText = svg
    //     .append('g')
    //     .append('text')
    //     .style("opacity", 0)
    //     .attr("text-anchor", "left")
    //     .attr("alignment-baseline", "middle")




    // svg
    //     .append('rect')
    //     .style("opacity", 0)
    //     .style("fill", "none")
    //     .style("pointer-events", "all")
    //     .attr('width', width)
    //     .attr('height', height)
    //     .on('mouseover', (e) => {

    //         focus.style("opacity", 1)
    //         focusText.style("opacity", 1)


    //         // console.log(data[0].price)

    //         // console.log(d3.pointer(e))
    //     })
    //     .on('mousemove', mouseMove)
    //     .on('mouseout', (e) => {

    //         focus.style("opacity", 0)
    //         focusText.style("opacity", 0)

    //         //  console.log(d3.pointer(e))
    //     });




    // What happens when the mouse move -> show the annotations at the right positions.
    // function mouseover() {
    //     focus.style("opacity", 1)
    //     focusText.style("opacity", 1)
    // }

    // function mousemove() {
    //     // recover coordinate we need
    //     var x0 = x.invert(d3.pointer(this)[0]);
    //     var i = bisect(data, x0, 1);
    //     selectedData = data[i]
    //     focus
    //         .attr("cx", x(selectedData.x))
    //         .attr("cy", y(selectedData.y))
    //     focusText
    //         .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
    //         .attr("x", x(selectedData.x) + 15)
    //         .attr("y", y(selectedData.y))
    // }
    // function mouseout() {
    //     focus.style("opacity", 0)
    //     focusText.style("opacity", 0)
    // }

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    //   svg
    //   .append('rect')
    //   .style("fill", "none")
    //   .style("pointer-events", "all")
    //   .attr('width', width)
    //   .attr('height', height)
    //   .on('mouseover', mouseover)
    //   .on('mousemove', mousemove)
    //   .on('mouseout', mouseout);



    // const scaleY = d3.scaleLinear().domain([0, 42]).range([200, 0]);
    // const scaleX = d3.scaleLinear().domain([0, 42]).range([200, 0]);

    // const pop_trend_data = await d3.csv('../stats/year_to_inflation_percentage.csv');

    // console.log(pop_trend_data)

    // // x_axis = d3.

    // d3.select('.main_svg').attr("width", 600)
    // .attr("height", 600);

    // d3.select(".main_svg")
    //     // .attr("style", "background-color:grey")
    //     .append('g').attr("transform", "translate(50, 50)")
    //     .selectAll('rect')
    //     .data(pop_trend_data)
    //     .enter()
    //     .append('rect')
    //     .attr("x", (d,i) => {    
    //         return i;
    //     })
    //     .attr("y", (d, i) => d.rate*100)
    //     .attr('width', (d, i) => i)
    //     .attr('height', (d, i) => d.rate*100)

    // .append('g')
    // .attr("transform", "translate(" + 50 + "," + 50 + ")")
    // .append('path')
    // .datum(pop_trend_data)
    // .attr("fill", "none")
    // .attr("stroke", "steelblue")
    // .attr("stroke-width", 1.5)
    // .attr("d", d3.line()
    //   .x(d => {
    //       console.log(d.year);
    //       return d.year;
    //     }
    //       )
    //   .y(d => d.rate)
    //   )


    // d3.select('.main').text("hello there, person!");