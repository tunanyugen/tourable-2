import { Box, Fade, Slide, Typography } from "@mui/material";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
export interface ClientInfoProps extends GUIProps {}

export interface ClientInfoState extends GUIState {
    show: boolean
}

class ClientInfo extends GUIObject<ClientInfoProps, ClientInfoState> {
    constructor(props: ClientInfoProps) {
        super(props);
        this.state = {
            ...this.state, 
            show: true
        }
    }

    render() {
        return (
            <Fade in={this.state.show}>
                <Box sx={{
                    position: "absolute",
                    width: "calc(100vw * 468 / 1280)",
                    height: "calc(100vh * 260 / 680)",
                    top: "calc(100vh * 324 / 680)",
                    right: "calc(100vw * 36 / 1280)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "20px",
                    padding: "30px"
                }}>
                    <Box sx={{
                        position: "absolute",
                        top: "calc(100vh * -8 / 680)",
                        right: "calc(100vw * -8 / 1280)",
                        width: "calc(100vw * 24 / 1280)",
                        height: "calc(100vw * 24 / 1280)",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        this.setState({show: false})
                    }}
                    >
                        <CloseIcon sx={{fontSize: "calc(100vw * 24 / 1280)"}}/>
                    </Box>

                    <Typography sx={{
                        color: "#fff", 
                        fontSize: "calc(100vw * 20 / 1280)",
                        textTransform: "uppercase",
                        }}>
                    <InfoOutlinedIcon sx={{ 
                        fontSize: "calc(100vw * 28 / 1280)",
                        marginRight: "calc(100vw * 4 / 1280)",
                        verticalAlign: 'middle',
                        display: 'inline-flex'
                    }}/> 
                    Trang trại Phú Hưng, Bình Định
                    </Typography>

                    <Typography sx={{
                        fontSize: "calc(100vw * 12 / 1280)",
                        fontWeight: "light",
                        color: "#fff",
                        marginTop: "calc(100vh * 12 / 680)",
                        height: "78%",
                        overflow: "hidden",
                        textAlign: "justify",
                    }}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vitae, corrupti minima veniam tempore exercitationem dolores inventore, molestiae dignissimos dolorem aliquam eum facere quisquam. Eligendi commodi magni impedit eaque veniam?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vitae, corrupti minima veniam tempore exercitationem dolores inventore, molestiae dignissimos dolorem aliquam eum facere quisquam. Eligendi commodi magni impedit eaque veniam?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vitae, corrupti minima veniam tempore exercitationem dolores inventore, molestiae dignissimos dolorem aliquam eum facere quisquam. Eligendi commodi magni impedit eaque veniam?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vitae, corrupti minima veniam tempore exercitationem dolores inventore, molestiae dignissimos dolorem aliquam eum facere quisquam. Eligendi commodi magni impedit eaque veniam?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vitae, corrupti minima veniam tempore exercitationem dolores inventore, molestiae dignissimos dolorem aliquam eum facere quisquam. Eligendi commodi magni impedit eaque veniam?
                    </Typography>
                </Box>
            </Fade>
        )
    }
}

export default ClientInfo