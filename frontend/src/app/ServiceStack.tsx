import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import Add from '@mui/icons-material/Add'

import State from '../State'
import ServiceCard from './ServiceCard'
import FolderCard from './FolderCard'
import ContextMenuService from './ContextMenuService'


import ContextMenuAddService from './ContextMenuAddService'
import DialogAddService from './DialogAddService'


interface ServiceStackProps {
    state: State,
}

export const ServiceStack = (props: ServiceStackProps) => {
    return (
        <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em">
            <Drawer hideBackdrop variant="permanent" transitionDuration={0}
                PaperProps={{ 
                    sx: { position: "absolute", top: 0, bottom: 0, left: 0, paddingRight: "2em", border: "0px", zIndex: 0 } 
                }} >
                <List disablePadding>
                    {
                        props.state.state.subfolders.map((subfolder: string) => (
                            <FolderCard key={subfolder} state={props.state} folder={subfolder} />
                        ))
                    }
                    {
                        props.state.state.services.map((service: typeof State.prototype.state.services[number]) => (
                            <ServiceCard key={service.title} state={props.state} service={service} />
                        ))
                    }

                    {/* <ContextMenuAddService state={props.state}> */}
                        <ListItem disablePadding sx={{marginBottom: "1em"}}>
                            <Paper variant="outlined" sx={{height: "4em", width: "18.5em", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <Box position="absolute" top="0em" bottom="0em" left="0em" right="0em" display="flex" alignItems="center" justifyContent="center">
                                    <Add sx={{fontSize: props.state.state.font * 2}} />
                                </Box>
                                <Button color="inherit" sx={{height: "100%", width: "100%"}} 
                                    onClick={(e: React.MouseEvent) => {
                                        props.state.OpenContextMenuAddService(e.pageX, e.pageY)
                                    }}
                                    onContextMenu={(e: React.MouseEvent) => {
                                        e.preventDefault()
                                        props.state.OpenContextMenuAddService(e.pageX, e.pageY)
                                    }}
                                >
                                </Button>
                                
                            </Paper>
                            
                        </ListItem>
                    {/* </ContextMenuAddService> */}

                </List>
            </Drawer>
        </Box>

    )
}
export default ServiceStack;