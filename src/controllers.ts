import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
lista :PelisCollection
  constructor() {
this.lista = new PelisCollection()
  }
 async get(options?:Options):Promise<any>{
  
  try {
    // Si se proporciona un ID, busca la película por ese ID
    if (options?.id) {
      const idEncontrado = await this.lista.getById(options.id);
      if (!idEncontrado) {
        throw new Error(`Película no encontrada con ID: ${options.id}`);
      }
      return idEncontrado; // Devuelve la película encontrada
    }

    // Si se proporciona un objeto de búsqueda
    if (options?.search) {
      const { title, tag } = options.search;
      const todasLasPeliculas = await this.lista.getAll(); // Obtiene todas las películas

      // Filtra por título si se proporciona
      let peliculasFiltradas = todasLasPeliculas;
      if (title) {
        peliculasFiltradas = peliculasFiltradas.filter(peli => 
          peli.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      // Filtra por tag si se proporciona
      if (tag) {
        peliculasFiltradas = peliculasFiltradas.filter(peli => 
          peli.tags.includes(tag)
        );
      }

      return peliculasFiltradas; // Devuelve las películas filtradas
    }

    // Si no se proporciona ningún parámetro, devuelve todas las películas
    return await this.lista.getAll();
  } catch (error) {
    console.error("Error en la búsqueda de la película:", error.message);
    throw error; // Vuelve a lanzar el error
  }
}
async add(peli:Peli){
   const agregarPeli = await this.lista.add(peli);
   if(agregarPeli){
    return agregarPeli;
   }else{
    throw new Error("Hubo un error al agregar la pelicula.Intente nuevamente")
   }
}
}
function main(){
  // const controll = new PelisController()
  // controll.add({id: 4,
  //   title: "ramiro gonzalez",
  //   tags: ["comedia"]}).then()
}
main()
export { PelisController };
