document.getElementById('ConsultaForm').addEventListener('submit',function(event){
    event.preventDefault();

    //obter os valores digitados pelo ususario no forms de login
    const email = document.getElementById('email').value;
    const senha = document.getElementById('email').value;

    //montar o objeto para enviar a API
    const datas ={
        email:email,
        senha:senha,
    };

    //realizar o envio do objeto para a API
    fetch('http://localhost:8081',{
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
        else{
            alert("Email ou senha incorretos")
        }
    })

    //tratar as mensagens da API
    .then(data=>{
        //mensagem da resposta da API
        if(data.msg === "Success"){
            //memoria local do javascript
            localStorage.setItem('nomeUsuarui', data.nome)
            
            //retorna para a tela de HOME
            window.location.href = 'home.html'
        }
    
})
.catch ((error)=>{
    alert("Ocorreu um erro ao realiar o login")
})

})

