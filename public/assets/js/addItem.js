$(document).ready(function () {

    $("#addItemForm").on("submit", newItemSubmit);

    function newItemSubmit(event) {
        event.preventDefault();

        // Don't do anything if the name fields hasn't been filled out
        // const title = $("#addItemTitle").val().trim()
        // const price = $("#addItemPrice").val().trim()
        // const description = $("#addItemDesc").val().trim()

        // if (!(title && description && price)) {
        //     return;
        // };

        // $.post("/api/admin", { title, description, price })
        //     .then(getMenu)
        //     .catch(function (err) {
        //         console.log(err.message)
        //     });

        const newItem = {
            title: $("#addItemTitle").val().trim(),
            price: $("#addItemPrice").val().trim(),
            description: $("#addItemDesc").val().trim()
        }

        if (Object.values(newItem).some(val => !val)) {
            return;
        };

        API.addMenuItem(newItem)
            .then(() => window.location.replace("/menu"))
            .catch(function (err) {
                console.log(err.message)
            });
    };

    function getMenu() {
        API.getMenu()
            .then(function (data) {
                let htmledData = data.map(item => createMenuSpot(item));
                htmledData = htmledData.join('');
                $('#menu-target').empty().append(htmledData);
           })
            .catch(function (err) {
                console.log(err.message)
            });
    }
    function createMenuSpot(menuData) {
        let html =
            `<div class="card" data-itemId=${menuData.id}>
        <div class="card-body">
            <h5 class="card-title">
                ${menuData.title}
            </h5>
            <h6 class="card-subtitle">
                ${menuData.price}
            </h6>
            <p class="card-text">
                ${menuData.description}
            </p>
            <div class="itemId">
                ${menuData.id}
            </div>
        </div>
    </div>`;

        return html;
    }

    getMenu()

    $(document).on("click", ".card", function (e) {
        e.preventDefault();
        console.log(this.getAttribute('data-itemId'))
    })
})