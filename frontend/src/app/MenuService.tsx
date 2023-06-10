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
import Close from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme';
import Error from '@mui/icons-material/Error'

import {useState, PropsWithChildren} from 'react'

import State from '../State'



interface MenuServiceProps {
    state: State,
}
export const MenuService = (props: PropsWithChildren<MenuServiceProps>) => {

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
    
    const options = (
        props.state.state.page !== "service" ? (
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
                "deactivate",
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
            ]: []
        ) : (
            props.state.state.service.status.status === "active" ? [
                "copy url",
                "exit",
                "reactivate",
                "deactivate",
                "import",
                "export",
                "delete",
            ]: props.state.state.service.status.status === "inactive" ? [
                "exit",
                "activate",
                "deactivate",
                "import",
                "export",
                "delete",
            ]: props.state.state.service.status.status === "error" ? [
                "view error logs",
                "exit",
                "reactivate",
                "deactivate",
                "import",
                "export",
                "delete",
            ]: []
        )
    )
    
    return (
        <ThemeProvider theme={props.state.state.theme === "dark" ? darkTheme : lightTheme}>
            <Box position="relative" top="0em" bottom="0em" left="0em" right="0em">
                <ClickAwayListener onClickAway={() => {
                    if(props.state.state.contextMenuType === "serviceMenu") {
                        props.state.CloseContextMenuService()
                    }
                }}>
                    <Box position="absolute" 
                        top="0em"
                        right="-1px"
                        display={props.state.state.contextMenuType === "serviceMenu" ? "block" : "none"}
                        zIndex={99}
                    >
                        <Paper variant="outlined" sx={{width: "12em", borderRadius: 0}}>
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
                                                if(option === "copy url") {
                                                    navigator.clipboard.writeText(props.state.state.service.status.url)
                                                }
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
                                                            ): option === "exit" ? (
                                                                <Close />
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
export default MenuService