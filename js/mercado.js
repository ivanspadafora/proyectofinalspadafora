let productosEnCarrito = [];
const contenedorElect = document.querySelector("#contenedor-elect");
const contadorCarrito = document.querySelector("#contador-carrito");
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
let productos;

let total = 0;

function mostrarProductos() {
    fetch("../productos.json")
    .then((res) => res.json())
    .then((data) => {
      productos = data
      productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.classList.add("col-lg-3");
        div.innerHTML = `
            <div class="card shadow card-elect">
                <img src="${producto.imagen}" class="card-img-top img-elect" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title titulo-elect">${producto.nombre}</h5>
                    <p class="precio-elect">${producto.color}</p>
                    <p class="precio-elect">$${producto.precio}</p>
                    <button class="btn-card boton-agregar-elect" id=${producto.id}><span>Agregar</span></button>
                </div>
            </div>
          `;

        contenedorElect.append(div);
      });

        const botonesAgregar = document.querySelectorAll(".boton-agregar-elect");
  
        if (productosEnCarritoLS) {
          productosEnCarrito = JSON.parse(productosEnCarritoLS);
          actualizarContadorCarrito();
        } else {
          productosEnCarrito = [];
        }
  
        botonesAgregar.forEach(boton => {
          boton.addEventListener("click", agregarProdAlCarrito);
        });
      })
      .catch(error => {
        console.log("Error al cargar productos:", error);
      });
  }

function agregarProdAlCarrito(e) {
    
    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #646566, #030303)",
          borderRadius: "1rem",
          textTransform: "uppercase"
        },
        offset: {
            x: '4rem', 
            y: '2rem' 
          },
        onClick: function(){} 
    }).showToast();
    
    const idBoton = e.currentTarget.id;
    const productoAgregar = productos.find(producto => producto.id == idBoton);

    if(productosEnCarrito.some(producto => producto.id == idBoton)) {
        const i = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[i]. cantidad++;
    } else {
        productoAgregar.cantidad = 1;
        productosEnCarrito.push(productoAgregar);
    }
    
    actualizarContadorCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));    
};

function actualizarContadorCarrito() {
    let contador = productosEnCarrito.reduce((acu, producto) => acu + producto.cantidad, 0);
    contadorCarrito.innerHTML = contador;
};
 
/************************************************************************************************************/
 
mostrarProductos();
const botonesAgregar = document.querySelectorAll(".boton-agregar-elect");
                            
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContadorCarrito();
} else {
    productosEnCarrito = [];
}

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarProdAlCarrito);
});