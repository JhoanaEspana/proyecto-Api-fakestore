/* iniciar tailwind npm run dev */
const API_PRODUCTS = 'https://fakestoreapi.com/products';

const productsContent = document.getElementById('products-content');
const fragment = document.createDocumentFragment();
const templateProduct = document.getElementById('product-template');
const listCategories = document.querySelector('.list-categories-items');

const fetchData = async () => {
  try {
    const res = await fetch(API_PRODUCTS);
    const data = await res.json();
    console.log(data);

    
    
    data.forEach((product) => {
      const clone = templateProduct.content.firstElementChild.cloneNode(true);
      clone.querySelector('img').src = product.image;
      clone.querySelector('h3').textContent = product.title;
      clone.querySelector('.product-category').textContent = product.category;
      clone.querySelector('.product-price').textContent = product.price;
      
      fragment.appendChild(clone);
      
    });
    
    productsContent.appendChild(fragment);
    

  } catch (error) {
    console.log(error);
  } finally {
    console.log();
  }
};

fetchData();


const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_PRODUCTS}/categories`);
    const dataCategori = await res.json();
    console.log(dataCategori);

    dataCategori.forEach(category => {
      const li = document.createElement('li');
      li.classList.add('li-items')
      li.textContent = category;
      listCategories.appendChild(li);

      const filterProductsByCategory = (category) => {
        const products = productsContent.querySelectorAll('.product-item');
        products.forEach(product => {
          if (product.querySelector('.product-category').textContent !== category) {
            product.style.display = 'none';
          }else{
            product.style.display = 'block';
          }
        })
      }

      li.addEventListener('click', () => {
        filterProductsByCategory(li.textContent);
        
      });
    })


  } catch (error) {
    console.log(error);
  } finally {
    console.log();
  }


};

fetchCategories()

