


const cartItems = JSON.parse(localStorage.getItem('cart')) || []
const shoppingCartContent = $('#cartItems')
const clearCartBtn = $('#clear-cart');

$(document).ready(function () {
    displayCart()
})

function displayCart() {
    const html = cartItems.map(x => buildItem(x)).join("")
    shoppingCartContent.empty().html(html)

    if (cartItems.length) {
        $("#notification-badge").show().text(cartItems.length)
    } else {
        $("#notification-badge").hide()
    }
}

function buildItem(menu) {
    return `
<tr class="text-light">
    <td>
        ${menu.title}
    </td>
     <td>
        ${menu.price}
    </td>
     <td>
        <button onclick="removeItem(event)" data-itemId="${menu.id}">X</button>
    </td>
</tr>
`;
}

function removeItem(e) {
    const _id = parseInt($(e.target).attr('data-itemId'))
    const _index = cartItems.findIndex(x => x.id === _id)

    cartItems.splice(_index, 1)
    localStorage.setItem('cart', JSON.stringify(cartItems))

    displayCart()
}

function buyItem(e) {
    if (e.target.classList.contains("add-to-cart")) {
        //read the menu value
        const menu = e.target.parentElement.parentElement;
        getMenuInfo(menu);
    }
}


function getMenuInfo(menu) {
    //create an Object with menu data
    const menuInfo = {
        // image: menu.querySelector('img').src,
        title: menu.querySelector('h4').textContent,
        price: menu.querySelector('.price span').textContent,
        id: menu.querySelector('a').getAttribute('data-id')
    }
    addToCart(menuInfo);
}





function clearCart() {
    console.log(shoppingCartContent.firstChild)
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
}