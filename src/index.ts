import minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection } from "./models";

// Función para parsear los parámetros de la línea de comandos
function parseaParams(argv) {
  return minimist(argv);
}

// Se corrige el uso de slice para obtener los argumentos
const terminal = parseaParams(process.argv.slice(2));
const controller = new PelisController();

async function main() {
  // Verifica si el comando es "add"
  if (terminal._[0] === "add") {
    // Validación de parámetros
    if (!terminal.id || !terminal.title) {
      console.error("Faltan parámetros obligatorios: id y title.");
      return;
    }

    const nuevaPeli = {
      id: parseInt(terminal.id, 10), // Convierte el ID a número
      title: terminal.title, // Obtiene el título desde los argumentos
      tags: terminal.tags || [], // Obtiene las etiquetas, o un array vacío si no hay
    };

    try {
      // Llama al método para agregar la nueva película
      const resultado = await controller.add(nuevaPeli);
      if (resultado) {
        console.log("Película agregada exitosamente:", nuevaPeli);
      } else {
        console.log("No se pudo agregar la película. Puede que el ID ya exista.");
      }
    } catch (error) {
      console.error("Error al agregar la película:", error.message);
    }
    return; // Salimos de la función para evitar mensajes de otros comandos
  }

  // Verifica si el comando es "get"
  if (terminal._[0] === 'get') {
    const id = parseInt(terminal._[1], 10); // Obtiene el ID desde los argumentos

    try {
      const pelicula = await controller.get({ id }); // Llama al método para obtener la película
      if (pelicula) {
        console.log("Película encontrada:", pelicula);
      } else {
        console.log("No se encontró ninguna película con el ID:", id);
      }
    } catch (error) {
      console.error("Error al buscar la película:", error.message);
    }
    return; // Salimos de la función para evitar mensajes de otros comandos
  }

  // Verifica si el comando es "search"
  if (terminal._[0] === 'search') {
    if (terminal.title) {
      const title = terminal.title; // Obtenemos el título del argumento
      try {
        const pelis = await controller.get({ search: { title } }); // Llamamos al método get del controlador
        console.log(`Estas son las películas que buscas con el título que ingresaste:`, pelis); // Mostramos las películas encontradas
      } catch (error) {
        console.error('Error al buscar películas:', error);
      }
      return; // Salimos de la función para evitar mensajes de otros comandos
    }

    if (terminal.tag) {
      const tag = terminal.tag; // Obtenemos el tag del argumento
      try {
        const pelis = await controller.get({ search: { tag } }); // Llamamos al método get del controlador
        console.log(`Estas son las películas con el tag que buscas:`, pelis); // Mostramos las películas encontradas
      } catch (error) {
        console.error('Error al buscar películas:', error);
      }
      return; // Salimos de la función para evitar mensajes de otros comandos
    }
  }

  // Si no se reconoce el comando, no se imprime nada
}

// Ejecuta la función principal
main();
