document.getElementById("abrirModal").addEventListener("click", () => {
  document.getElementById("modalCadastro").style.display = "flex";
});

document.querySelector(".fechar").addEventListener("click", () => {
  document.getElementById("modalCadastro").style.display = "none";
});


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



async function carregarPets() {
  const resposta = await fetch("http://127.0.0.1:5000/api/cachorros");
  const pets = await resposta.json();

  const container = document.getElementById("listaPets");
  container.innerHTML = "";

  pets.forEach(pet => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <figure>
        <img src="${pet.foto}" alt="${pet.nome}">
      </figure>
      <h4>Nome: ${pet.nome}</h4>
      <p>Peso: ${pet.peso} kg</p>
      <button>ver mais</button>
    `;

    container.appendChild(card);
  });

  const botao = document.createElement("button");
    botao.id = "abrirModal";
    botao.classList.add("botao-cadastrar");
    botao.textContent = "Cadastrar novo pet +";
    lista.appendChild(botao);

    botao.addEventListener("click", () => {
        document.getElementById("modalCadastro").style.display = "block";
    });
}

carregarPets();