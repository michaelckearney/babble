import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import useTheme from '@mui/material/styles/useTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Close from '@mui/icons-material/Close'

import Editor from '@monaco-editor/react'

import State from '../State'
import ServiceIcon from './ServiceIcon'

import {useRef} from 'react'

interface CodeEditorProps {
    state: State
}
export const CodeEditor = (props: CodeEditorProps) => {

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
        <Box display={props.state.state.setting.type === "code" ? "block" : "none"} zIndex={9}>
            <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em">
                <Box position="absolute" height="4em" top="0em" left="0em" right="0em">
                    <Box position="absolute" width="4em" top="0em" bottom="0em" left="0em" display="flex" alignItems="center" justifyContent="center">
                        <SvgIcon viewBox="0 -960 960 960" sx={{fontSize: "2em"}}>
                            <path d={props.state.state.resource.iconPath} fill={props.state.state.resource.iconColor} />
                        </SvgIcon>
                    </Box>
                    <Box position="absolute" top="0em" bottom="0em" left="4em" right="4em">
                        <Box position="absolute" top="0%" bottom="50%" left="0%" right="0%" display="flex" alignItems="end" justifyContent="left" paddingLeft="0.5em">
                            <Typography fontSize="1em" marginBottom="-0.1em">
                                <b>{props.state.state.resource.title} - {props.state.state.setting.title}</b>
                            </Typography>
                        </Box>
                        <Box position="absolute" top="50%" bottom="0%" left="0%" right="0%" display="flex" alignItems="start" justifyContent="left" paddingLeft="0.5em">
                            <Typography fontSize="1em" marginTop="-0.1em">
                                {props.state.state.resource.subtitle}
                            </Typography>
                        </Box>
                    </Box>
                    <Box position="absolute" width="4em" top="0em" bottom="0em" right="0em" display="flex" alignItems="center" justifyContent="center" sx={{cursor: "pointer"}} onClick={() => {
                        props.state.CloseResourceSetting()
                    }}>
                        <Close sx={{fontSize: "2em"}} />
                    </Box>
                </Box>
                <Divider sx={{marginTop: "4em"}} />
                <Box position="absolute" top="4.1em" bottom="0em" left="0em" right="0em">
                    <Editor
                        value = {props.state.state.setting.value}
                        beforeMount = {handleEditorWillMount}
                        onMount = {handleEditorDidMount}
                        theme = "theme1"
                        key = {props.state.state.size + props.state.state.theme}
                        language = "python"
                        onChange = {(e: any) => {
                            props.state.ChangeResourceSetting(props.state.state.resource.index, props.state.state.setting.title, e)
                        }}
                        options = {{
                            fontSize: props.state.state.font,
                        }}
                    />
                </Box>
            </Box>
        </Box>
        </ThemeProvider>
    )
}
export default CodeEditor