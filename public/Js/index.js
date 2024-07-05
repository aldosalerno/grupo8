
const form = document.querySelector("#userinfo");

async function sendData() {
    // Associate the FormData object with the form element
    const formData = new FormData(form);
  
    try {
      const response = await fetch("https://example.org/post", {
        method: "POST",
        // Set the FormData instance as the request body
        body: formData,
      });
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  }
  
 


function signupform(){ 
    const signupform = document.querySelector('#signupform')
    signupform.addEventListener('submit', (e)=>{
    e.preventDefault()

    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const isUserRegistered = users.find(user => user.email === email)
    if(isUserRegistered){
        return alert('El usuario ya está registrado')
    }

    users.push({name: name, email: email, password: password})

    alert('Te registraste con éxito')

})
}




function logout(){ 

    const logout = document.getElementById('input')
    logout.addEventListener('click', ()=>{
        alert('Hasta pronto!')
        localStorage.removeItem('login_success')
        window.location.href = 'login.html'
    }); 
}

// Take over form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
  });
    