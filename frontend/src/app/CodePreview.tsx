import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

import MoreVert from '@mui/icons-material/MoreVert'
import Close from '@mui/icons-material/Close'

import red from '@mui/material/colors/red'

import Editor from '@monaco-editor/react'

import {useRef} from 'react'

import State from '../State'
import ServiceIcon from './ServiceIcon'

import MenuService from './MenuService'
import { ThemeProvider } from '@mui/material'
import ErrorOutline from '@mui/icons-material/ErrorOutline'

interface CodePreviewProps {
    state: State
}
export const CodePreview = (props: CodePreviewProps) => {

    const theme = useTheme();
    const monacoRef = useRef(null);

    if (theme.palette.background.default === "#fff") {
        theme.palette.background.default = "#ffffff"
    }
    const handleEditorWillMount = (monaco: any) => {
        monaco.editor.defineTheme('theme1', {
            base: props.state.state.theme === "light" ? "vs" : "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                'editor.background': theme.palette.background.default,
                'scrollbar.shadow': theme.palette.mode === "dark" ? '#000000' : '#ffffff',
            }
        })
    }
    const handleEditorDidMount = (editor: any, monaco: any) => {
        monacoRef.current = monaco;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box display={props.state.state.setting.type !== "code" ? "block" : "none"}>
                <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em">
                    <Box position="absolute" height="4em" top="0em" left="0em" right="0em">
                        <Box position="absolute" width="4em" top="0em" bottom="0em" left="0em" display="flex" alignItems="center" justifyContent="center">
                            {
                                props.state.state.error ? <ErrorOutline sx={{fontSize: "2em", color: red[500]}}/> : <ServiceIcon service={props.state.state.service} />
                            }
                        </Box>
                        <Box position="absolute" top="0em" bottom="0em" left="4em" right="4em">
                            <Box position="absolute" top="0%" bottom="50%" left="0%" right="0%" display="flex" alignItems="end" justifyContent="left" paddingLeft="0.5em">
                                <Typography fontSize="1em" marginBottom="-0.1em">
                                    <b>{props.state.state.service.title}</b>
                                </Typography>
                            </Box>
                            <Box display={props.state.state.error ? "none" : "flex"} position="absolute" top="50%" bottom="0%" left="0%" right="0%" alignItems="start" justifyContent="left" paddingLeft="0.5em">
                                <Typography fontSize="1em" marginTop="-0.1em">
                                    {props.state.state.service.subtitle}{["activating", "deactivating", "deleting"].includes(props.state.state.service.subtitle) ? "..." : ""}
                                </Typography>
                            </Box>
                            <Box display={props.state.state.error ? "flex" : "none"} position="absolute" top="50%" bottom="0%" left="0%" right="0%" alignItems="start" justifyContent="left" paddingLeft="0.5em">
                                <Typography fontSize="1em" marginTop="-0.1em">
                                    error logs
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={props.state.state.error ? "none" : "flex"} position="absolute" width="4em" top="0em" bottom="0em" right="0em" alignItems="center" justifyContent="center" 
                            sx={{cursor: "pointer"}}
                            onClick={() => {
                                props.state.OpenMenuService()
                            }}
                        >
                            <MoreVert sx={{fontSize: "2em"}} />
                        </Box>
                        <Box display={props.state.state.error ? "flex" : "none"} position="absolute" width="4em" top="0em" bottom="0em" right="0em" alignItems="center" justifyContent="center" 
                            sx={{cursor: "pointer"}}
                            onClick={() => {
                                props.state.setState({
                                    ...props.state.state,
                                    error: false,
                                })
                            }}
                        >
                            <Close sx={{fontSize: "2em"}} />
                        </Box>
                    </Box>
                    <Divider sx={{marginTop: "4em"}} />
                    <Box position="absolute" top="4em" bottom="0em" left="0em" right="0em">
                        <MenuService state={props.state} />
                    </Box>
                    <Box position="absolute" top="4.1em" bottom="0em" left="0em" right="0em">
                        <Editor
                            value = {
                                props.state.state.error ? props.state.state.service.status.message : props.state.state.service.configCurrent
                            }
                            beforeMount = {handleEditorWillMount}
                            onMount = {handleEditorDidMount}
                            theme = "theme1"
                            language="ansi"
                            key = {props.state.state.size + props.state.state.theme}
                            options = {{
                                readOnly: true,
                                fontSize: props.state.state.font,
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
export default CodePreview;