import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import PlayArrow from '@mui/icons-material/PlayArrow'
import Replay from '@mui/icons-material/Replay'
import Stop from '@mui/icons-material/Stop'
import Edit from '@mui/icons-material/Edit'
import Link from '@mui/icons-material/Link'
import Delete from '@mui/icons-material/Delete'
import Upload from '@mui/icons-material/Upload'
import Download from '@mui/icons-material/Download'
import Error from '@mui/icons-material/Error'

import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';

import {useState, PropsWithChildren} from 'react'

import State from '../State'
import { Typography } from '@mui/material'

interface ContextMenuServiceProps {
    state: State,
}
export const ContextMenuService = (props: PropsWithChildren<ContextMenuServiceProps>) => {
    
    const options = (
        props.state.state.service.status.status === "active" ? [
            "copy url",
            "edit",
            "reactivate",
            "deactivate",
            "import",
            "export",
            "delete",
        ]: props.state.state.service.status.status === "inactive" ? [
            "edit",
            "activate",
            "import",
            "export",
            "delete",
        ]: props.state.state.service.status.status === "error" ? [
            "view error logs",
            "edit",
            "reactivate",
            "deactivate",
            "import",
            "export",
            "delete",
        ] : props.state.state.service.status.status === "activating" || props.state.state.service.status.status === "deactivating" ? [
            "edit",
            "import",
            "export",
            "delete",
        ]: []
    )

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontSize: props.state.state.font,
        },
    });
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
        typography: {
            fontSize: props.state.state.font,
        },
    });
    
    return (
        
        <ThemeProvider theme={props.state.state.theme === "dark" ? darkTheme : lightTheme}>
            <Box position="relative" top="0em" bottom="0em" left="0em" right="0em">
                <ClickAwayListener onClickAway={() => {
                    if(props.state.state.contextMenuType === "service") {
                        props.state.CloseContextMenuService()
                    }
                }}>
                    <Box position="fixed" 
                        top={"min(" + props.state.state.contextMenuY + "px, 100vh - " + ((options.length * 2.5) + 4).toString() + "em)"} 
                        left={props.state.state.contextMenuX} 
                        display={props.state.state.contextMenuType === "service" ? "block" : "none"}
                    >
    
                        <Paper variant="outlined" sx={{width: "12em"}}>
                            <List disablePadding>
                                <ListItem disablePadding sx={{height: "2.5em"}}>
                                    <Box position="absolute" top="0" bottom="0" left="1em" right="0em" display="flex" alignItems="start" justifyContent="left">
                                        <Typography paddingTop="0.5em">
                                            <b>{props.state.state.contextMenu}</b>
                                        </Typography>
                                    </Box>
                                </ListItem>
                                {options.map((option: string) => (
                                    <ListItem disablePadding key={option} >
                                        <ListItemButton sx={{height: "2.5em"}} onClick={() => {
                                            props.state.HandleContextMenuService(props.state.state.contextMenu, option)
                                        }}>
                                            <Box position="absolute" top="0" bottom="0" left="0" right="0">
                                                <Box position="absolute" top="0" bottom="0" left="0" width="3.5em" display="flex" alignItems="center" justifyContent="center">
                                                    {
                                                        option === "activate" ? (
                                                            <PlayArrow />
                                                        ) : option === "reactivate" ? (
                                                            <Replay />
                                                        ) : option === "deactivate" ? (
                                                            <Stop />
                                                        ) : option === "edit" ? (
                                                            <Edit />
                                                        ) : option === "copy url" ? (
                                                            <Link />
                                                        ): option === "delete" ? (
                                                            <Delete />
                                                        ): option === "import" ? (
                                                            <Upload />
                                                        ): option === "export" ? (
                                                            <Download />
                                                        ): option === "view error logs" ? (
                                                            <Error />
                                                        ): <Box />
                                                    }
                                                </Box>
                                            </Box>
                                            <Box position="absolute" top="0" bottom="0" left="3.75em" right="0" display="flex" alignItems="center" justifyContent="left">
                                                <Typography fontSize="1em">
                                                    {option}
                                                </Typography>
                                            </Box>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                <ListItem disablePadding sx={{height: "0.5em"}} />
                            </List>
                        </Paper>
                    </Box>
                </ClickAwayListener>
            </Box>
        </ThemeProvider>

    )
}
export default ContextMenuService