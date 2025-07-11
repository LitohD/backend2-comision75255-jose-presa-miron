const showOption = async () => {
    const opt_admin = document.querySelector("#opt_admin");
    const productId = document.querySelector("#opt_admin").dataset.productId;
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const url = "/api/auth/online";
    try {
        let response = await fetch(url, opts);
        response = await response.json();
        if (response.response?.role === "ADMIN") {
            opt_admin.innerHTML = `<button class="btn btn-danger" id="deleteBtn" >
                                Eliminar producto de la DB
                            </button>
                            <a class="btn btn-info" id="updateBtn" >
                                Actualizar producto
                            </a>
                            `;document
                .querySelector("#deleteBtn")
                .addEventListener("click", async () => {
                    const deleteOpts = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                    const deleteUrl = `/api/products/${productId}`;
                    let deleteResponse = await fetch(deleteUrl, deleteOpts);
                    deleteResponse = await deleteResponse.json();
                    if (deleteResponse.error) {
                        alert(`Error al eliminar el producto`);
                    } else {
                        alert(
                            `Producto eliminado: ${deleteResponse.response.title}`
                        );
                        window.location.href = "/";
                    }
                });

            updateBtn = document.querySelector("#updateBtn");
            updateBtn.href = `/product/update-product/${productId}`;
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
};

showOption();

document.addEventListener("DOMContentLoaded", () => {
    const addToCartBtn = document.querySelector("#addToCart");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", async () => {
            const productId = addToCartBtn.getAttribute("data-product-id");
            try {
                const opts = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ product_id: productId }),
                };
                const url = "/api/carts"; // Ajusta la ruta si es necesario
                let response = await fetch(url, opts);
                response = await response.json();
                if (response.error) {
                    alert("Error al agregar al carrito: " + response.error);
                } else {
                    alert("Producto agregado al carrito");
                }
            } catch (error) {
                alert("Error al agregar al carrito: " + (error.message || error));
            }
        });
    }
});