const selector = document.querySelector("#opts");
const userNameBox = document.querySelector("#user_name");

const isOnline = async () => {
    try {
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = "/api/auth/online";
        let response = await fetch(url, opts);
        response = await response.json();
        console.log(response);
        if (response.error) {
            selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/user/register">
            <i class="bi bi-person-add"></i> Register
            </a>
            <a class="btn btn-success py-1 px-2 m-1" href="/user/login">
            <i class="bi bi-door-open"></i> Login
            </a>`;
        } else {
            selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/user/profile">
            <i class="bi bi-person-circle"></i> Profile
            </a>
            <a class="btn btn-success py-1 px-2 m-1 d-flex align-items-center gap-1" href="/cart/cart">
            <i class="bi bi-cart-fill"></i> Cart
            </a>
            <button class="btn btn-danger py-1 px-2 m-1" id="signout"> 
            <i class="bi bi-box-arrow-right"></i> Sign out
            </button>`;
            userNameBox.innerHTML = `<strong>Bienvenido: ${response.response.name || response.response.email}</strong>`;
            if (response.response?.role === "ADMIN") {
                const addBtn = document.createElement("a");
                addBtn.className = "btn btn-info py-1 px-2 m-1";
                addBtn.href = "/product/add-product";
                addBtn.textContent = "Add Product";
                selector.appendChild(addBtn);
            }
            document.querySelector("#signout").addEventListener("click", async () => {
                try {
                    const opts = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                    const url = "/api/auth/signout";
                    await fetch(url, opts);
                    localStorage.removeItem("token");
                    location.replace("/");
                } catch (error) {
                    console.log(error);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

isOnline();