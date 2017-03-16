var sentiments = [{"WA": [25, 26], "DE": [20, 24], "DC": [23, 22], 
"WI": [10, 15], "WV": [25, 26], "HI": [22, 23], "FL": [22, 27], 
"WY": [24, 21], "NH": [25, 27], "NJ": [25, 27], "NM": [25, 27], 
"TX": [27, 25], "NC": [25, 26], "ND": [25, 26], "NE": [26, 20],
 "TN": [21, 27], "NY": [25, 27], "PA": [30, 22], "LS": [20, 19],
  "RI": [25, 26], "NV": [24, 37], "VA": [25, 13], "CO": [21, 25], 
  "AK": [17, 23], "AL": [32, 19], "AR": [22, 18], "VT": [7, 19], 
  "IL": [0, 0], "GA": [22, 26], "IN": [23, 11], "IA": [17, 23], 
  "OK": [21, 23], "AZ": [18, 24], "CA": [17, 24], "ID": [24, 17],
   "CT": [25, 15], "ME": [21, 26], "MD": [22, 28], "MA": [18, 23], 
   "OH": [23, 23], "UT": [24, 30], "MO": [53, 58], "MN": [23, 25], 
   "MI": [19, 23], "KS": [23, 19], "MT": [4, 25], "MS": [4, 19], 
   "SC": [25, 26], "KY": [23, 23], "OR": [25, 26], "SD": [25, 26]}, 
   {"WA": [27, 25], "DE": [31, 41], "DC": [33, 31], "WI": [48, 51], 
   "WV": [31, 31], "HI": [30, 58], "FL": [26, 43], "WY": [37, 36], 
   "NH": [31, 31], "NJ": [31, 31], "NM": [31, 31], "TX": [24, 41],
    "NC": [31, 31], "ND": [31, 31], "NE": [19, 47], "TN": [24, 38],
	 "NY": [31, 31], "PA": [37, 47], "LS": [34, 35], "RI": [31, 31],
	  "NV": [31, 40], "VA": [28, 22], "CO": [28, 44], "AK": [31, 47], 
	  "AL": [27, 48], "AR": [17, 36], "VT": [23, 49], "IL": [0, 0], 
	  "GA": [31, 42], "IN": [48, 33], "IA": [29, 47], "OK": [32, 30], 
	  "AZ": [35, 41], "CA": [27, 42], "ID": [13, 30], "CT": [27, 25],
	   "ME": [26, 37], "MD": [26, 44], "MA": [25, 40], "OH": [31, 42],
	    "UT": [38, 42], "MO": [28, 93], "MN": [33, 43], "MI": [29, 43], 
		"KS": [18, 44], "MT": [27, 40], "MS": [69, 80], "SC": [31, 31], 
		"KY": [33, 36], "OR": [30, 45], "SD": [31, 31]}]
var svg;


var formatPercent = d3.format(".0%"),
    formatNumber = d3.format(".0f");

var threshold = d3.scaleThreshold()
    .domain([0, 0.20, 0.40, 0.60, 0.80, 1])
    .range(["#ffffff", "#e5ccd3", "#cc99a8", "#b2667c", "#993351","#800026"]);

var x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 340]);

var xAxis = d3.axisBottom(x)
    .tickSize(13)
    .tickValues(threshold.domain())
    .tickFormat(function(d) { return d === 0.5 ? formatPercent(d) : formatNumber(100 * d); });

var g = d3.select("g").call(xAxis);

g.select(".domain")
    .remove();

g.selectAll("rect")
  .data(threshold.range().map(function(color) {
    var d = threshold.invertExtent(color);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;
  }))
  .enter().insert("rect", ".tick")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return threshold(d[0]); });

g.append("text")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
    .attr("y", -6)
    .text("Percentage sentimental tweets at each state");

$(document).ready(function(){	
		$("#before").click(function(){
			console.log(sentiments);
			$("#statesvg").html("waiting");
			var sampleData ={};	/* Sample random data. */	
			var states = ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
			"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
			"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
			"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
			"WI", "MO", "AR", "OK", "KS", "LS", "VA"];
			states.forEach(function(d){ 
				var mid=sentiments[0][d][0],
				high=sentiments[0][d][1];
				sampleData[d]={low:states.indexOf(d), high:high, 
							avg:mid, color:d3.interpolate("#ffffff", "#800026")(mid/100)}; 
			});

			

			
			/* draw states on id #statesvg */	
			uStates.draw("#statesvg", sampleData, tooltipHtml);
			console.log("plotted")

			d3.select(self.frameElement).style("height", "600px"); 
			function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
				// return "<h4>"+n+"</h4><table>"+
				// 	"<tr><td>low</td><td>"+(d.low)+"</td></tr>"+
				// 	"<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
				// 	"<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
				// 	"</table>";
				console.log("negative sentiments: "+d.high);
				document.getElementById('card-title').innerHTML = ('State: '+states[d.low]);
				document.getElementById('log').innerHTML = ("Negative sentiments indensity: "+d.high+'%'+'<br>'+
															"Positive sentiments indensity: "+d.avg+'%'
															);
				return '<img src="../tweets_bystate/sentiments_bystate/figure1_'+d.low+'.png">'
				
			}
		});
		$("#after").click(function(){
			$("#statesvg").html("waiting");
			var sampleData ={};	/* Sample random data. */	
			var states = ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
			"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
			"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
			"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
			"WI", "MO", "AR", "OK", "KS", "LS", "VA"];

			states.forEach(function(d){ 
				var mid=sentiments[1][d][0],
				high=sentiments[1][d][1];
				sampleData[d]={low:states.indexOf(d), high:high, 
							avg:mid, color:d3.interpolate("#ffffff", "#800026")(mid/100)}; 
			});
			
			
			/* draw states on id #statesvg */	
			uStates.draw("#statesvg", sampleData, tooltipHtml);
			svg = d3.select("#statesvg").append("g").selectAll("rect").data([0,0])

			d3.select(self.frameElement).style("height", "600px"); 
			function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
				// return "<h4>"+n+"</h4><table>"+
				// 	"<tr><td>low</td><td>"+(d.low)+"</td></tr>"+
				// 	"<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
				// 	"<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
				// 	"</table>";
				console.log("negative sentiments: "+d.high);
				document.getElementById('card-title').innerHTML = ('State: '+states[d.low]);
				document.getElementById('log').innerHTML = ("Negative sentiments indensity: "+d.high+'%'+'<br>'+
															"Positive sentiments indensity: "+d.avg+'%');
				return '<img src="../tweets_bystate/sentiments_bystate/figure2_'+d.low+'.png">'
			}
		});
	});