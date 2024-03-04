import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import './Style.css'

export default function SignupMain() {
    const navigate = useNavigate();
    const [uname, setUname] = useState('');
    const [uPass, setUPass] = useState('');
    const [uMail, setUMail] = useState('');
    const [alterVisible, setAlertVisible] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        fetch("https://academics.newtonschool.co/api/v1/user/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    projectID: "ut1dy4576cd1"
                },
                body: JSON.stringify(
                    {
                        name: uname,
                        password: uPass,
                        email: uMail,
                        'appType': "linkedin"
                    }
                )
            }).then(res => res.json()).then(json => {
                // console.log(json.message)
                if (json.status === 'fail') {
                    const alt=document.getElementById('alertSignup');
                    alt.innerHTML = `${json.message}`;
                        
                    setAlertVisible(true)
                    setTimeout(()=>setAlertVisible(false),1200)
                    clearTimeout();

                }
                else{
                   navigate('/')
                   
                    
                }
            }).catch(error => console.log(error))
    }
    const style={visible:{ visibility:'visible',transition: 'all ease 1s'},hide:{ visibility:'hidden'}}
    return (
        <>
            <Container >
                <div id='alert-container'>
                    <div style={alterVisible?style.visible:style.hide} id='alert'>
                    < Alert id='alertSignup' severity="error"></Alert>
                    </div>
                
            </div>
            <div id='signUP'>

                <div className="signup-main">
                    <h1>Sign Up</h1>
                    <p id='para'>Stay updated on your professional world</p>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField type='text' className='signup-input' name='userName' id="outlined-basic"
                            onChange={(e) => setUname(e.target.value)} value={uname} label="Username" variant="outlined" />

                        <TextField type='email' className='signup-input' name='userMail' id="outlined-basic"
                            onChange={(e) => setUMail(e.target.value)} value={uMail} label="Email" variant="outlined" />

                        <TextField type='password' className='signup-input' name='userPassword' id="outlined-basic"
                            onChange={(e) => setUPass(e.target.value)} value={uPass} label="Password" variant="outlined" />
                        <Button variant="contained" onClick={handleSignUp} id='signUp'>Sign Up</Button>
                    </Box>
                </div>

            </div>
        </Container >
        </>
    )
}
