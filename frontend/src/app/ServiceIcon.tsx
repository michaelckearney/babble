import State from '../State'

import CloudOutlined from '@mui/icons-material/CloudOutlined'
import CloudSyncOutlined from '@mui/icons-material/CloudSyncOutlined'
import CloudDoneOutlined from '@mui/icons-material/CloudDoneOutlined'
import CloudOff from '@mui/icons-material/CloudOff'

import red from '@mui/material/colors/red'
import amber from '@mui/material/colors/amber'
import green from '@mui/material/colors/green'

interface ServiceIconProps {
    service: typeof State.prototype.state.service | typeof State.prototype.state.services[number],
}
export const ServiceIcon = (props: ServiceIconProps) => {
    switch (props.service.status.status) {
        case "activating":
            return <CloudSyncOutlined sx={{fontSize: "2em", color: amber[400]}} />
        case "active":
            return <CloudDoneOutlined sx={{fontSize: "2em", color: green[400]}} />
        case "deactivating":
            return <CloudSyncOutlined sx={{fontSize: "2em", color: amber[400]}} />
        case "deleting":
            return <CloudSyncOutlined sx={{fontSize: "2em", color: amber[400]}} />
        case "inactive":
            return <CloudOutlined sx={{fontSize: "2em"}} />
        case "error":
            return <CloudOff sx={{fontSize: "2em", color: red[400]}} />
        default:
            return <CloudOutlined sx={{fontSize: "2em"}} />
    }
}
export default ServiceIcon