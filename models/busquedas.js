import axios from "axios";


class Busquedas {
   historial = ['Tegucigalpa', 'Madrid', 'Santo Domingo', 'San Jose'];

   constructor() {
      //Leer DB Si existe

   }

   get paramsMapBox() {
      return {
         access_token: 'pk.eyJ1IjoibXVuZGl4MDEiLCJhIjoiY2xkNGJ0ZGQ1MDB0ajN2cGNwYmszZ3B3eSJ9.ORtvYlHRQmYXOlPZH8hmRg',
         limit: 5,
         language: 'es'
      }
   }

   // Sera async por que voy a usar unafunciona http
   //REgresa un arreglo con todas las ciudades o lugares que coincida 
   //con este lugar 
   async ciudad(lugar = '') {
      try {

         //Peticion HTTP
         const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapBox
         });

         const resp = await instance.get();
         console.log(resp.data);

         return [];

      } catch (error) {
         return [];
      }



   }

}

export { Busquedas }