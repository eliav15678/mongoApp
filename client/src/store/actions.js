import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';


const register = async(data) => {
    const response = await axios.post(baseUrl + '/account/register' , data);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
}

const login = async(data) => {
    const response = await axios.post(baseUrl + '/account/login' , data);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
}

const logout = async() => {
    localStorage.removeItem('user');
}



const actions = {
    register,
    login,
    logout
}

export default actions;