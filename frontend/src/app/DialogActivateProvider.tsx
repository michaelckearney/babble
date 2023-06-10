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

import Close from '@mui/icons-material/Close'

import State from '../State'

interface DialogActivateProviderProps {
    state: State,
}
export const DialogActivateProvider = (props: DialogActivateProviderProps) => {
    return (
        <Dialog open={props.state.state.dialog === "activateProvider"}>
            <DialogContent sx={{padding: 0}}>
                <Box height="7em" width="20em">
                    <Box position="absolute" height="3em" top="0em" left="0em" right="0em" paddingLeft="1em" display="flex" alignItems="center" justifyContent="left">
                        <Typography fontSize="1.25em">
                            <b>Select a Provider</b>
                        </Typography>
                        <Box position="absolute" width="3em" top="0em" bottom="0em"  right="0em" display="flex" alignItems="center" justifyContent="center"
                            sx={{cursor: "pointer"}}
                            onClick={() => {
                                props.state.CloseDialog()
                            }}
                        >
                            <Close sx={{fontSize: "1.5em"}}/>
                        </Box>
                    </Box>
                    <Box position="absolute" top="3em" left="0em" right="0em">
                        <List>
                            {props.state.state.presets.providers.map((provider) => (
                                <ListItem disablePadding key={provider.title}>
                                    <ListItemButton onClick={() => {
                                        props.state.HandleActivateProvider(provider.title)
                                    }}>
                                        <ListItemIcon>
                                            <SvgIcon viewBox={provider.iconViewBox}>
                                                <path d={provider.iconPath} fill={provider.iconColor} />
                                            </SvgIcon>
                                        </ListItemIcon>
                                        <ListItemText primary={provider.title} sx={{margin: 0}} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>

                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DialogActivateProvider