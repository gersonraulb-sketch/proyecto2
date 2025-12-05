fetch('modal.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('modal-container').innerHTML = html;

const modal = document.querySelector('.mimodal');
const overlay = document.querySelector('.overlay');
const openmodalbtn = document.querySelector('.btn-open');
const closemodalbtn = document.querySelector('.btn-close');
const formRegistro = document.querySelector('.form-registro');
const formLogin = document.querySelector('.form-login');
const loginToggle = document.querySelector('.btn-login-toggle');
const registroToggle = document.querySelector('.btn-registro-toggle');

const openmodal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  formRegistro.classList.remove('d-none');
  formLogin.classList.add('d-none');
};

const closemodal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

openmodalbtn.addEventListener('click', openmodal);
closemodalbtn.addEventListener('click', closemodal);
overlay.addEventListener('click', closemodal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closemodal();
  }
});

loginToggle.addEventListener('click', () => {
  formRegistro.classList.add('d-none');
  formLogin.classList.remove('d-none');
});

registroToggle.addEventListener('click', () => {
  formLogin.classList.add('d-none');
  formRegistro.classList.remove('d-none');
});


