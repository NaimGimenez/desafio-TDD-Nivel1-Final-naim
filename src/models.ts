import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}


type SearchOptions = { title?: string; tag?: string };



class PelisCollection {
  async getAll(): Promise<Peli[]> {
    
      const data = await jsonfile.readFile(__dirname+"/pelis.json");
    return data 
  }
   async getById(id:number):Promise<Peli>{
    const peliculas = await this.getAll(); // Obtiene todas las películas
    const idEncontrado = peliculas.find((movie) => movie.id === id); // Busca la película por ID
    return idEncontrado; 
    
   }
   async add(peli:Peli):Promise<boolean>{
    const peliculas = await this.getAll();
    
    const promesaUno = this.getById(peli.id).then((peliexistente)=>{
      if (peliexistente){
        return false;
      }else {
        // Agrega la nueva película al array
        peliculas.push(peli); // Aquí es donde agregas la nueva película
    
        // Escribe el nuevo array en el archivo
        const promesaDos= jsonfile.writeFile(__dirname+"/pelis.json", peliculas);
        return true; // Devuelve true si se agregó correctamente
      }
      
    })
    return promesaUno;
   }

   async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll(); // Obtiene todas las películas
  
    const listaFiltrada = lista.filter((peli) => {
      let coincide = true; // Asumimos que coincide
  
      if (options.title) {
        coincide = coincide && peli.title.toLowerCase().includes(options.title.toLowerCase());
      }
  
      if (options.tag) {
        coincide = coincide && peli.tags.includes(options.tag);
      }
  
      return coincide; // Devuelve true si coincide con los criterios de búsqueda
    });
  
    return listaFiltrada; // Devuelve las películas filtradas
  }
  
  }


// function main(){
//   const peli = new PelisCollection();
//   peli.add({id: 5,
//     title: "naiara gimenez ",
//     tags: ["accion"]}).then((err)=>{
//       console.log(`ya existe:${err}`)
//     }).catch((resultado)=>{
//       console.log(`creado con exito:${resultado}`)
//     })
  
// }
// main();
export { PelisCollection, Peli };
