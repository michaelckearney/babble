import {useState, useEffect, useRef} from 'react';
import {NewState} from '../wailsjs/go/main/App';

import {IState, State} from './State';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import createTheme from '@mui/material/styles/createTheme';

import ResourceStack from './app/ResourceStack';
import ServiceStack from './app/ServiceStack';
import CodePreview from './app/CodePreview'
import CodeEditor from './app/CodeEditor'
import Header from './app/Header'
import ContextMenuService from './app/ContextMenuService'
import ContextMenuAddService from './app/ContextMenuAddService'
import ContextMenuResource from './app/ContextMenuResource'
import ContextMenuAddResource from './app/ContextMenuAddResource'
import DialogAddService from './app/DialogAddService'
import DialogAddFolder from './app/DialogAddFolder'
import DialogActivateProvider from './app/DialogActivateProvider';
import DialogActivateCredentials from './app/DialogActivateCredentials';
import DialogNavigate from './app/DialogNavigate';
import DialogSettings from './app/DialogSettings';
import { ThemeProvider } from '@emotion/react';



type IntervalFunction = () => ( unknown | void )

function useInterval( callback: IntervalFunction, delay: number ) {
  const savedCallback = useRef<IntervalFunction| null>( null )
  useEffect( () => {
    savedCallback.current = callback
  } )
  useEffect( () => {
    function tick() {
      if ( savedCallback.current !== null ) {
        savedCallback.current()
      }
    }
    const id = setInterval( tick, delay )
    return () => clearInterval( id )
  }, [ delay ] )
}
  
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


function App() {

    const [getState, setState] = useState<IState>({
        page: 'home',
        workspace: '',
        folder: '',
        files: [],
        subfolders: [],
        services: [],
        service: {
            file: '',
            title: '',
            subtitle: '',
            iconPath: '',
            iconColor: '',
            configSaved: '',
            configCurrent: '',
            status: {
                status: '',
                message: '',
                url: '',
            },
            resources: [],
        },
        resource: {
            index: -1,
            title: '',
            subtitle: '',
            iconPath: '',
            iconColor: '',
            expanded: false,
            settings: [],
        },
        setting: {
            title: '',
            type: '',
            value: '',
            options: [],
        },
        dialog: '',
        contextMenuType: '',
        contextMenu: '',
        contextMenuOptions: [],
        contextMenuX: 0,
        contextMenuY: 0,
        presets: {
            resources: [],
            providers: [],
            icons: [],
        },
        action: '',
        provider: '',
        navigation: {
            folder: '',
            folders: [],
            files: [],
        },
        size: 'medium',
        font: 16,
        theme: 'light',
        error: false,
    })
    const state = new State(getState, setState)

    useEffect(() => {
        console.log(state.state)
    }, [state])
    
    useEffect(() => {
        state.TestState()
    }, [])
    useInterval(() => {
        state.SaveFiles()
        state.LoadStatus()
    }, 1000)

    const theme = createTheme({
        typography: {
            fontSize: state.state.font,
        },
    })


    return (
        <Box fontSize={state.state.font}>
        <ThemeProvider theme={state.state.theme === "dark" ? darkTheme : lightTheme}>
        <Box>
        
        <Paper variant="outlined" sx={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, borderRadius: 0}}>
            
            <Box position="absolute" top="0em" height="5.5em" left="0em" right="0em">
                <Box position="absolute" top="1em" bottom="0.5em" left="1em" right="1em">
                    <Paper variant="outlined" sx={{position: "absolute", top: "0em", bottom: "0em", left: "0em", right: "0em"}}>
                        <Header state={state} />
                    </Paper>
                </Box>
            </Box>
            <Box position="absolute" top="5.5em" bottom="0em" left="0em" width="20em" sx={{userSelect: "none"}}>
                <Box position="absolute" top="0.5em" bottom="1em" left="1em" right="0.5em" sx={{userSelect: "none"}}>
                    {
                        state.state.page === 'home' ? (
                            <Box></Box>
                        ) : state.state.page === 'workspace' ? (
                            <ServiceStack state={state} />
                        ) : state.state.page === 'service' ? (
                            <ResourceStack state={state} />
                        ) : (<Box />)
                    }
                </Box>
            </Box>
            <Box position="absolute" top="5.5em" bottom="0em" left="20em" right="0em">
                <Box position="absolute" top="0.5em" bottom="1em" left="0.5em" right="1em">
                    <Paper variant="outlined" sx={{position: "absolute", top: "0em", bottom: "0em", left: "0em", right: "0em"}}>
                        <CodePreview state={state} />
                        <CodeEditor state={state} />
                    </Paper>
                </Box>
            </Box>
        </Paper>
        <ContextMenuService state={state} />
        <ContextMenuAddService state={state} />
        <ContextMenuResource state={state} />
        <ContextMenuAddResource state={state} />
        <DialogAddService state={state} />
        <DialogAddFolder state={state} />
        <DialogActivateProvider state={state} />
        <DialogActivateCredentials state={state} />
        <DialogNavigate state={state} />
        <DialogSettings state={state} />
        </Box>
        </ThemeProvider>
        </Box>
    )
}

export default App
