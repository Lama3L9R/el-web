import { ThemeProvider } from '@emotion/react'
import { Alert, Button, Collapse, CssBaseline, Grid, Link, Paper, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'


import React from 'react'
import ReactDOM from 'react-dom/client'
import { globalAPIBaseURL, globalTheme } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoginMenu />
  </React.StrictMode>,
)

function LoginMenu() {
  const [openContactAdmin, setOpenContactAdmin] = React.useState(false)
  const [loginError, setLoginError] = React.useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('')
  const [loginInProgress, setLoginInProgress] = React.useState(false)

  const usernameInput = React.useRef<HTMLInputElement>(null)
  const passwordInput = React.useRef<HTMLInputElement>(null)

  return <div>
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      
        <Grid sx={{minWidth: '100%', minHeight: '100vh'}} container justifyContent='center' alignItems='center' direction='row'>
          <Grid item>
            <Paper elevation={5} sx={{padding: '2.3rem'}}>
              <Grid container justifyContent='flex-start' alignItems='center' direction='column' spacing={1}>
                <Grid item>
                  <Grid container justifyContent='center' alignItems='flex-end' direction='row' spacing={3}>
                    <Grid item>
                      <Typography variant='h3' align='left'>
                        Welcome! 
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography color='gray' variant='body2' align='left' paddingBottom={1}>
                        Project EL 1.0.0
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{minWidth: '100%'}}>
                  <Collapse in={loginError}>
                    <Alert onClose={() => setLoginError(false)} severity="error" sx={{ width: '100%' }}>
                      {loginErrorMessage}
                    </Alert>
                  </Collapse>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}}>
                  <TextField fullWidth inputRef={usernameInput} label="Username" type="text" autoComplete="current-username" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <TextField fullWidth inputRef={passwordInput} label="Password" type="password" autoComplete="current-password" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <Button sx={{minWidth: '100%'}}  variant='contained' color='primary' disabled={loginInProgress} onClick={() => {
                    console.log(JSON.stringify({ 
                      username: usernameInput.current?.value, 
                      password: passwordInput.current?.value 
                    }))

                    axios.request({
                      url: `${globalAPIBaseURL}/session/auth`,
                      data: JSON.stringify({ 
                        username: usernameInput.current?.value, 
                        password: passwordInput.current?.value 
                      }),
                      headers: {
                        "Content-Type": "application/json"
                      },
                      method: "POST",
                    }).then((rep) => {
                      setLoginInProgress(false)

                      if (rep.data.status.err != 0) {
                        setLoginErrorMessage('Wrong username or password!')
                        setLoginError(true)
                      } else {
                        window.sessionStorage.setItem("token", rep.data.token)
                        window.location.href = "/vocabulary/vocabulary.html"
                      }
                    }).catch(it => {
                      console.error(it)
                      setLoginInProgress(false)
                    })
                    
                    setLoginInProgress(true)
                  }}> Login </Button>
                </Grid>

                <Grid item sx={{minWidth: '100%'}} >
                  <Grid container justifyContent='space-between' alignItems='center' direction='row' spacing={1}>
                    <Grid item>
                      <Link href="register.html" underline="hover">Register</Link>
                    </Grid>

                    <Grid item>
                      <Link href="#" onClick={() => setOpenContactAdmin(true)} underline="hover">Forget my password</Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar open={openContactAdmin} autoHideDuration={6000} onClose={() => setOpenContactAdmin(false)}>
          <Alert onClose={() => setOpenContactAdmin(false)} severity="info" sx={{ width: '100%' }}>
            Please contact admin for futher help on login issues.
          </Alert>
        </Snackbar>
    </ThemeProvider>
  </div>
}