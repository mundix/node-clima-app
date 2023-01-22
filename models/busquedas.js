import axios from "axios";


class Busquedas {
   historial = ['Tegucigalpa', 'Madrid', 'Santo Domingo', 'San Jose'];

   constructor() {
      //Leer DB Si existe

   }

   get paramsMapBox() {
      return {
         access_token: process.env.MAPBOX_KEY,
         limit: 5,
         language: 'es'
      }
   }
   get paramsOpenWeather() {
      return {
         appid: process.env.OPENWEATHER_KEY,
         lang: 'es',
         unit: 'metric'
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
         // console.log(resp.data.features);

         return resp.data.features.map( lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
         }))

      } catch (error) {
         return [];
      }



   }

   async climaLugar(lat, lon) {
      try {
         
         //Peticion HTTP
         const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: { 
               lat,
               lon,
               ...this.paramsOpenWeather
            }
         });

         //resp extraer la info de la data.

         const resp = await instance.get();

         return {
            desc: resp.data.weather[0].description,
            min: resp.data.main.temp_min,
            max: resp.data.main.temp_max,
            temp: resp.data.main.temp
         }

      } catch (error) {
         console.log(error);
      }
   }

}

export { Busquedas }