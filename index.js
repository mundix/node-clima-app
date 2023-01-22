import * as dotenv from 'dotenv';
dotenv.config()

import { inquirerMenu, leerInput, pausa, listarLugares } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";
import colors from 'colors';

const main = async () => {
   const busquedas = new Busquedas();
   let opt = '';
   console.clear();

   do {
      opt = await inquirerMenu();
      
      switch (opt) {
         case 1:
            // Mostrar mensaje
            const termino = await leerInput('Ciudad:  ');
            
            // Buscar los Lugagres
            const lugares = await  busquedas.ciudad(termino);
            
            // Seleccionar el lugar
            const id = await listarLugares(lugares);
            if(id === '0') continue;

            const lugarSel = lugares.find( lugar => lugar.id === id);

            // GUardar en DB el nombre es lo que voy a grabar.
            busquedas.agregarHistorial(lugarSel.nombre);

            // Clima
            const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
            const { desc, min, max, temp} = clima;

       


            // Mostrar resultados
            console.log('\n Informacion de la ciudad\n'.green);
            console.log('ciudad:', lugarSel.nombre);
            console.log('lat:', lugarSel.lat);
            console.log('lng:', lugarSel.lng);
            console.log('Temperatura:', temp);
            console.log('Minima:', min);
            console.log('Maxima:', max);
            console.log('Como está el clima:', colors.yellow(desc));
            break;

         case 2:
            busquedas.historial.forEach( (lugar, index) => {
               const idx = `${index + 1}.` .green;
               console.log( ` ${idx} ${lugar}`);
            })
            break;
      
         default:
            break;
      }

      if( opt !==0 ) await pausa();
   }while(opt !== 0) 
}

main();