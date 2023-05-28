
const conectar=()=>{
    const req = new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
    req.send();
    req.onload=function(){
      
      const json = JSON.parse(req.responseText);
      const data2=json.data
      const datos3=[]
      
      data2.forEach(data2 => {
         datos3.push(data2[1])
      });
      datos3.forEach(datos3=>{
        console.log(datos3)
      })
      const width=1100
      const height=609
      const margen=60
      const distancia_barras=2;
      var svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height",height)
     
      
    .append("g")
    .attr("transform", "translate( " + margen + "," + (width - height) + " )");

// Definir la escala Y
// domain es el intervalo de valores sin escalar
// range es el intervalo de valores escalado
// Cuidado es para v4 en v3 scale.linear()
var escalaY = d3.scaleLinear()
          .domain([0, d3.max(data2, function(d){return d[1]})])
          .range([0, height - 2 * margen]);

// Crear las barras
var escalaY2 = d3.scaleLinear()
          .domain([ d3.max(datos3),0])
          .range([0, height - 2 * margen]);

svg.selectAll("rect") // Seleccionamos el svg
.data(data2)		  // Presentamos los datos
.enter()			  // Seleccionamos los datos que no tienen objetos
.append("rect")
.attr('class','bar')	  // Añadimos los rectangulos 
.attr("x",  function (d, i) {
  
     return i * (( width - 2 * margen ) / datos3.length); 
})				  // X calculamos el ancho automático en función
                   // del numero de valores y lo multiplicamos por la posición
.attr("y", function (d) {
     return -escalaY(d[1]);
})
.attr("data-date",(d)=>d[0])
.attr('data-gdp',(d)=>d[1])
				  // Calculamos la aplicandole la escala e invirtiendola
.attr("width", (( width - 2 * margen ) / datos3.length) - distancia_barras)
                   // Calculamos el ancho en función del numero de valores
.attr("height", function (d) {
     return escalaY(d[1]); // Calculamos la altura aplicandole la escala
})
.attr("fill", "blue")
.attr('class','edrpo') 
.append("title")
.text((d) => d)
.attr('id','tooltip')
.attr('data-date',(d)=>d[0])// Los pintamos de azul
const escalax=d3.scaleLinear()
             .domain([d3.min(data2,(d)=>parseInt(d[0][0]+d[0][1]+d[0][2]+d[0][3])),d3.max(data2,(d)=>parseInt(d[0][0]+d[0][1]+d[0][2]+d[0][3]))])
             .range([0,width-2*margen])
const x_axis=d3.axisBottom().scale(escalax)
const y_axis =d3.axisLeft().scale(escalaY2)
svg.append('g').attr('transform',`translate(0,${-escalaY(d3.max(datos3))})`).call(y_axis)
.attr('id','y-axis')
.attr('class','tick')




svg.append('g').attr('transform',`translate(0,0)`).call(x_axis)
.attr('id','x-axis') 
.attr('class','tick') 

     
     
    }
}
conectar()
  
