const logueo = document.getElementById ("botonLogin");

const usuarioAutorizado = "Prigs";
const passwordAutorizado = "123";

logueo.addEventListener ("click", ()=>{
    Swal.fire ({
        title: "Login",
        html: ` <input type="text" id="usuario" class="swal2-input" placeholder="usuario">
                <input type="text" id="password" class="swal2-input" placeholder="password">`,
        confirmButtonText: "Iniciar Sesion",
        showCancelButton: true,
        cancelButtonText: "Salir",
    }) .then((result) =>{
        if(result.isConfirmed){
            const usuario= document.getElementById("usuario").value;
            const password = document.getElementById("password").value;
            Swal.fire({
                title: "Sus datos no coinciden",
                icon: "error",
                confirmButtonText: "Aceptar",
            })
            if(usuario === usuarioAutorizado && password === passwordAutorizado){
                 window.location.href = "mercado.html";
             }
        }
    })
})