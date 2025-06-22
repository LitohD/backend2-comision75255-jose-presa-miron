const productId = document.querySelector("#div_id").dataset.productId;

document.querySelector("#update_product").addEventListener("click", async () => {
    try {
        const data = {};
        const title = document.querySelector("#title").value;
        if (title) {
            data.title = title;
        }
        const description = document.querySelector("#description").value;
        if (description) {
            data.description = description;
        }
        const image = document.querySelector("#image").value;
        if (image) {
            data.image = image;
        }
        const price = document.querySelector("#price").value;
        if (price) {
            data.price = price;
        }
        const stock = document.querySelector("#stock").value;
        if (stock) {
            data.stock = stock;
        }
        const onsale = document.querySelector('input[name="onsale"]:checked').value;
        if (onsale) {
            data.onsale = onsale;
        }

        const opts = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const url = `/api/products/${productId}`;
        let response = await fetch(url, opts);
        response = await response.json();
        if (response.error) {
            alert(response.error);
        } else {
            alert("Producto actualizado");
            location.replace(`/details/${productId}`);
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});