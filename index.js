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
            const lugarSel = lugares.find( lugar => lugar.id === id);

            //Clima
            
            //Mostrar resultados
            console.log('\n Informacion de la ciudad\n'.green);
            console.log('ciudad:', lugarSel.nombre);
            console.log('lat:', lugarSel.lat);
            console.log('lng:', lugarSel.lng);
            console.log('Temperatura:', );
            console.log('Minima:', );
            console.log('Maxima:', );
            break;
      
         default:
            break;
      }

      if( opt !==0 ) await pausa();
   }while(opt !== 0) 
}

main();