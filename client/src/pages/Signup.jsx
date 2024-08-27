import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import OAuth from '../components/OAuth';

const Signup = () => {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.copassword) {
      return setErrorMessage('Passwords doesnt match')
    }
    if (formData.password.length < 6) {
      return setErrorMessage('Password must be more than 6 letters')
    }

    try {
      setLoading(true);
      setErrorMessage(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) navigate('/sign-in');
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to='/'
            className='font-bold dark:text-white text-4xl'
          >
            <span
              className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'
            >MERN</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>You can sign up with your email and password or google</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={HandleSubmit}>
            <div className="">
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' name='username' onChange={HandleChange} required />
            </div>
            <div className="">
              <Label value='Your email' />
              <TextInput type='email' placeholder='Email' id='email' name='email' onChange={HandleChange} required />
            </div>
            <div className="">
              <Label value='Your password' />
              <TextInput type='password' placeholder='Create Password' id='password' name='password' onChange={HandleChange} required />
            </div>
            <div className="">
              <Label value='Your password' />
              <TextInput type='password' placeholder='Confirm Password' id='copassword' name='copassword' onChange={HandleChange} required />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading} >
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account? </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Signup