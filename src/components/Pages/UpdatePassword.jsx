import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Nav from '../Header/Navigation';
import Context from '../ContextApi/MainContext';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UpdatePassword() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [currPass, setCurrPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [message, setMessage] = React.useState('')
    const token = localStorage.getItem("token");
    const { mode } = React.useContext(Context)
    const navigate=useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://academics.newtonschool.co/api/v1/user/updateMyPassword', {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
                'projectID': 'ut1dy4576cd1'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "passwordCurrent": currPass,
                "password": newPass,
                "appType": "linkedin"
            })

        })
        .then((res)=>{
            if(!res.ok){
                setMessage('Incorrect current password or email')
            }
            else{
                // console.log('success')
            navigate('/')
        }})
            .catch(error =>console.log('error: '+error))

    };

    return (
        <>
        <Nav/>
        
        <ThemeProvider theme={defaultTheme}>
            <Container sx={mode?{ bgcolor: 'black',color:'white', borderRadius: '6px', mb: '5px' }
            :{ bgcolor: 'white', borderRadius: '6px', mb: '5px' }} component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Password
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx: { color: 'white',outline:'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx: { color: 'white',outline:'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="currPassword"
                                    label="Current Password"
                                    name="currentPassword"
                                    value={currPass}
                                    onChange={(e) => setCurrPass(e.target.value)}
                                    InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx: { color: 'white',outline:'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    InputProps={{sx:mode&&{color:'white',background:'darkslategray'}}}
                                  InputLabelProps={{ sx: { color: 'white',outline:'white' } }}
                                />
                                {
                                message.length !==0?
                                <Typography color={'error'} variant='p'>{message}</Typography>:null}
                            </Grid>
                            <Grid item xs={12}>

                                <FormControlLabel
                                    control={<Checkbox required value="allowExtraEmails" sx={mode&&{color:'white'}} color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={mode?{ mt: 3, mb: 2,background:'#452c2c' }:{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
        </>
    );
}