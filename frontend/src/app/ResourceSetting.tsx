import State from '../State';

import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Notes from '@mui/icons-material/Notes';
import Check from '@mui/icons-material/Check';
import Code from '@mui/icons-material/Code';

import Dropdown from './Dropdown';

interface ResourceSettingProps {
    state: State,
    resource: typeof State.prototype.state.resource,
    setting: typeof State.prototype.state.resource.settings[number],
}

export const ResourceSetting = (props: ResourceSettingProps) => {

    const [value, setValue] = useState(props.setting.value)
    useEffect(() => {
        setValue(props.setting.value)
    }, [props.setting.value])
    const onChange = (e: any) => {
        setValue(e.target.value)
        props.state.ChangeResourceSetting(props.resource.index, props.setting.title, e.target.value)
    }

    if (props.setting.type == "text") {
        return (
            <Box height="2em" width="100%">
                <Box position="absolute" top="0" bottom="0" left="0" width="3em" display="flex" alignItems="center" justifyContent="center">
                    <Notes sx={{fontSize: "1.5em"}}/>
                </Box>
                <Box position="absolute" top="0" bottom="0" left="3em" right="50%" display="flex" alignItems="center" justifyContent="left" sx={{cursor: "default"}}>
                    <Typography fontSize="1em">
                        {props.setting.title}
                    </Typography>
                </Box>
                <Box position="absolute" top="0" bottom="0" left="60%" right="0.5em">
                    <TextField inputProps={{style: {textAlign: "right", fontSize: props.state.state.font}}} variant="standard" size="small" value={value} onChange={onChange}></TextField>
                </Box>
            </Box>
        )
    } else if (props.setting.type == "select") {
        return (
            <Box height="2em" width="100%">
                <Box position="absolute" top="0" bottom="0" left="0" width="3em" display="flex" alignItems="center" justifyContent="center">
                    <Check sx={{fontSize: "1.5em"}}/>
                </Box>
                <Box position="absolute" top="0" bottom="0" left="3em" right="50%" display="flex" alignItems="center" justifyContent="left" sx={{cursor: "default"}}>
                    <Typography fontSize="1em">
                        {props.setting.title}
                    </Typography>
                </Box>
                <Box position="absolute" top="0" bottom="0" left="60%" right="0.5em" sx={{cursor: "pointer"}}>
                    {/* <TextField inputProps={{readOnly: true, style: {textAlign: "right", cursor: "pointer"}}} variant="standard" size="small" value={value}></TextField> */}
                    <Dropdown state={props.state} resource={props.resource.index} setting={props.setting.title} value={props.setting.value} />
                </Box>
            </Box>
        )
    } else if (props.setting.type == "code") {
        return (
            <Box height="2em" width="100%">
                <Box position="absolute" top="0" bottom="0" left="0" width="3em" display="flex" alignItems="center" justifyContent="center">
                    <Code sx={{fontSize: "1.5em"}}/>
                </Box>
                <Box position="absolute" top="0" bottom="0" left="3em" right="50%" display="flex" alignItems="center" justifyContent="left" sx={{cursor: "default"}}>
                    <Typography fontSize="1em">
                        {props.setting.title}
                    </Typography>
                </Box>
                <Box position="absolute" top="0" bottom="0" left="60%" right="0.5em" sx={{cursor: "pointer"}}>
                    <TextField inputProps={{readOnly: true, style: {textAlign: "right", cursor: "pointer", fontSize: props.state.state.font}}} variant="standard" size="small" value="..."
                        onClick={() => {
                            props.state.OpenResourceSetting(props.resource.index, props.setting.title)
                        }}
                    />
                
                </Box>
            </Box>
        )
    } else {
        return (
            <Box />
        )
    }
}
export default ResourceSetting;