let items = [];

const nameInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const addItemButton = document.getElementById("add-item-button");
const shoppingList = document.getElementById("shopping-list");
const clearListButton = document.getElementById("clear-list-button");
const totalPriceDisplay = document.getElementById("total-price");

function renderList() {
  shoppingList.innerHTML = "";

  let totalPrice = 0;

  items.forEach((item, index) => {
    const li = document.createElement("li");

    if (item.purchased) {
      li.classList.add("purchased");
    }

    li.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>Ksh ${item.price}</p>
        <button onclick="togglePurchased(${index})">
          ${item.purchased ? "Mark as Unpurchased" : "Mark as Purchased"}
        </button>
      </div>
    `;

    // Append to list container
    shoppingList.appendChild(li);

    // Calculate total price for purchased items
    if (item.purchased) {
      totalPrice += Number(item.price);
    }
  });

  totalPriceDisplay.textContent = totalPrice;
}

function addItem() {
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();

  if (name === "" || price === "") {
    alert("Please enter both a name and a price.");
    return;
  }

  const newItem = {
    name: name,
    price: Number(price),
    purchased: false,
  };

  items.push(newItem);

  nameInput.value = "";
  priceInput.value = "";

  renderList();
}

function togglePurchased(index) {
  items[index].purchased = !items[index].purchased;
  renderList();
}

function clearList() {
  items = [];
  renderList();
}

addItemButton.addEventListener("click", addItem);
clearListButton.addEventListener("click", clearList);
