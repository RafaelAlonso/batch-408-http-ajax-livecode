// O código não funcionará porque você precisa da chave de API do Clearbit
// Para conseguir uma, cadastre-se no clearbit e vá para a aba "API"
// A chave que você quer começa com "sk_"
const authorization = "Bearer sk_your_api_key";

// função para fazer a requisição ao clearbit, dado um input do usuário
const fetchClearbitInfo = (user_input) => {
  // vai fazer uma requisição pra API do Clearbit => GET
  const url_da_api = `https://person.clearbit.com/v1/people/email/${user_input}`;
  const header = { Authorization: authorization }; // passo especifico para a API do Clearbit

  //      adiconando o header na request do fetch      //
  //                        ||                         //
  //                        \/                         //
  fetch(url_da_api, { headers: header } )
  .then(response => response.json())
  .then((data) => {
    // =========================================================================
    // data nos dá mais informações do que as que pegamos abaixo. Você pode ver
    // (e coletar) as outras com (descomente uma das duas linhas a seguir):
    // console.log(data) // para visualizar o objeto no console
    // debugger // para manipular o objeto no console
    // =========================================================================

    // pego as informações que preciso da resposta obtida
    const name = data.name.fullName;
    const email = data.email;
    const bio = data.bio;
    const location = data.location;

    // mostro no HTML os dados obtidos
    document.getElementById('userName').innerText = name;
    document.getElementById('userEmail').innerText = email;
    document.getElementById('userBio').innerText = bio;
    document.getElementById('userLocation').innerText = location;
  })
}

// 1. pega o elemento que sofrerá a ação
const form = document.getElementById('clearbitForm');
// 2. pega o tipo de evento que acontecerá
const eventType = 'submit';
// 3. escreve o código que vai ser executado quando a ação acontecer com meu elemento
const getInputAndFetchInfo = (event) => {
  // 3.1 pega o que o usuário escreveu no input (o email a ser procurado)
  const user_input = document.getElementById('clearbitEmail').value;

  // 3.2 chama a função que faz a requisição ao clearbit, passando o input do usuário
  fetchClearbitInfo(user_input);
};
// 4, juntar tudo num addEventListener
form.addEventListener(eventType, getInputAndFetchInfo);
