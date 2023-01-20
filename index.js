
import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js"

const main = async () => {
   // const text = await leerInput('Hola:'.green);
   // console.log(text);
   let opt = '';
   do {
      // console.clear();
      opt = await inquirerMenu();
      console.log({opt} );
      console.log('\n');
      if( opt !==0 ) await pausa();
   }while(opt !== 0) 
}

main();