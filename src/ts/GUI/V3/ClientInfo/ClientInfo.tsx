import { Box, List, Slide, Typography } from "@mui/material";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import MenuIcon from '@mui/icons-material/Menu';
export interface ClientInfoProps extends GUIProps {}

export interface ClientInfoState extends GUIState {
}

class ClientInfo extends GUIObject<ClientInfoProps, ClientInfoState> {
    constructor(props: ClientInfoProps) {
        super(props);
    }

    render() {
        return (
            <Box>

            </Box>
        )
    }
}

export default ClientInfo