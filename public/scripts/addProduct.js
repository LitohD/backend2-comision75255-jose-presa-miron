document.querySelector("#addProduct").addEventListener("click", async () => {
    try {
        console.log("data");
        const data = {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            category: document.querySelector("#category").value,
            image: document.querySelector("#image").value,
            price: document.querySelector("#price").value,
            stock: document.querySelector("#stock").value,
            owner_id: document.querySelector("#owner_id").value,
            onsale: document.querySelector('input[name="onsale"]:checked').value,
        };
        console.log(data);
        const opt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const url = "/api/products";
        let response = await fetch(url, opt);
        response = await response.json();
        console.log("response");
        console.log(response);
        if (response.error) {
            alert(`Error al agregar el producto`);
        } else {
            alert(`Producto agregado`);
            window.location.href = "/";
        }
    } catch (error) {
        console.log(error.message);
        alert(error);
    }
});