import { ThemeProvider } from '@emotion/react'
import { Alert, Button, Collapse, CssBaseline, Grid, Link, Paper, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'


import React from 'react'
import ReactDOM from 'react-dom/client'
import { globalAPIBaseURL, globalTheme } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RegisterMenu />
  </React.StrictMode>,
)

function RegisterMenu() {
  const [openContactAdmin, setOpenContactAdmin] = React.useState(false)
  const [registerInProgress, setRegisterInProgress] = React.useState(false)
  const [loginError, setLoginError] = React.useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('')

  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const repeatePasswordRef = React.useRef<HTMLInputElement>(null)


  return <div>
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      
        <Grid sx={{minWidth: '100%', minHeight: '100vh'}} container justifyContent='center' alignItems='center' direction='row'>
          <Grid item>
            <Paper elevation={5} sx={{padding: '2.3rem'}}>
              <Grid sx={{minWidth: '100%'}} container justifyContent='flex-start' alignItems='center' direction='column' spacing={1}>
                <Grid item >
                  <Grid container justifyContent='space-between' alignItems='flex-end' direction='row' spacing={1}>
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
                  <TextField inputRef={usernameRef} fullWidth label="Username" type="text" autoComplete="current-username" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <TextField inputRef={passwordRef} fullWidth label="Password" type="password" autoComplete="current-password" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <TextField inputRef={repeatePasswordRef} fullWidth label="Repeat Password" type="password" autoComplete="current-password" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <Button sx={{minWidth: '100%'}} disabled={registerInProgress} variant='contained' color='primary' onClick={() => {
                    if (passwordRef.current?.value != repeatePasswordRef.current?.value) {                 
                      setLoginErrorMessage('Mismatched passwords')
                      setLoginError(true)
                      return
                    }
                    
                    setRegisterInProgress(true)
                    axios.request({
                      url: `${globalAPIBaseURL}/session/register`,
                      data: JSON.stringify({ 
                        username: usernameRef.current?.value, 
                        password: passwordRef.current?.value 
                      }),
                      headers: {
                        "Content-Type": "application/json"
                      },
                      method: "POST",
                    }).then(({ data }) => {
                      setRegisterInProgress(false)

                      if (data.status.err === 0) {
                        window.location.href = "/"
                      } else {
                        setLoginErrorMessage('Failed to register: ' + data.status.msg + ` (Err ${data.status.err})`)
                        setLoginError(true)
                      }
                    })

                  }}> Register </Button>
                </Grid>

                <Grid item sx={{minWidth: '100%'}} >
                  <Grid container justifyContent='space-between' alignItems='center' direction='row' spacing={1}>
                    <Grid item>
                      <Link href="/" underline="hover">Already have a Account? Click here to login instead.</Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
    </ThemeProvider>
  </div>
}