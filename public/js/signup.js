
console.log('hey')
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstNameInput').value.trim();
    const lastName = document.querySelector('#lastNameInput').value.trim();
    const email = document.querySelector('#emailInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();
    const verifyPassword = document.querySelector('#verifyPasswordInput').value.trim();
console.log(password)
console.log(verifyPassword)
    if(password !== verifyPassword){
        alert('Passwords do not match ')
        document.querySelector('#passwordInput').value = ''
        document.querySelector('#verifyPasswordInput').value = ''
        return 
    }
  
    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  console.log(response)
      if (response.ok) {
        document.location.replace('/users');
      } else {
        alert(response.statusText);
        

      }
    }
  };

  document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);