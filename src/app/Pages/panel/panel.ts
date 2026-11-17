import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoInput, Productos } from '../../models/producto.model';
import { Producto, Producto as ProductoService } from '../../Services/producto';





@Component({
  imports: [FormsModule],
  selector: 'app-panel',
  styleUrl: './panel.css',
  templateUrl: './panel.html',
})
export class Panel {
  productos = signal<Productos[]>([]);
  editingId = signal<number | null>(null);
service = inject(ProductoService);
  productService: any;
  editando = signal<Productos | null>(null);
  categories = signal<string[]>([]);
  ;


  ngOnInit(): void {
    this.cargarProductos();
    this.service.getCategories().subscribe((data) => this.categories.set(data));
  }


  cargarProductos() {
    
    this.service.obtenerProducto().subscribe({
      next: (data) => {
        this.productos.set(data);
      },
    });
  }

  // Datos del formulario, enlazados con ngModel
  form: ProductoInput = { title: '', price: 0, description: '', category: '', image: '' };

 save(): void {
    

    if (!this.form.title || !this.form.category || !this.form.image || this.form.price <= 0) {
      return;
    }


    const id = this.editingId();
    if (id === null) {
      this.create();
    } else {
      this.update(id);
    }
  }

// CREATE: agregar un producto
  private create(): void {
    this.service.crearproducto(this.form).subscribe({
      next: (product) => {
        this.productos.update((list) => [product, ...list]);
        this.cancel();
      },
    });
  }


  // UPDATE: guardar los cambios de un producto
  private update(id: number): void {
    this.service.actualizarProducto(id, this.form).subscribe({
      next: (product) => {
        this.productos.update((list) =>
          list.map((item) => (item.id === id ? { ...item, ...product } : item))
        );
        this.cancel();
      },
    });
  }


  // Llena el formulario con el producto que se va a editar
  edit(product: Productos): void {
    this.editingId.set(product.id);
    this.form = { ...product };
  }


  // Limpia el formulario y sale del modo edición
  cancel(): void {
    this.editingId.set(null);
    this.form = { title: '', price: 0, description: '', category: '', image: '' };
  }

  borrar(id: number) {
    if (!confirm('¿Eliminar este producto?')) return;


    this.service.eliminarProducto(id).subscribe({
      next: () => {
        this.productos.update((lista) => lista.filter((p) => p.id !== id));
      },
    });
  }


  actualizar(producto: Productos  ) {
    this.editando.set({ ...producto });
  }


  cancelar() {
    this.editando.set(null);
  }


  guardar() {
    const p = this.editando();
    if (!p) return;


    this.service.actualizarProducto(p.id, p).subscribe({
      next: () => {
        this.productos.update((lista) => lista.map((x) => (x.id === p.id ? p : x)));
        this.editando.set(null);
      },
    });
  }
}
