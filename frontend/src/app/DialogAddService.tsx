import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Close from '@mui/icons-material/Close'

import {useState} from 'react'

import State from '../State'

interface DialogAddServiceProps {
    state: State,
}
export const DialogAddService = (props: DialogAddServiceProps) => {

    const [name, setName] = useState("")

    return (
        <Dialog open={props.state.state.dialog === "addService"}>
            <DialogContent sx={{padding: 0}}>
                <Box height="4em" width="20em">
                    <Box position="absolute" height="3em" top="0em" left="0em" right="0em" paddingLeft="1em" display="flex" alignItems="center" justifyContent="left">
                        <Typography fontSize="1.25em">
                            <b>Enter Service Name</b>
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
                    <Box marginTop="3em" height="3em" width="100%" paddingTop="0.25em" display="flex" alignItems="start" justifyContent="center" overflow="hidden">
                        <TextField size="small" sx={{width: "18em"}} 
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    props.state.AddService(name)
                                }
                            }}

                        >

                        </TextField>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default DialogAddService