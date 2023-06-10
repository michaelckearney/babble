import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import SvgIcon from '@mui/material/SvgIcon'

import Notes from '@mui/icons-material/Notes';
import Check from '@mui/icons-material/Check';
import Code from '@mui/icons-material/Code';




import State from '../State';


interface DropdownSettingsProps {
    state: State,
    type: string,
}


export const DropdownSettings = (props: DropdownSettingsProps) => {
    return (
        <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em" display="flex" alignItems="center" onClick={() => {
            
        }}>
            <Box onClick={() => {
                if (props.type === "dropdownTheme") {
                    props.state.OpenDropdownTheme()
                } else if (props.type === "dropdownSize") {
                    props.state.OpenDropdownSize()
                }
            }}>
                <TextField variant="standard" size="small" 
                    inputProps={{
                        readOnly: true, 
                        style: {
                            textAlign: "right", 
                            cursor: "pointer",
                            fontSize: props.state.state.font,
                        },
                    }} 
                    value={
                        props.type === "dropdownTheme" ? props.state.state.theme : 
                        props.type === "dropdownSize" ? props.state.state.size : 
                        ""
                    }
                >
                </TextField>
            </Box>
            <Box position="absolute" top="100%" left="0%" right="0%"
                display={
                    props.state.state.contextMenuType === props.type ? "block" : "none"
                }
            >
                {/* <ClickAwayListener onClickAway={() => {
                    if (props.state.state.contextMenuType === "dropdownTheme" || props.state.state.contextMenuType === "dropdownSize") {
                        setTimeout(() => {
                            if (props.type === "dropdownTheme") {
                                props.state.HandleDropdownTheme(props.state.state.theme)
                            } else if (props.type === "dropdownSize") {
                                props.state.HandleDropdownSize(props.state.state.size)
                            }
                        }, 500)
                    }
                }}> */}
                    <Paper variant="outlined" sx={{position: "absolute", top: "-0.6em", left: 0, right: 0, borderRadius: 0}}>
                        <List>
                            {props.state.state.contextMenuOptions.map((option: string) => (
                                <ListItem disablePadding key={option}>
                                    
                                    <ListItemButton disableGutters sx={{padding: 0}} onClick={(event) => {
                                        if (props.type === "dropdownTheme") {
                                            props.state.HandleDropdownTheme(option)
                                        } else if (props.type === "dropdownSize") {
                                            props.state.HandleDropdownSize(option)
                                        }
                                    }}>
                                        <Box height="2em" width="100%">
                                            <Typography fontSize="1em" position="absolute" top="0" bottom="0" left="0" right="0" display="flex" alignItems="center" justifyContent="right" paddingRight="0.5em">
                                                {option}
                                            </Typography>
                                        </Box>
                                        {/* <ListItemText primary={option} sx={{margin: "0.1em", textAlign: "right", paddingRight: "0.5em", fontSize: props.state.state.font}}></ListItemText> */}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                {/* </ClickAwayListener> */}
            </Box>
        </Box>
    )
}
export default DropdownSettings