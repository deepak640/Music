import Logo from '../images/images'
import './login.scss'
import { useState } from 'react'
import { Button } from '@mui/material'
const Login = () => {

    // ------------------------javascript-----------
    const eyepassword = () => {
        const password = document.getElementById("password")
        var eyeopen = document.getElementById("eye-open")
        var eyehide = document.getElementById("eye-hide")
        if (password.type === "password") {
            password.type = "text"
            eyeopen.style.display = "block"
            eyehide.style.display = "none"
        } else {
            password.type = "password"
            eyeopen.style.display = "none"
            eyehide.style.display = "block"
        }
    }

    const setcookie = () => {
        var email = document.getElementById("email").value
        console.log(email);
        var password = document.getElementById("password").value
        console.log(password);
        document.cookie = "Email = " + email + ";path=http://localhost/4000/Login"
        document.cookie = "Password = " + password + ";path=http://localhost/4000/Login"
    }
    function getcookie(cname) {
        var name = cname + "="
        var decodedcookie = decodeURIComponent(document.cookie)
        var ca = decodedcookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ""
    }

    const getEmail = () => {

        var email = getcookie("Email")
        document.getElementById("email").value = email

    }
    const getPassword = ()=>{
        var password = getcookie("Password")
        document.getElementById("password").value = password
    }


    // ------------------
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [error, setError] = useState("");



    const userlogin = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('https://mastimusic.herokuapp.com/signin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Email,
                    Password
                })
            })
            const data = res.json()
            if (res.status === 400 || !data) {
                const invalid = document.getElementById("ban")
                invalid.style.display = "block"
                setTimeout(function () {
                    invalid.style.display = "none"
                    
                }, 3000);
            }
            else {
                localStorage.setItem("token", data);
                window.location = "/Home";
            }
        } catch {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }


    }


    return (
        <>
            <main className="login-div w-100 m-auto">
                <form method='POST' className='login needs-validation' noValidate>
                    <div>
                        <img className="rounded mx-auto d-block mb-4" src={Logo} alt="" width="72" height="57" />
                        <h1 className="h5 mb-3 fw-normal text-center">Please sign in</h1>
                    </div>

                    <div className="form-floating">
                        <input type="email" name='Email' autoComplete='off' className="form-control custom-color" id="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            onClick = {getEmail}
                            placeholder="Email address" required />

                        <label>Email address</label>


                    </div>

                    <div className="form-floating">
                        <input type="password" name='Password' className="form-control custom-color password" id="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={getPassword}
                            placeholder="Password" autoComplete='off' required />
                        <span className='fa-hide' onClick={eyepassword}>
                            <i className="fa-sharp fa-solid  fa-eye-slash" id='eye-hide'></i>
                            <i className="fa-sharp fa-solid  fa-eye" id='eye-open'></i>
                        </span>
                        <label>Password</label>
                    </div>


                    <div className="checkbox mb-3">
                        <input type="checkbox" onClick={setcookie} className="form-check-input custom-color" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                    </div>
                    <div className='sign-btn'>
                        <Button type="submit" variant='contained' onClick={userlogin}>Sign in</Button>
                    </div>
                    <div className='text-success'>
                        <hr/>
                    </div>
                    <div className='register-link'>
                        <h5 className='h5'>Don't have an account? <a href="/signin">Register here</a></h5>
                    </div>
                </form>
                <div id='ban' className="login-banner alert alert-danger">
                    <p>Invalid Credentials ! <i className="fa-solid fa-circle-exclamation"></i></p>
                </div>
            </main>
        </>
    )
}

export default Login