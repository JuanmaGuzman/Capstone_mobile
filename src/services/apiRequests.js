import { generateBackEndService } from './backendService'
import { AxiosResponse, AxiosError } from 'axios';

const backEnd = generateBackEndService()

async function api_logout() {

    console.log("En request disconect")
    await backEnd.delete('/auth/')
    .then(response => console.log(response.data))
    .catch(error => console.log(error.data))
    return response.status.json()
}

async function api_login(email, password) {

    console.log("En request disconect")
    await backEnd.post('/auth/', { email: `${email}`, password: `${password}`})
    .then(response => console.log(response.data))
    .catch(error => console.log(error.data))
}

async function api_auth_me() {
    backEnd.get('/auth/me')
    .then((response: AxiosResponse) => {
      var user_data = response.data;
      console.log(user_data)
      })
      .catch((reason: AxiosError) => {
      console.log(reason.message)
      })
}

async function api_create_user(name, email, password) {

    backEnd.post('/user_profiles/user_profiles/create', 
    { 
      username: `${name}`, 
      email: `${email}`, 
      first_name: `${name}`, 
      last_name: `${name}`, 
      password1: `${password}`, 
      password2: `${password}`
    })
    .then((response: AxiosResponse) => {
    console.log(response.status);
    console.log("Usuario creado correctamente.");
   
    
    })
    .catch((reason: AxiosError) => {
      if (reason.response.status === 400) {
      console.log("Error 400: usuario ya existe?")
      
      } else {
      console.log("Error al crear usuario.")
      
      }
    setError("Error al crear tu cuenta.");
    console.log(reason.message)
    })
}

export { api_login, api_logout, api_auth_me, api_create_user }
