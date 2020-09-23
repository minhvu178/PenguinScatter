var classDataPromise = d3.json("classData.json");

var initGraph = function(penguins) {
    
    var screen = {width:600, height:600}
    
    d3.select("#graph")
    .attr("width", screen.width)
    .attr("height", screen.height)
    
    var xScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,screen.width])
    
    var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([screen.height, 0])
    d3.select('body').selectAll("h2").text('Final vs HW Mean')
    drawPlot1(penguins, screen, xScale,yScale)
    
    d3.select("#btngraph1").on("click", function(){
        d3.select("#graph").selectAll("circle").remove()
        d3.select('body').selectAll("h2").text('Final vs HW Mean')
        drawPlot1(penguins, screen, xScale,yScale)
    })
    d3.select("#btngraph2").on("click", function(){
        d3.select("#graph").selectAll("circle").remove()
        
        d3.select('body').selectAll("h2").text('HW Mean vs Quiz Mean')
        drawPlot2(penguins, screen, xScale,yScale)
    })
    
}

var drawPlot1 = function(penguins, screen, xScale, yScale) {
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin) {
        console.log(penguin.final[0].grade)
        return xScale(penguin.final[0].grade);
    })
    .attr("cy", function(penguin){
            var allGrade = penguin.homework.map(function(hw){return hw.grade;})
            return yScale(d3.mean(allGrade));
    })
    .attr("r", 5)
    .attr("fill", "red")
    .attr("stroke", "black")
    .on("mouseenter", function(penguin) {
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden", false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
        
        d3.select("#image-hover")
        .append("img")
        .attr("src", "imgs/"+penguin.picture)
        
    })
    .on("mouseleave", function(penguin) {     
        d3.select("#tooltip")
        .classed("hidden", true)
        
        d3.select("#image-hover")
        .selectAll("img")
        .remove()
    })
}

var drawPlot2 = function(penguins, screen, xScale, yScale) {
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin){
        var allQGrade = penguin.quizes.map(function(qz){return qz.grade;})
        return xScale(10*d3.mean(allQGrade));
    })
    .attr("cy", function(penguin) {
        var allHGrade = penguin.homework.map(function(hw){return hw.grade;})
        return yScale(d3.mean(allHGrade));
    })
    
    .attr("r", 5)
    .attr("fill", "red")
    .attr("stroke", "black")
    .on("mouseenter", function(penguin) {
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden", false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
        
        d3.select("#image-hover")
        .append("img")
        .attr("src", "imgs/"+penguin.picture)
        
    })
    .on("mouseleave", function(penguin) {     
        d3.select("#tooltip")
        .classed("hidden", true)
        
        d3.select("#image-hover")
        .selectAll("img")
        .remove()
    })
}

var successFCN = function(classData)
{
    console.log("Data collected", classData);
    initGraph(classData)
}


var failFCN = function(errorMsg)
{
    console.log("Something went wrong",errorMSG);
}


//set the responses for the outcome of Promise
classDataPromise.then(successFCN,failFCN);