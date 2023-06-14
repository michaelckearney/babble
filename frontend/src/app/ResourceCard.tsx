import State from '../State';
import ResourceSetting from './ResourceSetting';
import { PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Notes from '@mui/icons-material/Notes';
import TextField from '@mui/material/TextField';

import { useEffect, useState } from 'react';

import {Reorder, useDragControls} from 'framer-motion';
import { AccordionDetails, Divider, List, ListItem } from '@mui/material';
import ContextMenuResource from './ContextMenuResource';

interface ResourceProps {
    state: State,
    resource: typeof State.prototype.state.service.resources[number],
}

export const ResourceCard = (props: PropsWithChildren<ResourceProps>) => {
    const dragControls = useDragControls()

    const [value, setValue] = useState(props.resource.title)
    const updateValue = (e: any) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        props.state.ChangeResourceName(props.resource.index, value)
    }, [value])

    return (
        <Reorder.Item value={props.resource} dragControls={dragControls} dragListener={false} style={{display: "block", marginBottom: "1em", width: "18.5em"}}>
            <Accordion disableGutters variant="outlined" expanded={props.resource.expanded}>
                <AccordionSummary sx={{height: "4em"}} expandIcon={
                    <Box onClick={() => {
                        props.state.ExpandResource(props.resource.index)
                    }}>
                        <ExpandMore sx={{fontSize: "2em", cursor: "pointer"}} />
                    </Box>
                    
                } onContextMenu={(e: React.MouseEvent) => {
                    e.preventDefault()
                    props.state.OpenContextMenuResource(props.resource.index.toString(), e.pageX, e.pageY)
                }}>
                    
                    <Box onPointerDown={(e) => {dragControls.start(e)}} sx={{cursor: "move"}} position="absolute" top="0" bottom="0" left="0" width="4em" display="flex" alignItems="center" justifyContent="center">
                        <SvgIcon viewBox="0 -960 960 960" sx={{fontSize: "2em"}}>
                            <path d={props.resource.iconPath} fill={props.resource.iconColor} />
                        </SvgIcon>
                    </Box>
                    <Box sx={{cursor: "default"}} position="absolute" top="0" bottom="0" left="4em" right="4em">
                        <Box position="absolute" top={0} bottom="50%" left={0} right={0} display="flex" alignItems="end" paddingLeft="0.5em">
                            <Typography fontSize="1em" marginBottom="-0.1em">
                                <b>{props.resource.title}</b>
                            </Typography>
                        </Box>
                        <Box position="absolute" top="50%" bottom={0} left={0} right={0} display="flex" alignItems="start" paddingLeft="0.5em">
                            <Typography fontSize="1em" marginTop="-0.1em">
                                {props.resource.subtitle}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{cursor: "default"}} position="absolute" top="0" bottom="0" right="0em" width="4em">

                    </Box>
                </AccordionSummary>
                <Divider />
                <AccordionDetails sx={{padding: 0}}>
                    <List>
                        <ListItem key={-1} disableGutters disablePadding>
                            <Box height="2em" width="100%">
                                <Box position="absolute" top="0" bottom="0" left="0" width="3em" display="flex" alignItems="center" justifyContent="center">
                                    <Notes sx={{fontSize: "1.5em"}}/>
                                </Box>
                                <Box position="absolute" top="0" bottom="0" left="3em" right="50%" display="flex" alignItems="center" justifyContent="left" sx={{cursor: "default"}}>
                                    <Typography fontSize="1em">
                                        name
                                    </Typography>
                                </Box>
                                <Box position="absolute" top="0" bottom="0" left="60%" right="0.5em">
                                    <TextField 
                                        key={-1} 
                                        size="small" 
                                        variant="standard" 
                                        value={value} 
                                        onChange={updateValue}
                                        inputProps = {{
                                            style: {
                                                textAlign: "right",
                                                fontSize: props.state.state.font
                                            }, 
                                        }}
                                    />
                                </Box>
                            </Box>
                        </ListItem>
                        {
                            props.resource.settings.map((setting, index) => (
                                <ListItem key={index} disableGutters disablePadding>
                                    <ResourceSetting state={props.state} resource={props.resource} setting={setting}/>
                                </ListItem>
                            ))
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
        </Reorder.Item>
    )
}
export default ResourceCard;