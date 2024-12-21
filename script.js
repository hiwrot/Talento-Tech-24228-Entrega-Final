const saveToLocalStorage = () => {
    localStorage.setItem('productos', JSON.stringify(allProductos));
};

const removeFromLocalStorage = (k) => {
    localStorage.removeItem('productos', JSON.stringify(allProductos));
};

document.addEventListener('DOMContentLoaded', () => {
    allProductos = JSON.parse(localStorage.getItem('productos')) || [];
    showHTML();
});

document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregarCarrito = document.querySelectorAll('.btn-add-carrito');
    
    botonesAgregarCarrito.forEach((boton) => {
        boton.addEventListener('click', () => {
            alert('Producto añadido al Carrito');
        });
    });
});

const btnCart = document.querySelector('.container-carrito-icono');
const containerCarritoProductos = document.querySelector('.container-carrito-productos');

btnCart.addEventListener('click', () => {
    containerCarritoProductos.classList.toggle('ocultar-carrito');
    removeFromLocalStorage('')
});

const cartInfo = document.querySelector('.carrito-productos');
const rowProducto = document.querySelector('.row-producto');

const productosLista = document.querySelector('.container-boosters');

let allProductos = [];

const valorTotal = document.querySelector('.total-pagar');
const contadorProductos = document.querySelector('#contador-carrito');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.carrito-total');


productosLista.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-carrito')) {
        const product = e.target.parentElement;

        const infoProducto = {
            quantity: 1,
            title: product.querySelector('h3').textContent,
            precio: product.querySelector('.precio').textContent,
        };

        const existente = allProductos.some(product => product.title === infoProducto.title
        );

        if (existente) {
            const productos = allProductos.map(product => {
                if (product.title === infoProducto.title) {
                    product.quantity++;
                    return product;
                }else {
                    return product;
                }
            });
            allProductos = [...productos];
        }else {
            allProductos = [...allProductos, infoProducto];
            saveToLocalStorage();
        }

        showHTML();
    }
});

rowProducto.addEventListener('click', (e) => {
    if(e.target.classList.contains('icono-cerrar')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProductos = allProductos.filter(product => product.title !== title);

        console.log(allProductos);

        showHTML();
    }
});

const showHTML = () => {
    if (!allProductos.length) {
        cartEmpty.classList.remove('hidden');
        rowProducto.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProducto.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProducto.innerHTML = '';

    let total = 0;
    let totalProductos = 0;

    allProductos.forEach(product => {
            const containerProductos = document.createElement('div');
            containerProductos.classList.add('carrito-productos');

            containerProductos.innerHTML = `
                <div class="info-producto-carrito">
                    <span class="cantidad-producto">${product.quantity}</span>
                    <p class="titulo-producto">${product.title}</p>
                    <span class="precio-producto">${product.precio}</span>
                </div>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="icono-cerrar"
                >
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            `;

            rowProducto.append(containerProductos);

            total = total + parseFloat(product.quantity * product.precio.slice(1));
            totalProductos = totalProductos + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    contadorProductos.innerText = totalProductos;
};
