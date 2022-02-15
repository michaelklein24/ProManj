const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#emailInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();
 

    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  console.log(response)
      if (response.ok) {
      
        document.location.replace(`/users`);
      } else {
        alert('Failed to log in.');
        document.querySelector('#emailInput').value = ''
        document.querySelector('#passwordInput').value= ''
      }
    }
  };
  
  
  
  document
  .querySelector('#login-form').addEventListener('submit', loginFormHandler);

