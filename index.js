
import { leerInput } from "./helpers/inquirer.js"

const main = async () => {
   const text = await leerInput('Hola:'.green);
   console.log(text);
}

main();