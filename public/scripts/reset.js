document.querySelector("#reset").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordRepeat = document.getElementById("passwordRepeat").value;

    if (password !== passwordRepeat) {
        return alert("Las contraseñas no coinciden.");
    }
    const data = {
        email: email,
        password: password,
    };
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    const url = "/api/auth/reset";
    try {
        let response = await fetch(url, opts);
        response = await response.json();

        console.log(response);

        if (response.error) {
            alert(response.error);
        } else {
            alert("Contraseña actualizada con éxito.");
            window.location.href = "/login";
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});