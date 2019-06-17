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
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(result => {
      console.log(result);
      dataController.setUserEmail(result.email);
      dataController.setUserToken(result.tokens[0].token);
      window.location.href = './index.html';
    })
    .catch(err => console.log(err));
}
