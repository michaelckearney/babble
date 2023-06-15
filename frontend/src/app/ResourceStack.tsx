import State from '../State'
import { PropsWithChildren, useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Add from '@mui/icons-material/Add'

import {Reorder} from 'framer-motion'

import ResourceCard from './ResourceCard'

interface ResourceStackProps {
    state: State,
}

export const ResourceStack = (props: PropsWithChildren<ResourceStackProps>) => {
    const [values, setValues] = useState(props.state.state.service.resources)
    useEffect(() => {
        setValues(props.state.state.service.resources)
    }, [props.state.state.service.resources])
    const onReorder = (newValues: any) => {
        props.state.ReorderResources(newValues)
    }
    return (
        <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em" sx={{userSelect: "none"}}>
            <Drawer hideBackdrop variant="permanent" transitionDuration={0} 
                PaperProps={{ 
                    sx: { 
                        position: "absolute", top: 0, bottom: 0, left: 0, paddingRight: "2em", border: "0px", zIndex: 0 } }}>
                <Reorder.Group values={values} onReorder={onReorder} style={{ padding: 0, margin: 0 }}>
                    {
                        values.map((resource: any) => {
                            return (
                                <ResourceCard key={resource.index} state={props.state} resource={resource} />
                            )
                        })
                    }
                </Reorder.Group>
                <Box height="4em" marginLeft="0em" marginRight="0em">
                    <Paper variant="outlined" sx={{height:"4em", width: "18.5em", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Button color="inherit" sx={{height:"100%", width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}
                            onClick={(e: React.MouseEvent) => {
                                props.state.OpenContextMenuAddResource(e.pageX, e.pageY)
                            }}
                            onContextMenu={(e: React.MouseEvent) => {
                                e.preventDefault()
                                props.state.OpenContextMenuAddResource(e.pageX, e.pageY)
                            }}
                        >
                            <Add sx={{fontSize: props.state.state.font * 2}} />
                        </Button>
                    </Paper>
                </Box>
            </Drawer>
        </Box>
    )
}
export default ResourceStack;