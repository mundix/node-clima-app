import axios from "axios";


class Busquedas {
   historial = ['Tegucigalpa', 'Madrid', 'Santo Domingo', 'San Jose'];

   constructor () {
      //Leer DB Si existe

   }

   // Sera async por que voy a usar unafunciona http
   //REgresa un arreglo con todas las ciudades o lugares que coincida 
   //con este lugar 
   async ciudad( lugar ='') {

      //Peticion HTTP
      // console.log(lugar);
      try {
         const resp = await axios.get('https://reqres.in/api/users?page=2');
         console.log(resp.data.per_page);   
         return [];
      } catch (error) {
         return [];
      }
      

      
   }

}

export { Busquedas }