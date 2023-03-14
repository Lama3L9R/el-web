import { ThemeProvider } from '@emotion/react';
import { Box, Button, Collapse, CssBaseline, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { globalAPIBaseURL, globalTheme } from '../../theme';
import { PageFrame, SideMenu } from '../page-frame';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)


function App() {
    const [showSideMenu, setShowSideMenu] = React.useState(false)

    return <React.StrictMode>
      <ThemeProvider theme={globalTheme}>
        <CssBaseline />
  
        <div>
            <Grid sx={{minHeight: '100vh'}} container direction="column" justifyContent="flex-start" alignItems="center">
                <Grid item>
                    <PageFrame onSideMenuClick={()=>setShowSideMenu(true)} />
                    <SideMenu showSideMenu={showSideMenu} onClose={()=>setShowSideMenu(false)}/>
                    <Toolbar />
                </Grid>

                <Grid item xs>
                    <QueryBody />
                </Grid>
            </Grid>
        </div>
      </ThemeProvider>
    </React.StrictMode>
}

function QueryBody() {
    const searchBar = React.useRef<HTMLInputElement>(null)
    const [searchInProgess, setSearchInProgress] = React.useState(false)
    const [searchResult, setSearchResult] = React.useState<string | null>(null)

    return <Grid container justifyContent='center' alignItems='center' direction='column' sx={{minHeight: '100%'}}>
        <Grid item>
            <Paper elevation={5} sx={{padding: '2rem'}}>
                <Grid container justifyContent='space-around' alignItems='center' direction='column' spacing={2}>
                    <Grid item sx={{minWidth: '100%'}}>
                        <Paper elevation={10} sx={{padding: '2rem', minWidth: '600px'}}>
                            <Grid container justifyContent='center' alignItems='flex-end' direction='row' spacing={2}>
                                <Grid item sx={{ minWidth: '80%'}}>
                                    <TextField fullWidth inputRef={searchBar} label="Enter a word" variant="standard" />
                                </Grid>

                                <Grid item>
                                    <Button variant='outlined' disabled={searchInProgess} onClick={() => {
                                        setSearchInProgress(true)

                                        axios.request({
                                            url: globalAPIBaseURL + "/vocabulary/words/" + searchBar.current?.value,
                                            method: "GET",
                                            headers: {
                                                Authorization: "Bearer " + sessionStorage.getItem("token")
                                            }
                                        }).then(({ data }) => {
                                            setSearchInProgress(false)
                                            if (data.status.err == 1) {
                                                window.location.href = "/"
                                            } else {
                                                setSearchResult(data.word != null ? JSON.stringify(data.word, null, 4) : "I think my database is not big enough to find your word, sorry :(")
                                            }
                                        })
                                    }}>Search</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item sx={{minWidth: '100%'}}>
                        <Collapse in={searchResult != null}>
                            <Paper elevation={10} sx={{padding: '2rem', minWidth: '600px'}}>
                                <Typography variant='body2' sx={{whiteSpace: 'pre-wrap', wordWrap: "break-word"}}>
                                    { searchResult ?? "Bruh how is this possible"} { /* TODO GUI-ify this */}
                                </Typography>
                            </Paper>
                        </Collapse>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
}