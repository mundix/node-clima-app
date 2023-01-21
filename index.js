import * as dotenv from 'dotenv';
dotenv.config()

import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";
import colors from 'colors';

console.log(process.env.MAPBOX_KEY);

const main = async () => {
   const busquedas = new Busquedas();
   let opt = '';


   do {
      opt = await inquirerMenu();
      
      switch (opt) {
         case 1:
            // Mostrar mensaje
            const lugar = await leerInput('Ciudad:  ');
            busquedas.ciudad(lugar);
            // Buscar los Lugagres
            
            // Seleccionar el lugar
            
            //Clima
            
            //Mostrar resultados
            console.log('\n Informacion de la ciudad\n'.green);
            console.log('ciudad:', );
            console.log('lat:', );
            console.log('lng:', );
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