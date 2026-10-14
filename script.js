// 1. Load items from localStorage on startup, or initialize an empty array
let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

// 2. Select DOM elements
const nameInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const addItemButton = document.getElementById("add-item-button");
const shoppingList = document.getElementById("shopping-list");
const clearListButton = document.getElementById("clear-list-button");
const totalPriceDisplay = document.getElementById("total-price");

// 3. Save current items array to localStorage
function saveToLocalStorage() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// 4. Render function to draw the list on screen
function renderList() {
  shoppingList.innerHTML = "";
  let totalPrice = 0;

  items.forEach((item, index) => {
    const li = document.createElement("li");

    // Add 'purchased' class if marked true
    if (item.purchased) {
      li.classList.add("purchased");
    }

    li.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>Ksh ${item.price}</p>
        <button onclick="togglePurchased(${index})">
          ${item.purchased ? "Mark Unpurchased" : "Mark Purchased"}
        </button>
        <button onclick="editItem(${index})">Edit</button>
      </div>
    `;

    shoppingList.appendChild(li);

    // Add to total if purchased (or remove 'if' condition if you want total of all items)
    if (item.purchased) {
      totalPrice += Number(item.price);
    }
  });

  // Update total display
  totalPriceDisplay.textContent = totalPrice;

  // Persist changes to local storage
  saveToLocalStorage();
}

// 5. Add a new item
function addItem() {
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();

  if (name === "" || price === "") {
    alert("Please enter both an item name and price.");
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

// 6. Toggle purchased state
function togglePurchased(index) {
  items[index].purchased = !items[index].purchased;
  renderList();
}

// 7. Edit an existing item's name or price
function editItem(index) {
  const newName = prompt("Enter new item name:", items[index].name);
  const newPrice = prompt("Enter new item price:", items[index].price);

  if (newName !== null && newPrice !== null) {
    const trimmedName = newName.trim();
    const trimmedPrice = newPrice.trim();

    if (trimmedName !== "" && trimmedPrice !== "") {
      items[index].name = trimmedName;
      items[index].price = Number(trimmedPrice);
      renderList();
    }
  }
}

// 8. Clear all items
function clearList() {
  items = [];
  localStorage.removeItem("shoppingList");
  renderList();
}

// 9. Event Listeners
addItemButton.addEventListener("click", addItem);
clearListButton.addEventListener("click", clearList);

// Initial render when the page loads
renderList();
