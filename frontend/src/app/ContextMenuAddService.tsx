import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

import FolderOutlined from '@mui/icons-material/FolderOutlined'
import CloudOutlined from '@mui/icons-material/CloudOutlined'

import blue from '@mui/material/colors/blue'

import {useState, PropsWithChildren} from 'react'

import State from '../State'

interface ContextMenuAddServiceProps {
    state: State,
}

const options = [
    "folder",
    "service",
]

export const ContextMenuAddService = (props: PropsWithChildren<ContextMenuAddServiceProps>) => {
    return (
        <Box position="relative" top="0em" bottom="0em" left="0em" right="0em">
            <ClickAwayListener onClickAway={() => {
                if(props.state.state.contextMenuType === "addService") {
                    props.state.CloseContextMenuService()
                }
            }}>
                <Box 
                    position="fixed" 
                    top={"min(" + props.state.state.contextMenuY + "px, 100vh - " + ((options.length * 2.5) + 4).toString() + "em)"} 
                    left={props.state.state.contextMenuX} 
                    display={props.state.state.contextMenuType === "addService" ? "block" : "none"}
                >
                    <Paper variant="outlined" sx={{width: "12em"}}>
                        <List disablePadding>
                            <ListItem disablePadding key={-1}>
                                <Box height="2.5em" width="100%" paddingLeft="1em" display="flex" alignItems="center">
                                    <Typography paddingTop="0.25em" fontSize="1.1em">
                                        <b>Add Item</b>
                                    </Typography>
                                </Box>
                            </ListItem>
                            {options.map((option: string) => (
                                <ListItem disablePadding key={option}>
                                    <ListItemButton sx={{height: "2.5em"}} onClick={() => {
                                        props.state.HandleContextMenuAddService(option)
                                    }}>
                                        <Box position="absolute" top="0" bottom="0" left="0" right="0">
                                            <Box position="absolute" top="0" bottom="0" left="0" width="3.5em" display="flex" alignItems="center" justifyContent="center">
                                                {
                                                    option === "folder" ? (
                                                        <FolderOutlined sx={{color: blue[500]}} />
                                                    ) : option === "service" ? (
                                                        <CloudOutlined />
                                                    ) : <Box />
                                                }
                                            </Box>
                                            <Box position="absolute" top="0" bottom="0" left="3.75em" right="0" display="flex" alignItems="center" justifyContent="left">
                                                <Typography fontSize="1em">
                                                    {option}
                                                </Typography>
                                            </Box>
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
    )
}
export default ContextMenuAddService