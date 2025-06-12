document.querySelector("#update-user").addEventListener("click", async () => {
    try {
        const data = {};
        const name = document.querySelector("#name").value;
        if (name) {
            data.name = name;
        };
        const avatar = document.querySelector("#avatar").value;
        if (avatar) {
            data.avatar = avatar;
        };
        const city = document.querySelector("#city").value;
        if (city) {
            data.city = city
        };
        const date = document.querySelector("#date").value;
        if (date) {
            data.date = date;
        };
        const opts = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const url = "/api/users";
        let response = await fetch(url, opts);
        response = await response.json();
        if (response.error) {
            alert(response.error);
        } else {
            location.replace("/profile");
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});