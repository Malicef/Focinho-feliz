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
        credentials: "include" // necessário para cookies/sessão
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        // Login bem-sucedido -> redireciona para a página principal
        window.location.href = "index.html"; // troque para o nome real do arquivo principal
    } else {
        // Mostra erro
        document.getElementById("erro").innerText = resultado.erro;
    }
});