import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import State from '../State';


interface DropdownProps {
    state: State,
    resource: number,
    setting: string,
    value: string,
}

export const Dropdown = (props: DropdownProps) => {
    return (
        <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em">
            <Box onClick={() => {
                props.state.OpenDropdown(props.resource, props.setting)
            }}>
                <TextField variant="standard" size="small" 
                    inputProps={{
                        readOnly: true, 
                        style: {
                            textAlign: "right", 
                            cursor: "pointer",
                            fontSize: props.state.state.font,
                        }
                    }} 
                    value={
                        props.value
                        // props.state.state.service.resources.find((resource) => resource.index === props.resource)?.settings.find((setting) => setting.title === props.setting)?.value || "test"
                    }
                >
                </TextField>
            </Box>
            <Box zIndex={9999} position="absolute" top="100%" left="0%" right="0%"
                display={
                    props.state.state.contextMenu.split(":")[0] === props.resource.toString() && props.state.state.contextMenu.split(":")[1] === props.setting ? "block" : "none"
                }
            >
                {/* <ClickAwayListener onClickAway={() => {
                    if(props.state.state.contextMenuType === "dropdown") {
                        props.state.CloseDropdown()
                    }
                }}> */}
                    <Paper variant="outlined" sx={{position: "absolute", top: "-0.2em", left: 0, right: 0, borderRadius: 0}}>
                        <List>
                            {props.state.state.contextMenuOptions.map((option: string) => (
                                <ListItem disablePadding key={option}>
                                    <ListItemButton disableGutters sx={{padding: 0}} onClick={() => {
                                        props.state.HandleDropdown(option)
                                    }}>
                                        <ListItemText primary={option} sx={{margin: "0.1em", textAlign: "right", paddingRight: "0.5em"}}></ListItemText>
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
export default Dropdown