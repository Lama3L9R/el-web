import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline, Grid, Paper, Toolbar, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Stack, Chip, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Fab } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { globalAPIBaseURL, globalTheme } from '../theme';
import { PageFrame, SideMenu } from './page-frame';
import axios from 'axios';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

function App() {
  const [showSideMenu, setShowSideMenu] = React.useState(false)
  const [items, setItems] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(0)
  
  useEffect(() => {
    (async function() {
      const payload = (await axios.request({
        url: `${globalAPIBaseURL}/vocabulary/list`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })).data

      if (payload.status.err === 1) {
        window.location.href = "/"
        return null
      }

      setItems(payload.vocabulary)
    })()
  }, [])
  
  return <React.StrictMode>
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />

      <PageFrame onSideMenuClick={()=>setShowSideMenu(true)} />
      <SideMenu showSideMenu={showSideMenu} onClose={()=>setShowSideMenu(false)}/>
      <Toolbar />

      <Vocabulary items={items} />
    </ThemeProvider>
  </React.StrictMode>
}


function Vocabulary({ items }: { items: any[] }) {
  const [isAddationMenuOpen, setAddationMenuOpen] = React.useState(false);
  const addMenuWordInput = React.useRef<HTMLInputElement>(null);

  return <Box sx={{minWidth: '100%', minHeight: '100%'}}>
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing='10'>
      <Grid item>
        <Box paddingTop='1.14514%'>
          <Typography variant="h3" align="center">
            Welcome to EL Vocabulary
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <Typography variant="body1" align="center">
            Welcome to your personalized vocabulary! You can use this website to record all of your unfarmilar words. We provide not just recoding also tests for better remembering words. 
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <Typography variant="body1" align="center">
            Click the add button on bottom right corner to add a new word. Click on the top left menu button to open the side menu which contains testing, account management, and opensource informations
          </Typography>
        </Box>
      </Grid>

      <Grid item  sx={{minWidth: '85%'}}>
        {
          (items as any[]).map((i) => {
            return (<Box>
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item>
                      <Typography sx={{flexShrink: 0 }}>{i.word}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}> {i.translation.replace("\n", " ")} </Typography>
    
                    </Grid>
    
                    <Grid item sx={{paddingRight: '5%'}}>
                      <Stack direction="row" spacing={1}>
                        <Chip label={"BNC #" + i.bnc} color="primary" variant="outlined" />
                        <Chip label={"LR " + i.learningRate} color="success" variant="outlined" />
                      </Stack>
                    </Grid>
    
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction='row' justifyContent='space-around' alignItems='center'>
                    <Grid item sx={{ maxWidth: '40%' }}>
                      <Paper sx={{border: '3px', borderColor: '#000000', padding: '2rem'}} elevation={16}>
                        <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={2}>
                          <Grid item>
                            <Typography variant='h4' align='left' sx={{ paddingRight: '10rem', paddingBottom: '1rem'}}>
                              Exchanged Forms
                            </Typography>
                          </Grid>
    
                          {
                            i.exchange.split("/").map((it: string) => {
                              const [type, word] = it.split(":")
                              return (<Grid item>
                                <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                  {
                                    (() => {
                                      switch (type) {
                                        case "p":
                                          return <>
                                            <Grid item>
                                              <Chip label="Past" color="primary" variant="filled" />
                                            </Grid>
                                        
                                            <Grid item >
                                              <Chip label="General" color="secondary" variant="filled" />
                                            </Grid>
                                          </>
                                        case "d":
                                          return <>
                                            <Grid item>
                                              <Chip label="Past" color="primary" variant="filled" />
                                            </Grid>
                                        
                                            <Grid item >
                                              <Chip label="Participle" color="secondary" variant="filled" />
                                            </Grid>
                                          </>
                                        case "i":
                                          return <>
                                            <Grid item>
                                              <Chip label="Present" color="primary" variant="filled" />
                                            </Grid>
                                        
                                            <Grid item >
                                              <Chip label="Participle" color="secondary" variant="filled" />
                                            </Grid>
                                          </>
                                          default:
                                            return <>
                                              <Grid item >
                                                <Chip label="WIP" color="error" variant="outlined" />
                                              </Grid>
                                            </>
                                      }
                                    })()
                                  }
        
                                  <Grid item>
                                    <Typography variant='body1' align='left'>
                                      { word }
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>)
                            })
                          }
                        </Grid>
                      </Paper>
                    </Grid>
    
                    <Grid item sx={{ maxWidth: '60%' }}>
                      <Paper sx={{border: '3px', borderColor: '#000000', padding: '2rem'}} elevation={16}>
                        <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={2}>
                          <Grid item>
                            <Typography variant='h4' align='left' sx={{ paddingRight: '10rem', paddingBottom: '1rem'}}>
                              Translations
                            </Typography>
                          </Grid>
    
                          {
                            i.definition.split("\n").map((it: any) => {
                              const [type, explain] = it.split(".")

                              return <>
                                <Grid item>
                                  <Grid container direction='row' justifyContent='center' alignItems='center'>
                                    <Grid item sx={{ paddingRight:'1rem' }}>
                                      <Chip label={
                                        ({"v": "Verb", "n": "Noun"} as any)[type]
                                      } color="secondary" variant="filled" />
                                    </Grid>

                                    <Grid item>
                                      <Typography variant='body1' align='left'>
                                        { explain }
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </>
                            })
                          }
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>)
          })
        }
      </Grid>

      <Grid item>
        <Pagination count={10} shape="rounded" />
      </Grid>

      <Fab sx={{ position: 'absolute', bottom: '5%', right: '5%' }} color='primary' onClick={() => setAddationMenuOpen(true)}>
        <AddIcon />
      </Fab>
    </Grid>

    <div>
      <Dialog open={isAddationMenuOpen} onClose={() => setAddationMenuOpen(false)}>
        <DialogTitle>Add a new word</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new word to your personal vocabulary just simply type the word to belowe text field.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="word"
            label="English Word"
            type="text"
            fullWidth
            variant="standard"
            inputRef={addMenuWordInput}
          />

          {
            /*
            <Popover 
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top',horizontal: 'left' }}
            >
              The content of the Popover.
            </Popover>
            */
          }
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='primary' onClick={() => { 
            axios.request({
              url: `${globalAPIBaseURL}/vocabulary/add`,
              method: "POST",
              data: JSON.stringify({
                "word": addMenuWordInput.current?.value
              }),
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
              }
            }).then((i) => {
              window.location.reload()
            })

            setAddationMenuOpen(false) 
          }}>Confirm</Button>
          <Button variant='outlined' color='error' onClick={() => setAddationMenuOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div> 
  </Box>
}
