document.getElementById("abrirModal").addEventListener("click", () => {
  document.getElementById("modalCadastro").style.display = "flex";
});

document.querySelector(".fechar").addEventListener("click", () => {
  document.getElementById("modalCadastro").style.display = "none";
});

// Fechar modal ao clicar fora
window.addEventListener("click", (e) => {
  if (e.target.id === "modalCadastro") {
    document.getElementById("modalCadastro").style.display = "none";
  }
});

document.getElementById("formCadastroPet").addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("nome", document.getElementById("nomePet").value);
  formData.append("peso", document.getElementById("pesoPet").value);
  formData.append("foto", document.getElementById("fotoPet").files[0]);

  const resposta = await fetch("http://127.0.0.1:5000/api/cadastrar-pet", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const resultado = await resposta.json();
  const mensagem = document.getElementById("mensagemCadastro");

  if (resposta.ok) {
    mensagem.textContent = "Pet cadastrado com sucesso!";
    mensagem.style.color = "green";
    document.getElementById("formCadastroPet").reset();
    setTimeout(() => {
      mensagem.textContent = "";
      document.getElementById("modalCadastro").style.display = "none";
    }, 1500);
  } else {
    mensagem.textContent = resultado.erro || "Erro ao cadastrar pet.";
    mensagem.style.color = "red";
  }
});
