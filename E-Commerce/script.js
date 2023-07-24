'use strict';
const formSearch = document.querySelector('.search');
const modalCart = document.querySelector('.modal-cart');
const modalPurchased = document.querySelector('.purchased-modal');
const overlay = document.querySelector('.overlay');
const cartBtn = document.querySelector('.cart-btn');
const purchasedBtn = document.querySelector('.purchased-btn');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnCloseModal2 = document.querySelector('.btn--close-modal2');
const scrollList = document.querySelector('.scroll-list');
const wholeProdDesc = document.querySelector('.whole-product-desc');
const productList = document.querySelector('.product-list');
const searchBox = document.querySelector('#search-box');
const buyBtn = document.querySelector('.buy-product-page');
const addToBtn = document.querySelector('.add-to-cart-product-page');
const wholeCartList = document.querySelector('.whole-cart-list');
const cartListScroll = document.querySelector('.cart-list-scroll');
const wholePurchasedList = document.querySelector('.whole-purchased-list');
const purchasedListScroll = document.querySelector('.purchased-list-scroll');

const getJSON = async function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// MODAL
const openModal = function (e) {
  // e.preventDefault();
  modalCart.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modalCart.classList.add('hidden');
  overlay.classList.add('hidden');
};

cartBtn.addEventListener('click', function () {
  openModal();
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalCart.classList.contains('hidden')) {
    closeModal();
  }
});

const purchasedModalOpen = function () {
  modalPurchased.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const purchasedModalclose = function () {
  modalPurchased.classList.add('hidden');
  overlay.classList.add('hidden');
};

purchasedBtn.addEventListener('click', function () {
  purchasedModalOpen();
});

btnCloseModal2.addEventListener('click', purchasedModalclose);
overlay.addEventListener('click', purchasedModalclose);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalPurchased.classList.contains('hidden')) {
    purchasedModalclose();
  }
});

const link = async function () {
  const res = await fetch('https://dummyjson.com/products');
  // const res = await fetch('https://dummyjson.com/products/categories');
  const data = await res.json();
};
link();

const state = {
  products: {},
  search: {
    query: '',
    results: [],
  },
  addToCart: [],
  purchased: [],
};

/////////////////
// Show Data
///////////////
const showData = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    let prod = data;

    prod = {
      brand: prod.brand,
      category: prod.category,
      description: prod.description,
      discount: prod.discountPercentage,
      id: prod.id,
      images: prod.images,
      price: prod.price,
      rating: prod.rating,
      stock: prod.stock,
      title: prod.title,
      ...(prod.key && { key: prod.key }),
    };
    state.products = prod;

    document.querySelector('.buy-add-to-cart').classList.remove('hidden');
    // Rendering recipe
    wholeProdDesc.innerHTML = '';
    const markup = `<div class="product-actual-img">
    <img src="${prod.images[0]}" class="actual-product" alt="${prod.title}" />
  </div>
  <div class="product-actual-details">
    <span class="p-details"><strong>${prod.title}</strong></span>
    <span class="p-details"><strong>Discount: </strong>${prod.discount}%</span>
    <span class="p-details"><strong>Brand: </strong>${prod.brand}</span>
    <span class="p-details"
      ><strong
        >${prod.description}</strong
      ></span
    >
    <span class="p-details"><strong>Stock: </strong>${prod.stock}</span>
    <span class="p-details"><strong>Price: </strong>Rs ${Math.round(
      prod.price * 82.6775
    )}</span>
    <span class="p-details"><strong>Rating: </strong>${prod.rating}⭐</span>
    <span class="p-details"
      ><strong>Category: </strong>${prod.category}</span
    >

</div>`;
    wholeProdDesc.insertAdjacentHTML('afterbegin', markup);
    state.addToCart.push(prod);
    state.purchased.push(prod);
    console.log(state.purchased);

    ///////////////////////////////////
    /////////////////////////////////
    // CART COntainer
    addToBtn.addEventListener('click', function (e) {
      e.preventDefault();
      state.addToCart.forEach(prod => {
        state.addToCart = [];
        wholeCartList.innerHTML = '';
        const markup = `
        
        <li class="cart-list">
        <a href="#" class="cart-link">
        <div class="whole-cart-product-desc grid-2">
        <div class="product-actual-img">
        <img src="${prod.images[0]}" class="cart-products-img" />
        </div>
        <div class="product-actual-details cart-products">
        <span class="cart-p-details"><strong>${prod.title}</strong></span>
        
                <span class="cart-p-details"
                  ><strong>Brand: </strong>${prod.brand}</span
                >
                
                <span class="cart-p-details"><strong>Price: </strong>Rs${Math.round(
                  prod.price * 82.6775
                )}</span>
                
                <span class="cart-p-details"
                ><strong>Category: </strong>${prod.category}</span
                >
                </div> 
                </div>
                </a>
                </li>
                
                `;
        cartListScroll.insertAdjacentHTML('beforeend', markup);
      });
    });
    ///////////////////////////////////
    /////////////////////////////////
    // Purchased Container
    buyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      state.purchased.forEach(prod => {
        state.purchased = [];
        wholePurchasedList.innerHTML = '';
        const markup = `
        
        <li class="purchased-list">
            <div class="whole-purchased-product-desc grid-2">
              <div class="product-actual-img">
                <img src="${prod.images[0]}" class="purchased-products-img" />
              </div>
              <div class="product-actual-details purchased-products">
                <span class="purchased-p-details"><strong>${
                  prod.title
                }</strong></span>

                <span class="purchased-p-details"
                ><strong>Brand: </strong>${prod.brand}</span
                >
                <span class="purchased-p-details"><strong>Price: </strong>Rs${Math.round(
                  prod.price * 82.6775
                )}</span>
                <span class="purchased-lbl purchased-p-details">Purchased</span>
              </div>
            </div>
          </li>
                
                `;
        purchasedListScroll.insertAdjacentHTML('beforeend', markup);
      });
    });

    if (!res.ok)
      throw new Error(`cannot found the product 🚫🚫: ${res.status}`);
  } catch (error) {
    console.error(error);
  }
};
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showData));
// window.addEventListener('hashchange', showData);
// window.addEventListener('load', showData);

/////////////////
// Load Search Result
///////////////
const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(
      `https://dummyjson.com/products/search?q=${query}`
    );

    state.search.results = data.products.map(prod => {
      return {
        brand: prod.brand,
        category: prod.category,
        description: prod.description,
        discount: prod.discountPercentage,
        id: prod.id,
        images: prod.images,
        price: prod.price,
        rating: prod.rating,
        stock: prod.stock,
        title: prod.title,
      };
    });

    state.search.results

      .map(prod => {
        scrollList.innerHTML = '';
        const markup = `
  
        <li class="results-list">
                <div class="results">
                  <div class="product-img">
                    <img src="${prod.images[0]}" class="product" />
                  </div>
                  <div class="product-details">
                    <p class="title p-details">${prod.title}</p>
                    <p class="description p-details">
                      ${prod.description}
                    </p>
                    <p class="price p-details">
                      <span><strong>Price:</strong> Rs ${Math.round(
                        prod.price * 82.6775
                      )}</span>
                    </p>
                    <p class="rating p-details">
                      <span><strong>Rating:</strong> ${prod.rating} ⭐</span>
                    </p>
                    <p class="category p-details">
                      <span><strong>Category:</strong> ${prod.category}</span>
                    </p>
                    <a href="#${
                      prod.id
                    }" class="buy-product"><span> Buy</span></a>
                  </div>
                </div>
              </li>
        `;
        productList.insertAdjacentHTML('afterbegin', markup);
      })
      .join('');
  } catch (error) {
    console.error(error);
  }
};

////////////////
// Search View
///////////////
const getQuery = function () {
  const query = formSearch.querySelector('#search-box').value;
  formSearch.querySelector('#search-box').value = '';

  return query;
};

const searchResult = async function () {
  try {
    // 1)get search query
    const query = getQuery();
    if (!query) return;
    // 2) Load Search
    loadSearchResults(query);
    // Render Result
  } catch (error) {
    console.error(error);
  }
};
searchResult();

const addHandlerSearch = function (handler) {
  formSearch.addEventListener('submit', function (e) {
    e.preventDefault();
    handler();
  });
};
addHandlerSearch(searchResult);
