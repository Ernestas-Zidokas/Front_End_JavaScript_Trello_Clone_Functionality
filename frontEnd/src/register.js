document.querySelector('#register').addEventListener('click', event => {
  registerUser();
});

function registerUser() {
  let email = document.querySelector('#email').value;
  let pass = document.querySelector('#password').value;
  let passAgain = document.querySelector('#passwordRepeat').value;

  fetch('http://localhost:3000/api/getUser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(response => response.json())
    .then(result => {
      if (result) {
        if (pass != passAgain) {
          console.log('pass nesutampa');
          return;
        }

        fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            passwordAgain: passAgain,
          }),
        })
          .then(response => {
            console.log('response', response);
            return response.json();
          })
          .then(result => {
            console.log(result);
            window.location.href = './login.html';
          })
          .catch(err => console.log(err));
      } else {
        console.log('Email already exists');
      }
    })
    .catch(err => console.log(err));
}
