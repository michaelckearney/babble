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
import Button from '@mui/material/Button'

import Close from '@mui/icons-material/Close'

import State from '../State'
import { ChangeCredentialValue } from '../../wailsjs/go/main/App';

interface DialogActivateCredentialsProps {
    state: State,
}
export const DialogActivateCredentials = (props: DialogActivateCredentialsProps) => {
    return (
        <Dialog open={["activateCredentials", "deactivateCredentials", "deleteCredentials"].includes(props.state.state.dialog)}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    event.preventDefault()
                    if (props.state.state.dialog === "activateCredentials") {
                        props.state.HandleActivateCredentials()
                    } else if (props.state.state.dialog === "deactivateCredentials") {
                        props.state.HandleDeactivateCredentials()
                    } else if (props.state.state.dialog === "deleteCredentials") {
                        props.state.HandleDeleteCredentials()
                    }
                } else if (event.key === "Escape") {
                    event.preventDefault()
                    props.state.CloseDialog()
                }
            }}
        >
            <DialogContent sx={{padding: 0}}>
                <Box width="20em">
                    <Box position="absolute" height="3em" top="0em" left="0em" right="0em" paddingLeft="1em" display="flex" alignItems="center" justifyContent="left">
                        <Typography fontSize="1.25em">
                            <b>Enter your Credentials</b>
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
                    <Box marginTop="3em" width="100%">
                        <List>
                            {props.state.state.presets.providers.find((provider) => provider.title === props.state.state.provider)?.credentials.map((credential) => (
                                <ListItem disablePadding key={credential.label}>
                                    <Box height="2.5em" width="100%">
                                        <Box position="absolute" top="0%" bottom="0%" left="0%" right="50%" paddingLeft="1em">
                                            <Typography>
                                                {credential.label}
                                            </Typography>
                                        </Box>
                                        <Box position="absolute" top="0%" bottom="0%" left="50%" right="0%" paddingRight="1em">
                                            <TextField variant="standard" size="small" sx={{width: "100%"}} inputProps={{style: {textAlign: "right"}}}
                                                value={props.state.state.presets.providers.find(
                                                        (provider) => {
                                                            return provider.title === props.state.state.provider
                                                        }
                                                    )?.credentials.find(
                                                        (credential2) => {
                                                            return credential2.label === credential.label
                                                        }
                                                    )?.value
                                                }
                                                onChange={(e) => {
                                                    props.state.ChangeCredentialValue(props.state.state.provider, credential.label, e.target.value)
                                                }}
                                            >

                                            </TextField>
                                        </Box>
                                    </Box>
                                </ListItem>
                            ))}
                            <ListItem disablePadding>
                                <Box height="1em" width="100%">

                                </Box>
                            </ListItem>
                            {/* <ListItem disablePadding>
                                <Box height="2.5em" width="100%" paddingRight="1em" display="flex" alignItems="center" justifyContent="right">
                                    <Button>
                                        Activate
                                    </Button>
                                </Box>
                            </ListItem> */}
                        </List>

                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DialogActivateCredentials