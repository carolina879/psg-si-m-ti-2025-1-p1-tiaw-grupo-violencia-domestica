const administrador = JSON.parse(localStorage.getItem('administrador'));
const usuarioCorrente =  JSON.parse(sessionStorage.getItem('usuarioCorrente'));
console.log('usuario adm?' + usuarioCorrente.adm)

function apagaUsuarioCorrente(){
    JSON.parse(sessionStorage.setItem('usuarioCorrente', null));
}

if (usuarioCorrente.adm === true){ 
    const isLogado = true;
    console.log(isLogado);
    const isAdmin = true
    let visualLogin = '';
    visualLogin = `<a onclick="apagaUsuarioCorrente()" href="inicio.html">Logout</a>`

    document.getElementById("liLogin").innerHTML = visualLogin;

    let visualPerfil = '';
    visualPerfil = `<a href="pagina-adm.html">Perfil Administrador</a>`

    document.getElementById("liPerfil").innerHTML = visualPerfil;

          



        

};

if (usuarioCorrente.servico){ 
    const isLogado = true;
    console.log(isLogado);
    const isAdmin = false
    let visualLogin = '';
    visualLogin = `<a onclick="apagaUsuarioCorrente()" href="inicio.html">Logout</a>`

    document.getElementById("liLogin").innerHTML = visualLogin;

    let visualPerfil = '';
    visualPerfil = `<a href="perfilprofissional2.html">Perfil do profissional</a>`

    document.getElementById("liPerfil").innerHTML = visualPerfil;

          



        

};

if ((!usuarioCorrente.servico) && (usuarioCorrente.adm === false)){ 
    const isLogado = true;
    console.log(isLogado);
    const isAdmin = false
    let visualLogin = '';
    visualLogin = `<a onclick="apagaUsuarioCorrente()" href="inicio.html">Logout</a>`

    document.getElementById("liLogin").innerHTML = visualLogin;

    let visualPerfil = '';
    visualPerfil = `<a href="perfil.html">Sua Página</a>`

    document.getElementById("liPerfil").innerHTML = visualPerfil;

          
console.log('teste user')


        

};



