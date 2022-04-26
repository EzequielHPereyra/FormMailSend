//Variables
const BtnEnviar = document.querySelector ('#enviar');
const BtnReset = document.querySelector ('#resetBtn')
const form = document.querySelector ('#enviar-mail');
const email = document.querySelector ('#email');
const asunto = document.querySelector ('#asunto');
const mensaje = document.querySelector ('#mensaje');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListener();
function eventListener () {
    document.addEventListener("DOMContentLoaded", initialize);
    //form
    email.addEventListener('blur' , validation);
    asunto.addEventListener('blur' , validation);
    mensaje.addEventListener('blur' , validation);
    BtnReset.addEventListener('click' , resetForm);
    form.addEventListener('submit' ,sendMail);
    
}

function initialize () {
    BtnEnviar.disabled = true;
    BtnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validation (e) {

    if (e.target.value.length > 0) {
        const error = document.querySelector ('p.error');
        if (error) {
            error.remove();
        }
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        showError ('Todos los campos son obligatorios');
  }
  if (e.target.type === 'email') {
      if (re.test ( e.target.value )) {
        const error = document.querySelector ('p.error');
        if (error) {
            error.remove();
        }
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
      }else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        showError ('Email no valido');
      }
  }

  if (re.test ( email.value )  && mensaje.value !=='' && asunto.value !=='') {
    BtnEnviar.disabled = false;
    BtnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
}
 }

function showError (mesage) {
    const mesageError = document.createElement ('p');
    mesageError.textContent = mesage;
    mesageError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mb-2', 'text-center', 'error');
    const errores = document.querySelectorAll ('.error');
    if (errores.length === 0) {
        form.insertBefore(mesageError, document.querySelector('.mb-10'));
    }


    
}

function sendMail (e) {
    e.preventDefault();
    
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    setTimeout(() => {
        spinner.style.display = 'none';
        const txt = document.createElement ('p')
        txt.classList.add('text-center', 'my-10', 'p-2', 'bg-blue-800', 'text-white', 'font-bold', 'uppercase');
        txt.textContent = 'Mensaje enviado correctamente';
        form.insertBefore(txt, spinner)
        setTimeout(() => {
            txt.remove();
            form.reset();
            initialize();
        }, 5000);
    }, 3000
    );
}

function resetForm() {
    form.reset();
    initialize();
}