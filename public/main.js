/* iniciar tailwind npm run dev */
const API_PRODUCTS = 'https://fakestoreapi.com/products';

const productsContent = document.getElementById('products-content');
const fragment = document.createDocumentFragment();
const templateProduct = document.getElementById('product-template');
const listCategories = document.querySelector('.list-categories-items');

const fetchData = async () => {
  try {
    const resData = await fetch(API_PRODUCTS);
    const data = await resData.json();

    data.map((product) => {
      const clone = templateProduct.content.firstElementChild.cloneNode(true);
      clone.querySelector('img').src = product.image;
      clone.querySelector('h3').textContent = product.title;
      clone.querySelector('.product-category').textContent = product.category;
      clone.querySelector('.product-price').textContent = product.price;

      fragment.appendChild(clone);
    });

    productsContent.appendChild(fragment);

    const resCategori = await fetch(`${API_PRODUCTS}/categories`);
    const dataCategori = await resCategori.json();

    // render lista de categorias
    dataCategori.map((category) => {
      const li = document.createElement('li');
      li.classList.add('li-items');
      li.textContent = category;
      listCategories.appendChild(li);

      li.addEventListener('click', () => {
        filterProductsByCategory(li.textContent);
      });

      const liAll = document.querySelector('#li-All');

      liAll.addEventListener('click', () => {
        const products = productsContent.querySelectorAll('.product-item');

        products.forEach((product) => {
          product.style.display = 'block';
        });
      });
    });

    ///////////// CATCH ERROR Y FINALY /////////////
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Todo ok');
  }
};
// funcion para ocultarlo o mostrar img de categorias
const filterProductsByCategory = (category) => {
  const products = productsContent.querySelectorAll('.product-item');
  products.forEach((product) => {
    if (product.querySelector('.product-category').textContent !== category) {
      product.style.display = 'none';
    } else {
      product.style.display = 'block';
    }
  });
};

// funcion para buscar un producto segun su nombre
const formSearch = document.querySelector('.form-search');

formSearch.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  const products = productsContent.querySelectorAll('.product-item');
  products.forEach((product) => {
    if (
      !product
        .querySelector('h3')
        .textContent.toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      product.style.display = 'none';
    } else {
      product.style.display = 'block';
    }
  });
});

fetchData();
