import State from '../State'

import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import CloudOutlined from '@mui/icons-material/CloudOutlined'
import CloudSync from '@mui/icons-material/CloudSync'
import CloudDoneOutlined from '@mui/icons-material/CloudDoneOutlined'
import CloudOff from '@mui/icons-material/CloudOff'

import red from '@mui/material/colors/red'
import orange from '@mui/material/colors/orange'
import amber from '@mui/material/colors/amber'
import green from '@mui/material/colors/green'
import blue from '@mui/material/colors/blue'
import purple from '@mui/material/colors/purple'

import createTheme from '@mui/material/styles/createTheme';

interface ResourceIconProps {
    state: State,
    resource: string
}
export const ResourceIcon = (props: ResourceIconProps) => {
    return (
        <Box>

        </Box>
    )
}
export default ResourceIcon