import { ThemeProvider } from '@emotion/react'
import { Box, Button, Collapse, CssBaseline, Grid, Paper, Toolbar, Typography } from '@mui/material';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { globalTheme } from '../../theme';
import { PageFrame, SideMenu } from '../page-frame';

type ABTestEntry = {
    type: 'etc' | 'cte',
    question: string,
    answerA: string,
    answerB: string,
    correctAnswer: 'A' | 'B',
    resolveAnswer?: string,
    resolveA?: string
    resolveB?: string
}

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
                    <ABTestBody />
                </Grid>
            </Grid>
        </div>
      </ThemeProvider>
    </React.StrictMode>
}

function ABTestBody() {
    const [page, setPage] = React.useState(-1)
    const [performedRanked, setPerformedRanked] = React.useState(true);
    const [pageData, setPageData]: [ABTestEntry[], (value: ABTestEntry[] | ((prevState: ABTestEntry[]) => ABTestEntry[])) => void] = React.useState<ABTestEntry[]>([]);
    
    if (page == -1) {
        return <Grid container justifyContent='center' alignItems='center' direction='column'>
            <Grid item >
                <Box sx={{padding: '2rem'}}>
                    <Paper elevation={5} >
                        <Box sx={{padding: '2rem', maxWidth: '800px'}}>
                            <Grid container justifyContent='center' alignItems='flex-start' direction='column' spacing={2}>
                                <Grid item>
                                    <Typography variant='h3'>
                                        Take a test
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant='h4' color='red'>
                                        [WORK IN PROGRESS]
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant='body1'>
                                        A ranked test is the one will affect your word scores and each day can be performed only once.
                                        A playground test will NOT affect your scores and you can test your self as anytime you like.
                                    </Typography>
                                </Grid>

                                
                                <Grid item>
                                    <Typography variant='body1'>
                                        To be notice that playground will only be unlocked after you finished ranked test everyday.
                                    </Typography>
                                </Grid>

                                <Grid item >
                                    <Grid container justifyContent='space-around' alignItems='center' direction='row' spacing={2}>
                                        <Grid item>
                                            <Button variant='outlined' color='success' disabled={performedRanked}> ranked </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant='outlined' color='info' disabled={!performedRanked} onClick={() => {
                                                // todo fetch data
                                                const someFakeData: ABTestEntry[] = [{
                                                    type: 'etc',
                                                    question: '问题，etc',
                                                    answerA: '正确',
                                                    answerB: '错误',
                                                    correctAnswer: 'A',
                                                    resolveAnswer: '解释答案'
                                                }, {
                                                    type: 'cte',
                                                    question: '问题，cte',
                                                    answerA: '正确',
                                                    answerB: '错误',
                                                    correctAnswer: 'A',
                                                    resolveA: '解释选项A',
                                                    resolveB: '解释选项B'
                                                }, {
                                                    type: 'cte',
                                                    question: '问题，cte',
                                                    answerA: '错误',
                                                    answerB: '正确',
                                                    correctAnswer: 'B',
                                                    resolveA: '解释选项A',
                                                    resolveB: '解释选项B'
                                                }]

                                                setPageData(someFakeData)
                                                setPage(0)
                                            }}> playground </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            

                        </Box>
                    </Paper>
                </Box>
            </Grid>

            <Grid item >
                <Box sx={{padding: '2rem'}}>
                    <Paper elevation={5} sx={{padding: '2rem', maxWidth: '800px'}}>
                    <Box >
                        <Typography variant='h3' gutterBottom>
                            What is AB test?
                        </Typography>
                        
                        <Typography variant='body1' gutterBottom>
                            A AB test is usally used in testing which design (may be a video or a logo design) is more interested to people. 
                            Its really a good tool to rank the options.
                            AB tests can be really accurate when the amount of data is big enough. And this gives me a inspiration.
                            AB test on EL can't be called as AB test since this is not a actully AB test but I still call it(even internally) because I am the creator and I can use any word I like.
                            Lets just focus on what is this and why we gonna to use this. 
                            The test is pretty simple, a word or a explaination showed up as question and two options for you to select. You have to choose the one that matches the question.
                            Also I've got 3 major reasons why we should using AB test in remembering words.
                        </Typography>
                        
                        <Typography variant='body1' gutterBottom>
                            The first reason is that the AB test is easy to perform. There is no complex actions and questions need you to spend time in.
                            According to my experience on performing this test each entry only costs me 15 seconds on average.
                        </Typography>

                        <Typography variant='body1' gutterBottom>
                            The second reason is that the AB test can makes the process of remembering easier. Because choosing from two options can easily tells yourself weither you've already remembered it or not.
                            You may ask me why not simply choose between 'I know it' and 'I dont know it'? Well using the question-answer instead of asking weither you've acknowleged mainly because our brain need a CLEAR feedback on actions(I name this).
                            Have you ever think about why FPS games have only 'headshots' but not seeing any game making 'heartshots'? Thats because 'heartshots' creates a confusion on body-shots and heartshots.
                            This confusion won't gives our brain a clear feedback because its hard to know weither I shoot at heart or body. Heads are better because your body and your head are actully 'limb apart'.
                            So headshots can give a us a CLEAR POSITIVE FEEDBACK and heartshots can't and this feedback makes our brain to remember the actions with less of retries.

                            This logic applys at here as same. We got a clear feedback on the questions so our brain can adjust itself internally to get a better remembering(our brain obviously likes positive feedbacks and try its best to make feedbacks positive).
                        </Typography>

                        <Typography variant='body1' gutterBottom>
                            Besides these, using AB tests can be accurate to predict your remembering progress. Details about how I implement the prediction algorithm and why its accurate please look at back-end of this project
                        </Typography>
                    </Box>
                    </Paper>
                </Box>
            </Grid>


        </Grid>
    } else { // todo <ABTestItem />
        return <>
            { /* Simple trick to remount this component is to update its key. Thanks to @real186526 */ }
            <ABTestItem key={page} isFinalQuestion={!(page < pageData.length - 1)} question={pageData[page]} onNextPage={() => {
                if (page < pageData.length - 1) {
                    setPage(page + 1)
                } else {
                    // todo submit data
                    setPage(-1)
                }
            }}/>
        </>
    }
}

function ABTestItem({ question, onNextPage, isFinalQuestion }: { question: ABTestEntry, onNextPage: () => void, isFinalQuestion: boolean }) {
    const [buttonAColor, setButtonAColor] = React.useState('info');
    const [buttonBColor, setButtonBColor] = React.useState('info');
    const [isButtonADisabled, setButtonADisabled] = React.useState(false);
    const [isButtonBDisabled, setButtonBDisabled] = React.useState(false);
    const [showQExplaination, setShowQExplaination] = React.useState(false);
    const [showProceed, setShowProceed] = React.useState(false);

    return <>
        <Grid container justifyContent='center' alignItems='center' direction='column' sx={{minHeight: '100%'}}>
            <Grid item>
                <Paper elevation={5} sx={{padding: '2rem'}}>
                    <Grid container justifyContent='space-around' alignItems='center' direction='column' spacing={2}>
                        <Grid item sx={{minWidth: '100%'}}>
                            <Paper elevation={10} sx={{padding: '2rem', minWidth: '600px'}}>
                                <Grid container justifyContent='center' alignItems='flex-start' direction='column' spacing={1} >
                                An AB test is usually used in testing which design (maybe a video or a logo design) is more interesting to people. It's really a good tool to rank the options. AB tests can be really accurate when the amount of data is big enough. And this gives me inspiration. AB test on EL can't be called an AB test since this is not an actual AB test but I still call it(even internally) because I am the creator and I can use any word I like. Let's just focus on what is this and why we gonna use this. The test is pretty simple, a word or an explanation showed up as a question, and two options for you to select. You have to choose the one that matches the question. Also, I've got 3 major reasons why we should use the AB test in remembering words.
The first reason is that the AB test is easy to perform. There are no complex actions and questions need you to spend time in. According to my experience in performing this test, each entry only costs me 15 seconds on average.
The second reason is that the AB test can make the process of remembering easier. Because choosing from two options can easily tell you whether you've already remembered it or not. You may ask me why not simply choose between 'I know it' and 'I don't know it'. Well using the question-answer instead of asking whether you've acknowledged it mainly because our brain needs CLEAR feedback on actions(I name this). Have you ever thought about why FPS games have only 'headshots' but not seeing any game making 'heart shots'? That's because 'heart shots' creates confusion on body shots and heart shots. This confusion won't give our brain clear feedback because it's hard to know whether I shoot at the heart or the body. Heads are better because your body and your head are actually 'limb apart'. So headshots can give us a CLEAR POSITIVE FEEDBACK and heart shots can't and this feedback makes our brain remember the actions with less of retries. This logic applies here as same. We got clear feedback on the questions so our brain can adjust itself internally to get a better remembering(our brain obviously likes positive feedback and try its best to make feedback positive).
Besides these, using AB tests can be accurate to predict your remembering progress. For details about how I implement the prediction algorithm and why it's accurate please look at the back end of this project
                                    <Grid item>
                                        <Typography variant='body2'>WHICH OF THE FOLLOWING OPTION IS MATCHED WITH THE WORD BELOW</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Grid container justifyContent='center' alignItems='flex-end' direction='row' spacing={2}>
                                            <Grid item>
                                                <Typography variant='h3'>{question.question}</Typography>
                                            </Grid>

                                            <Grid item>
                                                <Collapse in={showQExplaination}>
                                                    <Typography variant='body2' color='gray' sx={{paddingBottom: '0.4rem'}}>{question.resolveAnswer}</Typography>
                                                </Collapse>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Grid container justifyContent='space-around' alignItems='center' direction='row' spacing={2}>
                                <Grid item>
                                    <BigButton color={buttonAColor} disabled={isButtonADisabled}>
                                        <Typography variant='h3' onClick={() => {
                                            console.log('triggered buttonA: onclick')
                                            if (question.correctAnswer == 'A') {
                                                setButtonAColor('success')
                                            } else {
                                                setButtonAColor('error')
                                            }
                                            setButtonBDisabled(true)
                                            
                                            if (question.type == 'etc') {
                                                setShowQExplaination(true)
                                            }

                                            setShowProceed(true)
                                        }}>{question.answerA}</Typography>
                                    </BigButton>
                                </Grid>

                                <Grid item>
                                    <BigButton color={buttonBColor} disabled={isButtonBDisabled}>
                                        <Typography variant='h3' onClick={() => {
                                            console.log('triggered buttonB: onclick')

                                            if (question.correctAnswer == 'B') {
                                                setButtonBColor('success')
                                            } else {
                                                setButtonBColor('error')
                                            }
                                            setButtonADisabled(true)

                                            if (question.type == 'etc') {
                                                setShowQExplaination(true)
                                            }

                                            setShowProceed(true)
                                        }}>{question.answerB}</Typography>
                                    </BigButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item minWidth='100%'>
                            <Collapse in={showProceed}>
                                <Grid container justifyContent='flex-end' alignItems='center' direction='row' minWidth='100%'>
                                    <Grid item></Grid>
                                    <Grid item minWidth='100%'>
                                        <Button variant='outlined' sx={{minWidth:'100%'}} onClick={onNextPage}> { isFinalQuestion ? "Submit" : "Next Question"} </Button>
                                    </Grid>
                                </Grid>
                            </Collapse>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </>
}

function BigButton(props: any) {
    return <Button {...props} variant='outlined' sx={{
        borderRadius: '10px',
        padding: '2rem'
    }}></Button>
}