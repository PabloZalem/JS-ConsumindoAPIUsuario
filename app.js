const API_URL = "http://localhost:8080/usuarios";

const $output = document.getElementById("output");
const $outputUserSpecific = document.getElementById("outputUserSpecific");
const $btnLoadAll = document.getElementById("btnLoadAll");
const $btnLoadById = document.getElementById("btnLoadById");
const $form = document.getElementById("userForm");
const $userIdInput = document.getElementById("userIdInput");
const $deleteIdInput = document.getElementById("deleteIdOutput");
const $btnDeleteById = document.getElementById("btnDeleteById");
const $updateForm = document.getElementById("updateForm");
const $btnUpdateUser = document.getElementById("btnUpdateUser");
const $updateUserId = document.getElementById("updateUserId");
const $updateUsuario = document.getElementById("updateUsuario");
const $updateSenha = document.getElementById("updateSenha");
const $updateOutput = document.getElementById("updateOutput");


function show(data) {
  $output.textContent = JSON.stringify(data, null, 2);
}

// CREATE
async function createUser(usuario) {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsb0BlbWFpbC5jb20iLCJpYXQiOjE3NjcyMTE1NjMsImV4cCI6MTc2OTg0MTE4MH0.EJvUj2kgZnIVROHO3atF-WfW7G8A2KYPw-6pZNR8q1c", // formato correto
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  return res.text();
}

// READ ALL
async function getAllUsers() {
  const res = await fetch(`${API_URL}/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsb0BlbWFpbC5jb20iLCJpYXQiOjE3NjcyMTE1NjMsImV4cCI6MTc2OTg0MTE4MH0.EJvUj2kgZnIVROHO3atF-WfW7G8A2KYPw-6pZNR8q1c", // formato correto
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

// READ by ID
async function getUserById(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsb0BlbWFpbC5jb20iLCJpYXQiOjE3NjcyMDE4NTksImV4cCI6MTc2OTg0MTE4MH0.i3YrMg4bKgMk0RG49aKCq9-mNUU8Eyt2FO4puk8JNLw", // formato correto
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

// UPDATE by Id
async function updateUserById(id, usuario) {
  const res = await fetch(`${API_URL}?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization":
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsb0BlbWFpbC5jb20iLCJpYXQiOjE3NjcyMTE1NjMsImV4cCI6MTc2OTg0MTE4MH0.EJvUj2kgZnIVROHO3atF-WfW7G8A2KYPw-6pZNR8q1c",
    },
    body: JSON.stringify(usuario),
  });

  if (!res.ok) {
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }

  return true;
}

// DELETE by Id
async function deleteUserById(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsb0BlbWFpbC5jb20iLCJpYXQiOjE3NjcyMDE4NTksImV4cCI6MTc2OTg0MTE4MH0.i3YrMg4bKgMk0RG49aKCq9-mNUU8Eyt2FO4puk8JNLw", // formato correto
      "Content-Type": "application/json",
    },
  });
  return res.status === 204;
}

//Eventos
$btnUpdateUser.addEventListener("click", async () => {
  try {
    const id = $updateUserId.value.trim();
    if (!id) throw new Error("ID não informado");
    const usuario = {};
    if ($updateUsuario.value.trim())
      usuario.usuario = $updateUsuario.value.trim();
    if ($updateSenha.value.trim()) usuario.senha = $updateSenha.value.trim();
    if (Object.keys(usuario).length === 0) {
      throw new Error("Preencha ao menos 'usuario' ou 'senha' para atualizar");
    }
    const resposta = await updateUserById(id, usuario);
    $updateOutput.textContent = "Usuário atualizado com sucesso";
    $updateForm.reset();
  } catch (error) {
    $updateOutput.textContent = "Erro ao atualizar usuário: " + error.message;
  }
});

$btnDeleteById.addEventListener("click", async () => {
  try {
    const id = $deleteIdInput.value; // <-- usar o campo certo
    if (!id) throw new Error("ID não informado");

    const sucesso = await deleteUserById(id);
    if (sucesso) {
      $outputUserSpecific.textContent = "Usuário deletado com sucesso";
    } else {
      $outputUserSpecific.textContent = "Não foi possível deletar o usuário";
    }
  } catch (error) {
    $outputUserSpecific.textContent =
      "Erro ao deletar usuário: " + error.message;
  }
});


$btnLoadById.addEventListener("click", async () => {
  try {
    const id = $userIdInput.value;
    if (!id) throw new Error("ID não informado");

    const user = await getUserById(id);
    $outputUserSpecific.textContent = JSON.stringify(user, null, 2);
  } catch (error) {
    $outputUserSpecific.textContent =
      "Erro ao carregar usuário: " + error.message;
  }
});

$btnLoadAll.addEventListener("click", async () => {
  try {
    const users = await getAllUsers();
    $output.textContent = JSON.stringify(users, null, 2); // mostra formatado
  } catch (error) {
    $output.textContent = "Erro ao carregar usuários: " + error.message;
  }
});

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData($form);
  const usuario = {
    usuario: formData.get("nome"),
    senha: formData.get("senha"),
  };

  try {
    const mensagem = await createUser(usuario); // retorna "Cadastro criado com sucesso"
    $output.textContent = mensagem; //monstra no <pre id="output">
  } catch (error) {
    $output.textContent = "Erro ao criar usuário: " + error.message;
  }

  await createUser(usuario);
  $form.reset();
});
