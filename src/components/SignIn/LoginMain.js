import React, { useContext, useState } from 'react'
import Container from '@mui/material/Container';
import './Style.css'
import { useNavigate } from 'react-router-dom';
import Context from '../ContextApi/MainContext';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import LoginHead from './LoginHead';


export default function LoginMain() {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState('Show')
    const navigate = useNavigate();
    const [loginFeed, setLoginFeed] = useState(true)
    const { setUserData, userData } = useContext(Context);
    const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

    const pass = document.getElementById('password');
    const checkPass = () => {
        if (pass.type === "password") {
            pass.type = "text";
            setShowPass('Hide')
        } else {
            pass.type = "password";
            setShowPass('Show')
        }
    }
    const onLogin = async (e) => {

        console.log(mail + " " + password)
        try {
            e.preventDefault();
            const res = await fetch("https://academics.newtonschool.co/api/v1/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': 'ut1dy4576cd1'
                },
                body: JSON.stringify({
                    "email": mail,
                    "password": password,
                    "appType": "linkedin"
                })

            })

            if (res.ok) {

                const data = await res.json();

                setLoginFeed(true)

                if (data.status === 'success') {
                    console.log('success');
                    localStorage.setItem("token", data.token);

                    console.log(userData);
                    setUserData(data.data);
                    localStorage.setItem("userData", JSON.stringify(data.data));

                    navigate("/home");
                }
            }
            else {
                setLoginFeed(false);
            }

        } catch (error) {
            console.log('login error', error);
        }

    }


    return (

        <>
            <Container fixed className="login">
                {/* <LoginHead /> */}
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item xs={12} md={6}>

                        {/* < id='login-main-content'> */}
                        <div className='main' id='login-main-left'>
                            <p id='welcome'>Welcome to your professional community</p>
                            <form className='form-element' onSubmit={onLogin} >
                                {loginFeed ? null : <span style={{ color: 'red', marginTop: '5px' }}>check userId & password/Create Account</span>}
                                <label className='form-element label-login' htmlFor='email'>Email</label>
                                <input className='form-element input-login' type="email" name="email" value={mail} onChange={(e) => {
                                    setMail(e.target.value);
                                }} id='email' placeholder="Email" required />
                                <label className='form-element label-login' htmlFor='password'>Password </label>
                                <input className='form-element input-login' type="password" name="password" id='password' required
                                value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} placeholder="Password" />

                                <button className='form-element' id='passShow' type='button' onClick={checkPass}>
                                    {
                                        showPass
                                    }
                                </button>

                                <button className='form-element login-btn' type="submit">Sign In</button>
                            </form>
                        </div>
                        </Grid>
                        {isMdScreen&&(<Grid item xs={false} md={6}>
                            <img src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" alt="LinkedIn Logo"
                            style={{ width: '100%', height: 'auto' }} />
                        </Grid>)}
                    </Grid>
            </Container>
        </>
    )
}
