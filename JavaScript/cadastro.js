//função para "pagar o eventos do front-end (objetos do front-end)"
document.getElementById('cadastroForm').addEventListener('submit',function(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const NMC = document.getElementById('NMC').value;
    const peso = document.getElementById('peso').value;
    const fardo = document.getElementById('fardo').value;
    const preco = document.getElementById('preco').value;


    //objeto json para enviar para a API em MODEJS
    const data = {
        nome:nome,
        NMC:NMC,
        peso:peso,
        fardo:fardo,
        preco:preco,
        
    }
    //endereço da API para cadastrar um objeto
    fetch('http://localhost:8081/cadastrar',{
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
        if(data.msg === "Produto cadastrado com sucesso!!!"){

        
        alert('Cadastro realizado com sucesso')
        //retorno na tela de Login
        window.location.href = 'index.html'
        }
        //mudar a mensagem
        else if(data.msg === "O produto já está cadastrado na base de dados"){
            alert('O produto já está cadastrado')
        }
        else{
            alert('Ocorreu um erro ao cadastro'+ data.msg)
        }
    })
.catch (error=>{
    throw new Error(error)
})

})