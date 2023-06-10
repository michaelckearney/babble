import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import SvgIcon from '@mui/material/SvgIcon'
import Drawer from '@mui/material/Drawer'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'

import Close from '@mui/icons-material/Close'
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium'
import FormatSizeIcon from '@mui/icons-material/FormatSize'

import createTheme from '@mui/material/styles/createTheme'

import State from '../State'

import DropdownSettings from './DropdownSettings'

interface DialogSettingsProps {
    state: State,
}
export const DialogSettings = (props: DialogSettingsProps) => {



    return (
        
        <Box position="fixed" top="0em" bottom="0em" left="0em" right="0em" display={props.state.state.dialog === "settings" ? "flex" : "none"} alignItems="center" justifyContent="center" sx={{userSelect: "none"}}>
            <Modal open={props.state.state.dialog === "settings"} disableAutoFocus disableEnforceFocus sx={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Box fontSize={props.state.state.font} display="flex" alignItems="center" justifyContent="center">
                    <Paper variant="outlined" sx={{height: "9em", width: "20em", position: "absolute", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
                        <Box position="absolute" height="3em" top="0em" left="0em" right="0em" paddingLeft="1em" display="flex" alignItems="center" justifyContent="left">
                            <Typography fontSize="1.25em">
                                <b>Settings</b>
                            </Typography>
                            <Box position="absolute" width="3em" top="0em" bottom="0em"  right="0em" display="flex" alignItems="center" justifyContent="center"
                                sx={{cursor: "pointer"}}
                                onClick={(event) => {
                                    props.state.CloseDialog()
                                }}
                            >
                                <Close sx={{fontSize: "1.5em"}}/>
                            </Box>
                        </Box>
                        <Box position="absolute" top="3em" left="0em" right="0em" height="2.5em">
                            <Box position="absolute" top="0em" bottom="0em" left="0em" width="4em" display="flex" alignItems="center" justifyContent="center" fontSize="1em">
                                <BrightnessMediumIcon />
                            </Box>
                            <Box position="absolute" top="0" bottom="0" left="4em" right="50%" display="flex" alignItems="center" justifyContent="left" sx={{cursor: "default"}}>
                                <Typography fontSize="1em">
                                    theme
                                </Typography>
                            </Box>
                            <Box position="absolute" top="0" bottom="0" left="60%" right="1em" sx={{cursor: "pointer", zIndex: 9999}}>
                                <DropdownSettings state={props.state} type="dropdownTheme" />
                            </Box>
                        </Box>
                        <Box position="absolute" top="5.5em" left="0em" right="0em" height="2.5em">
                            <Box position="absolute" top="0em" bottom="0em" left="0em" width="4em" display="flex" alignItems="center" justifyContent="center" fontSize="1em">
                                <FormatSizeIcon />
                            </Box>
                            <Box position="absolute" top="0" bottom="0" left="4em" right="50%" display="flex" alignItems="center" justifyContent="left" sx={{cursor: "default"}}>
                                <Typography fontSize="1em">
                                    size
                                </Typography>
                            </Box>
                            <Box position="absolute" top="0" bottom="0" left="60%" right="1em" sx={{cursor: "pointer"}}>
                                <DropdownSettings state={props.state} type="dropdownSize" />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        </Box>
    )
}
export default DialogSettings