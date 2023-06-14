import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import FolderOutlined from '@mui/icons-material/FolderOutlined'

import blue from '@mui/material/colors/blue'

import State from '../State'


interface FolderCardProps {
    state: State,
    folder: string,
}
export const FolderCard = (props: any) => {
    return (
        <ListItem disablePadding sx={{marginBottom: "1em"}}>
            <Paper variant="outlined" sx={{height: "4em", width: "18.3em"}}>
                <Box position="absolute" width="4em" top="0em" bottom="0em" left="0em" display="flex" alignItems="center" justifyContent="center">
                    <FolderOutlined sx={{fontSize: "2em", color: blue[400]}} />
                </Box>
                <Box position="absolute" top="0em" bottom="0em" left="4em" right="0em" display="flex" alignItems="center" justifyContent="left" paddingLeft="0.5em">
                    <Typography fontSize="1em">
                        <b>{props.folder}</b>
                    </Typography>
                </Box>
                <Button color="inherit" sx={{height: "100%", width: "100%"}} onClick={() => {
                    props.state.ViewWorkspaceChild(props.folder)
                }}>
                </Button>
            </Paper>
        </ListItem>
    )
}
export default FolderCard