// Initialize shoppingList array with data from localStorage if available
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const markPurchasedBtn = document.getElementById('markPurchasedBtn');
const clearListBtn = document.getElementById('clearListBtn');
const shoppingListElem = document.getElementById('shoppingList');

// Function to render the shopping list
function renderShoppingList() {
    // Clear current list
    shoppingListElem.innerHTML = '';

    // Render each item in the shoppingList array
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        if (item.purchased) {
            li.classList.add('completed');
        }

        // Add click event to mark item as purchased
        li.addEventListener('click', () => {
            item.purchased = !item.purchased;
            saveShoppingList(); // Save updated list to localStorage
            renderShoppingList(); // Update the list display
        });

        shoppingListElem.appendChild(li);
    });
}

// Function to save shoppingList array to localStorage
function saveShoppingList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listeners
addItemBtn.addEventListener('click', () => {
    const newItem = {
        name: itemInput.value,
        purchased: false
    };
    shoppingList.push(newItem);
    saveShoppingList(); // Save updated list to localStorage
    renderShoppingList();
    itemInput.value = ''; // Clear input field after adding
});

markPurchasedBtn.addEventListener('click', () => {
    // Mark all items as purchased
    shoppingList.forEach(item => {
        item.purchased = true;
    });
    saveShoppingList(); // Save updated list to localStorage
    renderShoppingList();
});

clearListBtn.addEventListener('click', () => {
    // Clear the shopping list
    shoppingList = [];
    localStorage.removeItem('shoppingList'); // Remove from localStorage
    renderShoppingList();
});

// Initial render
renderShoppingList();
