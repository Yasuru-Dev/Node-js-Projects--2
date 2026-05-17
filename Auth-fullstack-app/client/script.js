async function registerUser() {

    // GET INPUT VALUES
    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;


    // SEND DATA TO BACKEND
    const response = await fetch("http://localhost:3000/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    });


    // GET RESPONSE
    const data = await response.text();


    // SHOW MESSAGE
    document.getElementById("message").innerText = data;

}