var margin = { top: 50, right: 50, bottom: -20, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;

var svg = d3.select("#map")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +")");

var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(800);

var path = d3.geoPath()
    .projection(projection);

var legalStatus = ['No Law', 'Statutory Ban', 'Constitutional Ban', 'Legal'];

var color = d3.scaleOrdinal()
    .domain(legalStatus)
    .range(["#bdc3c7", "#f4a582", "#d73027", "#4393c3"]);

var inputValue = "1995";
var year = ["1995", "1996", "1997", "1998", "1999", "2000",
            "2001", "2002", "2003", "2004", "2005", "2006",
            "2007", "2008", "2009", "2010", "2011", "2012",
            "2013", "2014", "2015"];

d3.csv("data/ssm.csv", function(data) {
    d3.json("usa/us.json", function(json) {
        for (var i = 0; i < data.length; i++) {
            var dataState = data[i].State;
                
            var y1995 = data[i]['1995'],
                y1996 = data[i]['1996'],
                y1997 = data[i]['1997'],
                y1998 = data[i]['1998'],
                y1999 = data[i]['1999'],
                y2000 = data[i]['2000'],
                y2001 = data[i]['2001'],
                y2002 = data[i]['2002'],
                y2003 = data[i]['2003'],
                y2004 = data[i]['2004'],
                y2005 = data[i]['2005'],
                y2006 = data[i]['2006'],
                y2007 = data[i]['2007'],
                y2008 = data[i]['2008'],
                y2009 = data[i]['2009'],
                y2010 = data[i]['2010'],
                y2011 = data[i]['2011'],
                y2012 = data[i]['2012'],
                y2013 = data[i]['2013'],
                y2014 = data[i]['2014'],
                y2015 = data[i]['2015'];
            
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.NAME;

                if (dataState == jsonState) {
                    json.features[j].properties.y1995 = y1995;
                    json.features[j].properties.y1996 = y1996;
                    json.features[j].properties.y1997 = y1997;
                    json.features[j].properties.y1998 = y1998;
                    json.features[j].properties.y1999 = y1999;
                    json.features[j].properties.y2000 = y2000;
                    json.features[j].properties.y2001 = y2001;
                    json.features[j].properties.y2002 = y2002;
                    json.features[j].properties.y2003 = y2003;
                    json.features[j].properties.y2004 = y2004;
                    json.features[j].properties.y2005 = y2005;
                    json.features[j].properties.y2006 = y2006;
                    json.features[j].properties.y2007 = y2007;
                    json.features[j].properties.y2008 = y2008;
                    json.features[j].properties.y2009 = y2009;
                    json.features[j].properties.y2010 = y2010;
                    json.features[j].properties.y2011 = y2011;
                    json.features[j].properties.y2012 = y2012;
                    json.features[j].properties.y2013 = y2013;
                    json.features[j].properties.y2014 = y2014;
                    json.features[j].properties.y2015 = y2015;
                    
                    break;
                }
            }
        }
        
        var states = svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(json.features)
            .enter().append("path")
            .attr("d", path);
        
        states
            .attr("fill", colorUpdate);
        
        var legend = svg.append("g")
            .attr("class", "legend")
            .selectAll("g")
            .data(legalStatus)
            .enter().append("g");
        
        legend
            .attr("transform", function(d, i) {
                return "translate(0," + i * 18 + ")"});
        
        legend
            .append("rect")
                .attr("x", -50)
                .attr("y", -50)
                .attr("width", 15)
                .attr("height", 15)
                .style("fill", function(d, i) {
                    return color(d);
                });
        
        legend
            .append("text")
                .attr("x", -30)
                .attr("dy", -37)
                .text(function(d) { return d; });
        
        d3.select("#timeslide").on("input", function() {
            updateYear(+this.value);
        });

        function updateYear(value) {
            document.getElementById("range").innerHTML = year[value];
            inputValue = year[value];
            
            d3.selectAll("#map path")
                .transition()
                    .duration(80)
                    .ease(d3.easeQuadIn)
                .attr("fill", colorUpdate);
        }
        
        function colorUpdate(d) {
            return color(d.properties["y" + inputValue]);
        }        
    });
});
