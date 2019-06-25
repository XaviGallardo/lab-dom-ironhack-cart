function deleteItem(event) {
  const toDelete = event.target.parentNode.parentNode;

  const products = document.querySelector(".wrapper");
  const productPrice = document.querySelector(".product--total--price")
    .innerHTML;

  products.removeChild(toDelete);
  totalPriceChart2 = getTotalPrice();

  document.querySelector(
    ".total-price-result h2 span"
  ).innerHTML = totalPriceChart2;
}

function getPriceByProduct(itemNode) {
  let totalPrice = itemNode.getElementsByClassName("product--total--price")[0]
    .innerHTML;

  return Number(totalPrice);
}
function updatePriceByProduct(productPrice, index) {
  const unitPrice = productPrice.getElementsByClassName("product--price")[0]
    .innerHTML;

  const totalUnits = productPrice.getElementsByTagName("input")[0].value;

  let itemPrice = Number(totalUnits) * Number(unitPrice);

  let totalPrice = productPrice.getElementsByClassName(
    "product--total--price"
  )[0];

  totalPrice.innerHTML = `${itemPrice}`;
}

function getTotalPrice() {
  const elements = document.getElementsByClassName("product--total--price");
  let totalPrice = 0;
  for (let index = 0; index < elements.length; index++) {
    totalPrice += Number(elements[index].innerHTML);
  }
  return totalPrice;
}

function createQuantityInput() {
  const div = document.createElement("div");
  div.innerHTML = `<div>$<span class="product--total--price">0.00</span></div>`;

  return div;
}

function createDeleteButton() {
  const div = document.createElement("div");
  div.innerHTML = `<button class="btn-delete">Delete</button>`;
  div.querySelector("button").addEventListener("click", deleteItem);
  return div;
}

function createQuantityNode() {
  const div = document.createElement("div");
  div.innerHTML = `<label>QTY
    <input type="text" id="Name" name="Name" placeholder="How many units?"></label>`;

  return div;
}

function createItemNode(dataType, itemData) {}

function createNewItemRow(itemName, itemUnitPrice) {
  const div = document.createElement("div");
  div.classList.add("wrapper--product");
  div.innerHTML =
    `<div class="wrappper--product-name">
        <span class="product--name">` +
    itemName +
    `</span>
    </div> 
    <div>$
      <span class="product--price">` +
    itemUnitPrice +
    `</span>
    </div>`;
  div.append(createQuantityNode());
  div.append(createQuantityInput());
  div.append(createDeleteButton());

  return div;
}

function createNewItem() {
  let newProductName = document.getElementById("newProductName").value;

  let newProductPrice = document.getElementById("newProductPrice").value;
  const product = createNewItemRow(newProductName, newProductPrice);
  document.querySelector(".wrapper").append(product);
  document.getElementById("newProductName").value = "";
  document.getElementById("newProductPrice").value = "";
}

function calculatePrice() {
  const unitPrice = document.getElementsByClassName("product--price")[0]
    .innerHTML;

  const totalUnits = document.getElementsByTagName("input")[0].value;

  let itemPrice = Number(totalUnits) * Number(unitPrice);

  let totalPrice = document.getElementsByClassName("product--total--price")[0];

  totalPrice.innerHTML = `${itemPrice}`;
}
window.onload = function() {
  var calculatePriceButton = document.getElementById("calc-prices-button");
  // var createItemButton = document.getElementById('new-item-create');
  // var deleteButtons = document.getElementsByClassName('btn-delete');
  // calculatePriceButton.onclick = getTotalPrice;
  // createItemButton.onclick = createNewItem;
  // for(var i = 0; i<deleteButtons.length ; i++){
  //   deleteButtons[i].onclick = deleteItem;
  // }

  const newProductName = document.getElementById("newProductName");
  const newProductPrice = document.getElementById("newProductPrice");

  const buttonDelete = document.querySelectorAll(".btn-delete");

  for (let index = 0; index < buttonDelete.length; index++) {
    const button = buttonDelete[index];
    button.addEventListener("click", deleteItem);
  }

  const buttonCreate = document.querySelector(".section--create button");

  buttonCreate.addEventListener("click", createNewItem);

  const buttonCalculatePrice = document.querySelector(".btn-success");
  buttonCalculatePrice.addEventListener("click", calculatePrices);

  function calculatePrices() {
    const productList = document.getElementsByClassName("wrapper--product");
    let totalPriceChart = 0;
    for (let index = 0; index < productList.length; index++) {
      const element = productList[index];

      updatePriceByProduct(element, index);

      totalPriceChart += getPriceByProduct(element);
    }

    // Other way to resume the Total Price

    let totalPriceChart2 = getTotalPrice();

    document.querySelector(
      ".total-price-result h2 span"
    ).innerHTML = totalPriceChart2;
  }
};
