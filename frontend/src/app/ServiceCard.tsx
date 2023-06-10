import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import State from '../State'
import ServiceIcon from './ServiceIcon'
import ContextMenuService from './ContextMenuService'
import React from 'react'


interface ServiceCardProps {
    state: State,
    service: typeof State.prototype.state.services[number],
}

export const ServiceCard = (props: ServiceCardProps) => {
    return (
        <ListItem disablePadding sx={{marginBottom: "1em"}}>

            <Paper variant="outlined" sx={{height: "4em", width: "100%"}}>
                <Box position="absolute" width="4em" top="0em" bottom="0em" left="0em" display="flex" alignItems="center" justifyContent="center">
                    <ServiceIcon service={props.service} />
                </Box>
                <Box sx={{cursor: "default"}} position="absolute" top="0" bottom="0" left="4em" right="4em">
                    <Box position="absolute" top={0} bottom="50%" left={0} right={0} display="flex" alignItems="end" paddingLeft="0.5em">
                        <Typography fontSize="1em" marginBottom="-0.1em">
                            <b>{props.service.title}</b>
                        </Typography>
                    </Box>
                    <Box position="absolute" top="50%" bottom={0} left={0} right={0} display="flex" alignItems="start" paddingLeft="0.5em">
                        <Typography fontSize="1em" marginTop="-0.1em">
                            {props.service.subtitle}{["activating", "deactivating", "deleting"].includes(props.service.subtitle) ? "..." : ""}
                        </Typography>
                    </Box>
                </Box>
                <Button color="inherit" sx={{height: "100%", width: "100%"}} onClick={() => {
                    props.state.ViewService(props.service.title)
                }} onContextMenu={(e: React.MouseEvent) => {
                    e.preventDefault()
                    props.state.OpenContextMenuService(props.service.title, e.pageX, e.pageY)
                }}>

                </Button>
            </Paper>

        </ListItem>

    )
}
export default ServiceCard;