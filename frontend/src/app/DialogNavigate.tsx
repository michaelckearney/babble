import State from '../State'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import FolderOutlined from '@mui/icons-material/FolderOutlined'
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined'

import blue from '@mui/material/colors/blue'
import orange from '@mui/material/colors/orange'

import Close from '@mui/icons-material/Close'

import {useState} from 'react'

interface DialogNavigateProps {
    state: State,
}
export const DialogNavigate = (props: DialogNavigateProps) => {

    const [filename, setFilename] = useState("")

    return (
        <Dialog open={props.state.state.dialog === "importSource" || props.state.state.dialog === "exportDestination"} 
        onKeyDown={(event) => {
            if (event.key === "Escape") {
                event.preventDefault()
                props.state.CloseDialog()
            }
            if (event.key === "Enter") {
                event.preventDefault()
                props.state.ExportService(filename)
            }
        }}>
            <DialogContent sx={{padding: 0}}>
                <Box height={props.state.state.dialog === "importSource" ? "28em" : "31em"} width="20em">
                    <Box position="absolute" height="3em" top="0em" left="0em" right="0em" paddingLeft="1em" display="flex" alignItems="center" justifyContent="left">
                        <Typography fontSize="1.25em">
                            <b>{
                                props.state.state.dialog === "importSource" ? "Select Source" : 
                                props.state.state.dialog === "exportDestination" ? "Select Destination" :
                                ""
                            }</b>
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
                    <Box marginTop="3em" height="27em" width="100%" overflow="hidden">
                        <Box maxHeight="27em" overflow="auto" marginRight="-1em">
                            <List disablePadding>
                                {
                                    props.state.state.navigation.folder !== "" ? (
                                        <ListItem disableGutters disablePadding key={-1}>
                                            <ListItemButton onClick={() => {
                                                props.state.NavigateParent()
                                            }}>
                                                <ListItemIcon>
                                                    <FolderOutlined sx={{color: blue[500]}} />
                                                </ListItemIcon>
                                                <ListItemText primary=".." sx={{margin: 0}} />
                                            </ListItemButton>
                                        </ListItem>
                                    ): (<Box/>)
                                }
                                {props.state.state.navigation.folders.map((folder: string) => (
                                    <ListItem disableGutters disablePadding key={folder}>
                                        <ListItemButton onClick={() => {
                                            props.state.NavigateChild(folder)
                                        }}>
                                            <ListItemIcon>
                                                <FolderOutlined sx={{color: blue[500]}} />
                                            </ListItemIcon>
                                            <ListItemText primary={folder} sx={{margin: 0}} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                {props.state.state.navigation.files.map((file: string) => (
                                    <ListItem disableGutters disablePadding key={file}>
                                        <ListItemButton onClick={() => {
                                            if(props.state.state.dialog === "importSource") {
                                                props.state.ImportService(file)
                                            } 
                                            else if(props.state.state.dialog === "exportDestination") {
                                                // props.state.ExportService(file)
                                                setFilename(file)
                                            }
                                        }}>
                                            <ListItemIcon>
                                                <DescriptionOutlined sx={{color: orange[500]}} />
                                            </ListItemIcon>
                                            <ListItemText primary={file} sx={{margin: 0}} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                    
                            </List>
                        </Box>
                    </Box>
                    <Box display={props.state.state.dialog === "exportDestination" ? "block": "none"}>
                    <Box position="absolute" top="30em" left="0em" right="0em" height="4em" display="flex" alignItems="center">

                        <TextField size="small" value={filename} onChange={(e) => {setFilename(e.target.value)}} sx={{position: "absolute", left: "1em", right: "1em"}}>

                        </TextField>
                    </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DialogNavigate