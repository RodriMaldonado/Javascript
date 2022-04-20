
  let carrito = []
  const divisa = '$';
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  

  fetch('/data.json')
  .then((res) => res.json())
  .then((productos) => {
      
  function renderizarProductos()  {
    productos.forEach((producto) => {
      /* Estructura */
      const miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-sm-4');
      /* body */
      const miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
      /* Titulo */
      const miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = producto.nombre;
      /* Imagen */
      const miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-dluid');
      miNodoImagen.setAttribute('src', producto.img);
      /* Precio */
      const miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-precio');
      miNodoPrecio.textContent = `${producto.precio}${divisa}`;
      /* Boton */
      const miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-primary');
      miNodoBoton.textContent = 'Comprar';
      miNodoBoton.setAttribute('marcador', producto.id);
      miNodoBoton.addEventListener('click', agregarProductoAlCarrito);

      /* Append */
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }
  renderizarProductos() 

      
    function agregarProductoAlCarrito(evento) {
      // Agregar nodo al carrito
      carrito.push(evento.target.getAttribute('marcador'))
      /* Sweet Alert */
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 800
      })
      // Actualizamos el carrito 
      renderizarCarrito();
  }

  function renderizarCarrito() {
      
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [... new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el producto que necesitamos 
        const miItem = productos.filter((itemProductos) => {
            // Consultamos ID
             return itemProductos.id == parseInt(item);  
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // Si coincide el id incrementamos, si no mantenemos
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-12');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} -${divisa}${miItem[0].precio}`;  
         // Boton de borrar
         const miBoton = document.createElement('button');
         miBoton.classList.add('btn', 'btn-danger', 'mx-8');
         miBoton.textContent = 'Eliminar';
         miBoton.style.marginLeft = '1rem';
         miBoton.dataset.item = item;
         miBoton.addEventListener('click', borrarItemCarrito);
         // Append
         miNodo.append(miBoton);
         DOMcarrito.append(miNodo);
     });
     // Mostramos el precio total en el HTML
     DOMtotal.textContent = '$'+ calcularTotal();
 }
 
 
  /* Evento para borrar un elemento del carrito */
 function  borrarItemCarrito (evento) {
     // Obtenemos el producto ID que hay en el boton pulsado
     const id = evento.target.dataset.item;
     // Borramos todos los productos
     carrito = carrito.filter((carritoId) => {
         return carritoId !== id;
     });
     // volvemos a renderizar
     renderizarCarrito();
 }
 
 /**
  * Calcula el precio total teniendo en cuenta los productos repetidos
  */
 function calcularTotal() {
     // Recorremos el array del carrito 
     return carrito.reduce((total, item) => {
         // De cada producto obtenemos su precio
         const miItem = productos.filter((itemProductos) => {
             return itemProductos.id == parseInt(item);
         });
         // Los sumamos al total
         console.log(carrito)
         return total + miItem[0].precio;
     }, 0).toFixed(2);
 }
 
 /**
  * Vacia el carrito y vuelve a renderizarlo
  */
 function vaciarCarrito() {
     // Limpiamos los productos guardados
     carrito = [];
     // Renderizamos los cambios
     renderizarCarrito();
 }
 
 // Eventos
 DOMbotonVaciar.addEventListener('click', vaciarCarrito);
});
 

/* Imagenes footer */

let containerFoot = document.getElementById('foot') ; /* Guardamos el div en una variable */
let listaUl = document.createElement("ul"); /* Creamos el elemento ul para la lista */
let listaLi0 = document.createElement("li"); /* Creamos los list para la lista */
let listaLi1 = document.createElement("li");
let listaLi2 = document.createElement("li");

containerFoot.className = 'footer';
listaUl.className = 'list'; /* Le ponemos clase a la lista */

listaLi0.innerHTML = "<a href=https://www.facebook.com/><img src=./img/facebook.png alt=Facebook ></a>" /* Le agregamos contenido a la list */
listaLi1.innerHTML = "<a href=https://www.instagram.com/><img src=./img/instagram.png alt=Instagram></a>"
listaLi2.innerHTML =  "<a href=https://twitter.com/><img src=./img/twitter.png alt=Twitter></a>"

containerFoot.append(listaUl); /* Agregamos div hijos */
listaUl.append(listaLi0);
listaUl.append(listaLi1)
listaUl.append(listaLi2)

/* Texto footer */
let footer = document.getElementById('fotBottom');

let ulList = document.createElement('ul');
let liList0 = document.createElement('li');
let liList1 = document.createElement('li');
let liList2 = document.createElement('li');
let parrafo = document.createElement('p');

footer.className = 'py-3 my-4'
ulList.className = 'nav justify-content-center border-bottom pb-3 mb-3'
parrafo.className = 'text-center text-muted'

liList0.innerHTML = "<a href=# class=nav-link px-2 text-muted>Home</a>"
liList1.innerHTML = "<a href=# class=nav-link px-2 text-muted>Contact</a>"
liList2.innerHTML = "<a href=# class=nav-link px-2 text-muted>Products</a>"
parrafo.innerHTML = "© 2022 Company, Inc"



footer.append(ulList);
footer.append(parrafo);
ulList.append(liList0);
ulList.append(liList1);
ulList.append(liList2); 

