/// CREATE MAP AND MARGINS ///
const margin = {left: 170, top: 50, bottom: 50, right: 20}
const padding = 100
const w =500 - margin.left - margin.right
const h = 200 - margin.top - margin.bottom
var projection = d3.geoMercator().translate([w/2,(h/2)-50]).center([-95.30,39.19]).scale(1000)

path = d3.geoPath().projection(projection)


var svg = d3.selectAll('#vis')
.append('svg')
.attr('width',w )
.attr('height', h)
.attr('opacity',1)

d3.json('us-states.geojson')
  .then(function(data) {
    svg.selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d',path)
    .attr('opacity',.5)
    .attr('fill','#D6D6D6')
    .attr('stroke','black')


d3.csv('police_clean4.csv')
.then(function (data){
  var parseTime = d3.timeParse('%Y-%m-%d');
    data.forEach(function (d){
    d.date = parseTime(d.date)
    dataset = data
  svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('id','datacircle')
  .attr('class', function(d){
    return 'date'+ d.index

  })
  .attr('cx', function (d){return projection([+d.Longitude, +d.Latitude])[0]})
  .attr('cy', function (d){return projection([+d.Longitude, +d.Latitude])[1]})
  .attr('fill','red')
  .attr('r',15)
  .attr('stroke','yellow')
  .attr('stroke-width',4)
  .attr('opacity',0)})
  
  svg.append('text')
  .attr('x',w - 400)
  .attr('y',50)
  .attr('font-family','monospace')
  .attr('font-size','3em')
  .attr('opacity',0)
  .text('HELLO')
  

window.onload = circleAnim();

function circleAnim(){
var i;
for (let i = 0; i < data.length; i++){
  setTimeout(function(){
  d3.selectAll('.date'+String(i))
  .raise()
  .transition()
  .attr('opacity',1)
  .transition()
  .duration(1000)
  .attr('r',5)
  .attr('stroke','black')
  .attr('stroke-width',1)
  d3.selectAll('text')
  .transition()
  .attr('opacity',1)
  .text(String(data[i].date).replace('00:00:00 GMT+0200 (Central European Summer Time)',''))}
  ,10*i)}}
})


})