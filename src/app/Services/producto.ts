import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Observable } from "rxjs";
import {Productos as ModeloProductos, ProductoInput, Productos} from "../models/producto.model"


@Service()
export class Producto {
    private readonly url = 'https://fakestoreapi.com/products'

    private readonly http = inject(HttpClient)

    obtenerProducto():Observable<ModeloProductos[]>
    {
        return this.http.get<ModeloProductos[]>(this.url);
    }

    //CREAR PRODUCTO 
    crearproducto (producto :ProductoInput){
        return this.http.post<Productos>(this.url, producto);

    }
    actualizarProducto(id:number, producto:ProductoInput){

        return this.http.put<Productos>(`${this.url}/${id}`, producto);
   
    }

    //eliminar producto
    eliminarProducto(id:number){
        return this.http.delete(`${this.url}/${id}`);
    }

     getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`);
  }

}
