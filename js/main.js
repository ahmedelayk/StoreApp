//Array of products
const mainProductsArray = [{
  name: "Head phones 102",
  price: 250,
  image: "1.jpg",
  addedToCart: false,
}, {
  name: "Head phones 104",
  price: 150,
  image: "2.jpg",
  addedToCart: false,
}, {
  name: "Head phones 103",
  price: 200,
  image: "1.jpg",
  addedToCart: false,
}, {
  name: "Head phones 105",
  price: 150,
  image: "2.jpg",
  addedToCart: false,
}, {
  name: "Head phones 106",
  price: 130,
  image: "1.jpg",
  addedToCart: false,
}, {
  name: "Head phones 107",
  price: 230,
  image: "2.jpg",
  addedToCart: false,
}];
// declare selectors that we need
let nav = document.querySelector("nav");
let section = document.querySelector("#products");
let shoppingIcon = document.querySelector(".shopping-icon");
let addedToCartList = document.querySelector(".added-to-cart-list");
let indicator = document.querySelector(".indicator");
indicator.innerHTML = localStorage.getItem("indicator");
let products = mainProductsArray;
// check if there is data in local storage and get it back
if (window.localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
}else {
  appendProductsToPage(products);
}
loadProductsFromLocalStorage();
// creating elements and draw products to page
function appendProductsToPage(productss) {
  section.innerHTML = "";
  let container = document.createElement("div");
  container.className = "container";
  productss.forEach(element => {
    let card = document.createElement("div");
    card.className = "card";
    let productImage = document.createElement("img");
    productImage.setAttribute("src", `../assets/${element.image}`);
    card.appendChild(productImage);
    let cardContent = document.createElement("div");
    cardContent.className = "card-content";
    let title = document.createElement("h3");
    title.innerHTML = element.name;
    cardContent.appendChild(title);
    let price = document.createElement("span");
    price.innerHTML = `Price : ${element.price} $`;
    cardContent.appendChild(price);
    let btns = document.createElement("div");
    btns.className = "btns";
    let addToCartBtn = document.createElement("button");
    addToCartBtn.className = "add-to-cart-btn";
    addToCartBtn.innerHTML = "add to cart";
    if(element.addedToCart){
      addToCartBtn.innerHTML = "Remove from cart";
      let li = document.createElement("li");
      li.innerHTML = element.name;
      addedToCartList.firstElementChild.appendChild(li);
    }
    btns.appendChild(addToCartBtn);
    let quickViewBtn = document.createElement("button");
    quickViewBtn.className = "quick-view-btn";
    quickViewBtn.innerHTML = "quick view";
    btns.appendChild(quickViewBtn);
    cardContent.appendChild(btns);
    card.appendChild(cardContent);
    container.appendChild(card);
  });
  section.appendChild(container);
}
let card = document.querySelectorAll(".card");
let productsContainer = document.querySelector(".products .container");
card.forEach(function(card){
  card.addEventListener("click", function(event){
    let productName = event.target.parentElement.parentElement.firstChild.innerHTML;
    if(event.target.classList.contains("add-to-cart-btn")){
      products.forEach((product) => {
        if (product.name == productName) {
          // product.addedToCart == true ? product.addedToCart = false : product.addedToCart = true;
          let btn = card.childNodes[1].childNodes[2].firstElementChild;
          if(product.addedToCart === true){
            product.addedToCart = false;
            btn.innerHTML = "add to cart";
            localStorage.setItem("indicator", --indicator.innerHTML);
            // addedToCartList.firstElementChild.removeChild(addedToCartList.firstElementChild);
            addedToCartList.firstElementChild.childNodes.forEach(child =>{
              if(child.innerHTML == productName){
                addedToCartList.firstElementChild.removeChild(child);
              }
            });
          } else {
            product.addedToCart = true;
            btn.innerHTML = "remove from cart";
            localStorage.setItem("indicator", ++indicator.innerHTML);
            let li = document.createElement("li");
            li.innerHTML = productName;
            addedToCartList.firstElementChild.appendChild(li);
          }
          saveProductsToLocalStorage(products);
        }
      });
    }else if(event.target.classList.contains("quick-view-btn")){
      viewProduct(productName);
    }
  });
});
function viewProduct(name){
  products.forEach((product)=>{
    if(product.name === name){
      let productView = document.createElement("div");
      productView.className = "product-view";
      let card = document.createElement("div");
      card.className = "card-view";
      let productImage = document.createElement("img");
      productImage.setAttribute("src", `../assets/${product.image}`);
      card.appendChild(productImage);
      let cardContent = document.createElement("div");
      cardContent.className = "card-content-view";
      let title = document.createElement("h3");
      title.innerHTML = product.name;
      cardContent.appendChild(title);
      let price = document.createElement("span");
      price.innerHTML = `Price : ${product.price} $`;
      cardContent.appendChild(price);
      let btns = document.createElement("div");
      btns.className = "btns-view";
      let addToCartBtn = document.createElement("button");
      addToCartBtn.className = "add-to-cart-btn";
      addToCartBtn.innerHTML = "add to cart";
      if(product.addedToCart){
        addToCartBtn.innerHTML = "Remove from cart";
        let li = document.createElement("li");
        li.innerHTML = product.name;
        addedToCartList.firstElementChild.appendChild(li);
      }
      btns.appendChild(addToCartBtn);
      let quickViewBtn = document.createElement("button");
      quickViewBtn.className = "quick-view-btn";
      quickViewBtn.innerHTML = "Back";
      btns.appendChild(quickViewBtn);
      cardContent.appendChild(btns);
      card.appendChild(cardContent);
      productView.appendChild(card)
      nav.after(productView);
    }
  });
  let productView = document.querySelector(".product-view");
  let productViewCard = document.querySelector(".card-view");
  let image = document.querySelector(".product-view img");
  productView.addEventListener("click", (event)=>{
    if(event.target.classList.contains("quick-view-btn") ){
      productView.style.display = "none";
    }
    let productName = event.target.parentElement.parentElement.firstChild.innerHTML;
    if(event.target.classList.contains("add-to-cart-btn")){
      products.forEach((product) => {
        if (product.name == productName) {
          let btn = productViewCard.childNodes[1].childNodes[2].firstElementChild;
          if(product.addedToCart === true){
            product.addedToCart = false;
            btn.innerHTML = "add to cart";
            localStorage.setItem("indicator", --indicator.innerHTML);
            addedToCartList.firstElementChild.childNodes.forEach(child =>{
              if(child.innerHTML == productName){
                addedToCartList.firstElementChild.removeChild(child);
              }
            });
          } else {
            product.addedToCart = true;
            btn.innerHTML = "remove from cart";
            localStorage.setItem("indicator", ++indicator.innerHTML);
            let li = document.createElement("li");
            li.innerHTML = productName;
            addedToCartList.firstElementChild.appendChild(li);
          }
          saveProductsToLocalStorage(products);
        }
      });
    }
  });
}
shoppingIcon.addEventListener("click", ()=>{
  addedToCartList.classList.toggle("display");
});
function saveProductsToLocalStorage(products){
  localStorage.setItem("products", JSON.stringify(products));
}
function loadProductsFromLocalStorage(){
  let savedProducts = localStorage.getItem("products");
  if(savedProducts){
    let products = JSON.parse(savedProducts);
    appendProductsToPage(products);
  }
}

