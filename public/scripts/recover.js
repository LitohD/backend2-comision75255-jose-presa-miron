document.querySelector("#recoverBtn").addEventListener("click", async () => {
    const btn = document.querySelector("#recoverBtn");
    const originalText = btn.value;
    try {
        btn.value = "Enviando";
        btn.disabled = true;
        const data = {
            email: document.querySelector("#recoverEmail").value,
        };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const url = "/api/auth/recover";
        let response = await fetch(url, opts);
        console.log(response);
        response = await response.json();
        if (response.error) {
            alert(response.error);
        } else {
            alert(
                "Te enviamos un email para recuperar tu contraseña."
            );
        }
    } catch (error) {
        console.log(error);
        alert("Ocurrió un error al enviar el email.");
    }
});