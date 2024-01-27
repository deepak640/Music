import Logo from '../images/images'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.scss'
import { Button } from '@mui/material'
import { useEffect } from 'react'

const Signin = () => {
    const history = useNavigate()
    const [User, setUser] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Password: ""
    })
    const [formerror, setformerrors] = useState({})
    const [issubmit, setissubmit] = useState(false)
    let Name, value;
    const handleinputs = (e) => {
        Name = e.target.name
        value = e.target.value
        setUser({ ...User, [Name]: value })

    }
    useEffect(() => {
        if (Object.keys(formerror).length === 0 && issubmit) {
        }

    }, [formerror, issubmit]

    )
    const validate = (values) => {
        const errors = {}
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const regexPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        if (!values.Name) {
            errors.Name = "Username is required !"
        }
        if (!values.Email) {
            errors.Email = "Email is required !"
        } else if (!regexEmail.test(values.Email)) {
            errors.Email = "This is not a valid email format !"
        }
        if (!values.Password) {
            errors.Password = "Password is required !"
        } else if (!/[a-z]/g.test(values.Password)) {
            errors.Password = "Password Should contain Lowercase letters !"
        } else if (!/[A-Z]/g.test(values.Password)) {
            errors.Password = "Password Should contain  Capital letters !"
        } else if (!/[0-9]/g.test(values.Password)) {
            errors.Password = "Password Should contain  Numbers !"
        } else if (values.Password >= 8) {
            errors.Password = "Password Should contain Minimum !"
        }
        if (!values.Phone) {
            errors.Phone = "Phone number is required !"
        } else if (!regexPhone.test(values.Phone)) {
            errors.Phone = "Phone number is not valid !"
        }
        return errors;
    }


    const Postdata = async (e) => {
        e.preventDefault()
        setformerrors(validate(User))
        setissubmit(true)

        const { Name, Email, Phone, Password } = User

        const res = await fetch("https://mastimusic.herokuapp.com/register", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Name,
                Email,
                Phone,
                Password
            })
        })

        if (res.status === 200) {
            history("/login")
        }

    }

    return (
        <>
            <main className="form-sign-up w-100 m-auto">
                <form method='POST' className='sign-up' onSubmit={Postdata} noValidate>
                    <div>
                        <img className="rounded mx-auto d-block mb-4" src={Logo} alt="" width="72" height="57" />
                        <h1 className="h5 mb-3 fw-normal text-center">Please sign in</h1>
                    </div>

                    <div className="form-floating">
                        <input type="Text" className="form-control custom-color" autoComplete='off'
                            name='Name'
                            value={User.Name}
                            onChange={handleinputs}
                            placeholder="Name" required />
                        <label >Name</label>
                        <p className='error-feedback'>{formerror.Name}</p>
                    </div>
                    <div className="form-floating">
                        <input name='Email' type="email" className="form-control custom-color" autoComplete='off'
                            value={User.Email}
                            onChange={handleinputs}
                            placeholder="Email" />
                        <label>Email</label>
                        <p className='error-feedback'>{formerror.Email}</p>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control custom-color" autoComplete='off'
                            value={User.Phone}
                            onChange={handleinputs}
                            name='Phone' placeholder="Phone Number" />
                        <label>Phone Number</label>
                        <p className='error-feedback'>{formerror.Phone}</p>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control custom-color" autoComplete='off'
                            value={User.Password}
                            onChange={handleinputs}
                            name='Password' placeholder="Password" />
                        <label>Password</label>
                        <p className='error-feedback'>{formerror.Password}</p>
                    </div>
                    <div className='sign-btn'>
                        <Button variant='contained' onClick={Postdata} value="register">Sign up</Button>
                    </div>
                    <div className="text-success">
                        <hr className="shadow" />
                    </div>
                    <div className="register">
                        <h5 className='h5'>have an account? <a href="/Login">Login here</a></h5>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Signin