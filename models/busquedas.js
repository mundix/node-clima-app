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
         const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?access_token=pk.eyJ1IjoibXVuZGl4MDEiLCJhIjoiY2xkNGJ0ZGQ1MDB0ajN2cGNwYmszZ3B3eSJ9.ORtvYlHRQmYXOlPZH8hmRg&limit=5&language=es');
         console.log(resp.data);   
         return [];
      } catch (error) {
         return [];
      }
      

      
   }

}

export { Busquedas }