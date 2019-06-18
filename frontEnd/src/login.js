const dataController = require('./DataController/index');
document.querySelector('#login').addEventListener('click', event => {
  loginUser();
});

function loginUser() {
  let email = document.querySelector('#email').value;
  let pass = document.querySelector('#password').value;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  })
    .then(res => {
      console.log(window.localStorage.setItem('token', res.headers.get('x-auth')));
      window.localStorage.setItem('token', res.headers.get('x-auth'));
      return res.json();
    })
    .then(body => {
      if (typeof body !== 'string') {
        // window.location.href = './index.html';
        console.log(body);
      } else {
        console.log(body);
      }
    })
    .catch(err => console.log(err));
}
