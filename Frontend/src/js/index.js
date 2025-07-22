document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("user").value;
    const senha = document.getElementById("pass").value;

    const resposta = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha }),
        credentials: "include"
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        window.location.href = "index.html";
    } else {
        document.getElementById("erro").innerText = resultado.erro;
    }
});