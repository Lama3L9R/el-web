import { ThemeProvider } from '@emotion/react'
import { Alert, Button, Collapse, CssBaseline, Grid, Link, Paper, Snackbar, TextField, Typography } from '@mui/material'


import React from 'react'
import ReactDOM from 'react-dom/client'
import { globalTheme } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoginMenu />
  </React.StrictMode>,
)

function LoginMenu() {
  const [openContactAdmin, setOpenContactAdmin] = React.useState(false)
  const [loginError, setLoginError] = React.useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('')

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
                  <TextField fullWidth label="Username" type="text" autoComplete="current-username" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <TextField fullWidth label="Password" type="password" autoComplete="current-password" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <TextField fullWidth label="Repeat Password" type="password" autoComplete="current-password" onFocus={() => setLoginError(false)}/>
                </Grid>

                <Grid item sx={{minWidth: '100%', paddingBottom: '0.5rem'}} >
                  <Button sx={{minWidth: '100%'}}  variant='contained' color='primary' onClick={() => {
                    // todo login
                    setLoginErrorMessage('Mismatched passwords')
                    setLoginError(true)
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