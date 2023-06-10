import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

import {useState, PropsWithChildren} from 'react'

import State from '../State'

interface ContextMenuAddResourceProps {
    state: State,
}
export const ContextMenuAddResource = (props: PropsWithChildren<ContextMenuAddResourceProps>) => {
    return (
        <Box position="relative" top="0em" bottom="0em" left="0em" right="0em">
            <ClickAwayListener onClickAway={() => {
                if(props.state.state.contextMenuType === "addResource") {
                    props.state.CloseContextMenuAddResource()
                }
            }}>
                <Box position="fixed" 
                    top={"min(" + props.state.state.contextMenuY + "px, calc(100vh - " + ((props.state.state.presets.resources.length * 2.5) + 4).toString() + "em))"} 
                    left={props.state.state.contextMenuX} 
                    display={props.state.state.contextMenuType === "addResource" ? "block" : "none"} 
                    zIndex={99}
                >
                    <Paper variant="outlined" sx={{width: "12em"}}>
                        <List disablePadding>
                            <ListItem disablePadding key={-1}>
                                <Box height="2.5em" width="100%" paddingLeft="1em" display="flex" alignItems="center">
                                    <Typography paddingTop="0.25em" fontSize="1.1em">
                                        <b>Add Resource</b>
                                    </Typography>
                                </Box>
                            </ListItem>
                            {props.state.state.presets.resources.map((resource) => (
                                <ListItem disablePadding key={resource.title}>
                                    <ListItemButton sx={{height: "2.5em"}} onClick={() => {
                                        props.state.HandleContextMenuAddResource(resource.title)
                                    }}>
                                        <Box position="absolute" top="0" bottom="0" left="0" right="0">
                                            <Box position="absolute" top="0" bottom="0" left="0" width="3.5em" display="flex" alignItems="center" justifyContent="center">
                                                <SvgIcon viewBox="0 -960 960 960">
                                                    <path d={resource.iconPath} fill={resource.iconColor} />
                                                </SvgIcon>
                                            </Box>
                                            <Box position="absolute" top="0" bottom="0" left="3.75em" right="0" display="flex" alignItems="center" justifyContent="left">
                                                <Typography fontSize="1em">
                                                    {resource.title}
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
export default ContextMenuAddResource