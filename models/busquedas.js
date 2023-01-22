import axios from "axios";
import fs from 'fs'; //fileSystem


class Busquedas {
   historial = [];
   dbPath = './db/database.json';

   constructor() {
      //Leer DB Si existe
      this.leerDB();
   }
   /**
    * Retorna historial capitalizado
    */
   get historialCapitalizado(){
      this.historial.map( lugar => {
         let palabras = lugar.split(' '); 
         palabras = palabras.map( palabra => p[0].toUpperCase() + p.substring(1));

         return palabras.join('');
      })
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

   agregarHistorial(lugar) {

      // Validar Duplicado
      if(this.historial.includes(lugar.toLocaleLowerCase())) {
         return;
      }
      this.historial = this.historial.splice(0, 6); //solo permite 6 opciones
      this.historial.unshift(lugar.toLocaleLowerCase());

      //Grabar en DB o archivo de texto
      this.guardarDB();

   }

   guardarDB(){
      const payload = {
         historial: this.historial
      }
      fs.writeFileSync(this.dbPath, JSON.stringify(payload));
   }

   leerDB() {
      if(fs.existsSync(this.dbPath)) {

         const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
         const data = JSON.parse(info);
         this.historial = data.historial;

      }
   }

}

export { Busquedas }