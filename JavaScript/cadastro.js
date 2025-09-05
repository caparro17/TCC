//função para "pagar o eventos do front-end (objetos do front-end)"
document.getElementById('cadastroForm').addEventListener('submit',function(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const telefone = document.getElementById('telefone').value;
    const sexo = document.getElementById('sexo').value;
    const endereco = document.getElementById('endereco').value;
    const cor = document.getElementById('cor').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const senha = document.getElementById('senha').value;
    const nacionalidade = document.getElementById('nacionalidade').value;


    //objeto json para enviar para a API em MODEJS
    const data = {
        nome:nome,
        sobrenome:sobrenome,
        email:email,
        cpf:cpf,
        rg:rg,
        telefone:telefone,
        sexo:sexo,
        endereco:endereco,
        cor:cor,
        data_nascimento:data_nascimento,
        senha:senha,
        nacionalidade:nacionalidade
    }
    //endereço da API para cadastrar um objeto
    fetch('http://localhost:8081/api/cadastrar',{
        method: 'POST',
        //tipo do conteudo no cabeçalho é do tipo JSON
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    })

    //tratar os status code da API
    .then(response=>{
        if(response.status === 200){
            return response.json();
        }
        else if(response.status === 401){
            return response.json();
        }
        else{
            throw new Error("Cadastro invalido");
        }
    })

    //tratar as mensagens da API
    .then(data=>{
        if(data.msg === "Usuário cadastrado com sucesso!!!"){

        
        alert('Cadastro realizado com sucesso')
        //retorno na tela de Login
        window.location.href = 'index.html'
        }
        //mudar a mensagem
        else if(data.msg === "O email já está cadastrado na base de dados"){
            alert('O Email já está cadastrado')
        }
        else{
            alert('Ocorreu um erro ao cadastro'+ data.msg)
        }
    })
.catch (error=>{
    throw new Error(error)
})

})