const db = firebase.firestore();
const formulario = document.getElementById('form');
const showjs = document.getElementById('show');
const entradaBuscar =document.querySelector('#entrada');
const resultado = document.getElementById('resuUl');
let listables, lista1 =[], lista2 =[], lista3 =[], lista4 =[], lista5 =[];
let dias ='';
let listavehiculos =[];
var pageNumber =1;
var pageSize =10;
var contador = 0;
var carros ="";
var paginattion;

entradaBuscar.addEventListener('keyup', probar);

function paginate (array, page_size, page_number){
  return array.slice((page_number-1)* page_size, page_number * page_size);
}

function mostrarVeh(_listavehiculos){
  var paginattion =paginate(noticias, pageSize, pageNumber)

}



let editStatus =false;
let id='';
const guardar =(placa, conductor, tipo, horaEnt, horaSali)=>
db.collection('vehiculos').doc().set({
    placa,
    conductor,
    tipo,
    horaEnt,
    horaSali
 
 });

 const mostrar = () => db.collection('vehiculos').get();
 const traer = (id) => db.collection('vehiculos').doc(id).get();
const onGetTask =(callback) => db.collection('vehiculos').onSnapshot(callback);

const borrarCarro = id => db.collection('vehiculos').doc(id).delete();
const updateRe =(id, actualizado) => db.collection('vehiculos').doc(id)
.update(actualizado);



var dib = "";

function probar(e) {
  if(e.code =="Backspace"){
    
    filtrar();
    
if(e.code =="Backspace" && entradaBuscar.value==""){
  cont =0;
  listables =[];
resultado.innerHTML = '';

}
  }else if(e.code =="Comma" || e.code =="periot"
  || e.code =="Slash"){
   
  }else{
    
    filtrar();
  }
  
}
const filtrar =() =>{
  resultado.innerHTML ='';
var lowerText = entradaBuscar.value;
var comparar = lowerText.toLowerCase();

listables =[];
cont=0;
listavehiculos.forEach((valVehi)=>{
let placaPag = valVehi.placa
placaPag = placaPag.toLowerCase();
let tipoPag = valVehi.tipo
console.log(tipoPag)
tipoPag = tipoPag.toLowerCase();
let idPag = valVehi.id;

var conductorPag = valVehi.conductor;



if(placaPag.indexOf(comparar) != -1 &&  comparar!=''){

cont++;

var obj={placa: placaPag, conductor: valVehi.conductor, tipo: valVehi.tipo,
horaEnt: valVehi.horaEnt, id: idPag, pos: contador }
listables.push(obj);

resultado.innerHTML += `

<li> Placa ${placaPag} - Conductor: ${valVehi.conductor}</li>
`
}
else if(tipoPag.indexOf(comparar) != -1 &&  comparar!=''){

  cont++;
  
  var obj={placa: placaPag, conductor: valVehi.conductor, tipo: valVehi.tipo,
  horaEnt: valVehi.horaEnt, id: idPag, pos: contador }
  listables.push(obj);
  
  resultado.innerHTML += `
  
  <li> Tipo ${tipoPag} - Conductor: ${valVehi.conductor} - Placa: ${valVehi.placa}</li>
  `
  }
})

if(cont >=3){
const ed =document.getElementById('cajaFiltro').style;
ed.height ="200px;";

}  
if(resultado.innerHTML === ''){

resultado.innerHTML +=
`
<li>No hay coincidencias...</li>
`
}
}
                                                          window.addEventListener('DOMContentLoaded', async (e) =>{
  
  
  //O
  

     editStatus =false;
     onGetTask((querySnapshot)=>{
  showjs.innerHTML ='';  
              
     console.log(querySnapshot)
     contador=0;
   
     function getHoras(dateString) {
      let hoy = new Date();
      let fechauno = new Date(dateString);

   
      let dias = hoy.getMonth() - fechauno.getMonth();
      let meses = hoy.getMonth() -fechauno.getMonth();
      let horas = hoy.getHours() - fechauno.getHours();
  if (meses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechauno.getDate())
  ) {
    años--
  }
 dias += 'Horas'+ horas+ 'Días '+ dias+'';
 return dias;
}

     querySnapshot.forEach((doc) => {
     
             const datos = doc.data();
             datos.id = doc.id;    console.log("numero de pagina " + pageNumber);
            var i =datos.id;

             var n =  doc.data().placa;
             var a =  doc.data().conductor; console.log(a,n,p,m);
             var p =  doc.data().tipo;
             var m =  doc.data().horaEnt;
          //   var size = Object.keys(querySnapshot).length;
            
          var objeto={placa: n, conductor: a, tipo: p, horaEnt: m,
            pos: contador,  id: i};

            listavehiculos.push(objeto); 
            
            lista1.push(objeto)
            lista2.push(objeto)
            lista3.push(objeto)
            lista4.push(objeto)
            lista5.push(objeto)


            if((contador+1) <=pageSize && pageNumber==1 ){
        console.log(objeto);

        dib += "  <div class='formulario'> "
        dib += "  <form class='form'  > "
        dib += "<h1>Conductor: "+ a +"</h1>"
        dib += "<h1>Placa: "+ n +"</h1>"

          dib += '<input id="inp1" type="text" placeholder="'+n+'" autofocus > '
          dib += '<input type="text" placeholder="'+a+' " > '
          dib += '<input type="text" placeholder="'+p+'" > '
          dib += "<button  style= 'background-color: red; font-size: 25px;' class='salir' type='button'  data-id="+i+">Salida</button>  "
          dib += "<button style= 'margin-left:26px;' class='editar' type='button'  data-id="+i+">Editar</button>  "
          dib += "<button class='borrador ' type='button' data-id="+i+">Borrar</button>"
          dib += "  </form>   "  
          dib += "  </div>     " 
          console.log(i) 
          dib += "  </div>`"
              showjs.innerHTML =dib;
              
              
                 const btones = document.querySelectorAll('.borrador');  
                 btones.forEach(btn => {
              btn.addEventListener('click', async (e) => {
                         
                        await borrarCarro (e.target.dataset.id);
                     });
                 });
                 
                 const btnedit = document.querySelectorAll('.editar');
                 btnedit.forEach(btn =>{
        
                  btn.addEventListener('click', async (e)=> {
                    console.log("ookkkookokkookkookokokokkokokokokok");
                    const dc = await traer(e.target.dataset.id);
                    const tarea =dc.data();
                    console.log(tarea);
        
                    editStatus =true;
        id= dc.id;


  formulario['dato1'].value=tarea.placa;
  formulario['dato2'].value=tarea.conductor;
  formulario['tipo'].value=tarea.tipo;
//   formulario['mensaje'].value=tarea.horaEnt;

  formulario['submit'].innerText = 'Actualizar'
                  });
                 });
              
              
 }if((contador) > pageSize && (contador < (2*pageSize)) &&pageNumber==2 ){
  contador++;

  
 }
 






        contador++;
    
        console.log(listavehiculos.length)
         
     });  
    
    
   });
 });



 formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
 
  var fecha = new Date();
  var mes = fecha.getMonth();
  var dia = fecha.getDate();
  var hora = fecha.getHours();
  var minut = fecha.getMinutes();  
  var anno = fecha.getFullYear();
  const horaEntrada =  anno + "/"+ mes+ "/" + dia+"/"+hora+ "/" + minut;
 // formulario['datos3'].innerHTML = `${horaEntrada}` 
  
const placa = formulario['dato1'].value;
const conductor = formulario['dato2'].value;
const tipo =formulario['tipo'].value;

const horaEnt =  horaEntrada;
const horaSali = "";
const estado =true;

console.log(placa)


if(!editStatus){
await guardar(placa, conductor, tipo, horaEnt,horaSali, estado);
formulario.reset();
}else{
await updateRe(id, {
 placa: formulario['dato1'].value,
  conductor: formulario['dato2'].value,
  tipo: formulario['tipo'].value,
  
});
editStatus =false;
id='';
formulario['submit'].innerText = 'Registrar';

}
formulario.reset();
  
})




















/**  dibujar();
     function dibujar(){

      const btnAnt =document.getElementById('anterior');
      const ant = btnAnt.addEventListener('click', previusPage);
      
      const btnSig =document.getElementById('siguiente');
      const sig = btnSig.addEventListener('click', pageNext);
      function pageNext(){
        pageNumber++;
        
        dibujar();
        
      }
      function previusPage(){
        pageNumber--;
 
       dibujar();
       
      }
      l();
     function l(listan) {
      for(let i =0; i< listavehiculos.length; i++){

      }
     }
     
     } */











//https://www.youtube.com/watch?v=itNsRn1kjLU&ab_channel=FaztCode