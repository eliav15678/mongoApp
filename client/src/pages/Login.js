import React,{useState, useEffect, useCallback} from 'react';
import { FaUser } from 'react-icons/fa';

function Login() {

  const [formData ,setFormData] = useState({
    email: '',
    password: ''
  }); 

  
  const onChangeText = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
  }


  const {email,password} = formData;


  const onSubmit = async() => {
    
  }
      

  return (
    <>
      <section>
        <h1 className='head'><FaUser/>Login to marketApp</h1>
        <p> {email}<br />{password}</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
            <div>
              <input 
                className='form-control'
                type="email"
                id='email'
                name='email'
                placeholder='enter email'
                value={email}
                onChange={onChangeText}
              />
            </div>
            <div>
              <input 
                className='form-control'
                type="password"
                id='password'
                name='password'
                value={password}
                placeholder='enter password'
                onChange={onChangeText}
              />
            </div>

            <button className='login-btn' type='submit'>
              Login
            </button>

        </form>
      </section>

    </>
  )
}

export default Login