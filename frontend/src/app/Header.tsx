import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Cloud from '@mui/icons-material/Cloud'
import Settings from '@mui/icons-material/Settings'

import State from '../State'

interface HeaderProps {
    state: State
}
export const Header = (props: HeaderProps) => {
    return (
        <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em">
            <Box position="absolute" width="4em" top="0em" bottom="0em" left="0em" display="flex" alignItems="center" justifyContent="center">
                <Cloud sx={{fontSize: "2em"}} />
            </Box>
            <Box position="absolute" top="0em" bottom="0em" left="4em" right="4em" display="flex" alignItems="center" justifyContent="left">
                <Typography fontSize="1.5em" sx={{userSelect: "none"}}>
                    <Box component="span" sx={{cursor: "default"}}
                        display={props.state.state.page === "workspace" && props.state.state.workspace === "" ? "inline": "none"}
                    >
                        <b>
                            &ensp;Welcome to Babble!
                        </b>
                    </Box>
                    <Box
                        component = "span"
                        display = {
                            props.state.state.workspace !== "" &&  (
                                props.state.state.page === "service" || 
                                props.state.state.page === "workspace"
                            ) ? "inline": "none"
                        }
                    >
                        <Box 
                            component="span"
                            sx={{
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                props.state.ViewWorkspaceParent()
                            }}
                        >
                            <b>
                                &ensp;/&ensp;..
                            </b>
                        </Box>
                        <Box 
                            component="span"
                            sx={{
                                cursor: props.state.state.page === "service" ? "pointer": "default"
                            }}
                            onClick={() => {
                                props.state.CloseService()
                            }}
                        >
                            <b>
                                &ensp;/&ensp;{props.state.state.workspace}
                            </b>
                        </Box>
                    </Box>
                    <Box component="span"
                        display={props.state.state.page === "service" ? "inline": "none"}
                        sx={{
                            cursor: "default"
                        }}
                    >
                        <b>
                            &ensp;/&ensp;{props.state.state.service.title}
                        </b>
                    </Box>
                </Typography>
            </Box>
            <Box position="absolute" width="4em" top="0em" bottom="0em" right="0em" display="flex" alignItems="center" justifyContent="center" 
                sx={{cursor: "pointer"}}
                onClick={() => {
                    props.state.OpenSettings()
                }}
            >
                <Settings sx={{fontSize: "2em"}} />
            </Box>
        </Box>
    )
}
export default Header