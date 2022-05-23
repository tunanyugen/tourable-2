import { Box, Fade, Typography } from "@mui/material";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

export interface ClientInfoProps extends GUIProps {}

export interface ClientInfoState extends GUIState {
    content: string;
}

class ClientInfo extends GUIObject<ClientInfoProps, ClientInfoState> {
    constructor(props: ClientInfoProps) {
        super(props);
        this.state = {
            ...this.state,
            content: "",
            hidden: false,
        };
        this.props.tourable.onLoadObservable.Add(
            this._observableManager,
            () => {
                // update on switch scene group
                this.props.tourable.sceneManager.changeSceneGroupObservable.Add(
                    this._observableManager,
                    () => {
                        this.setState({ content: this.props.tourable.sceneManager.currentSceneGroup.description });
                    },
                    false
                );
                // update on config apply
                this.props.tourable.editorGUI.current.sceneGroupConfig.current.applySettingsObservable.Add(
                    this._observableManager,
                    () => {
                        this.setState({ content: this.props.tourable.sceneManager.currentSceneGroup.description });
                    },
                    false
                );
            },
            true
        );
    }

    render() {
        return (
            <Fade in={!this.state.hidden}>
                <Box
                    sx={{
                        position: "absolute",
                        width: "calc(100vw * 468 / 1280)",
                        height: "calc(100vh * 260 / 680)",
                        top: "calc(100vh * 324 / 680)",
                        right: "calc(100vw * 36 / 1280)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "20px",
                        padding: "30px",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "calc(100vh * -8 / 680)",
                            right: "calc(100vw * -8 / 1280)",
                            width: "calc(100vw * 24 / 1280)",
                            height: "calc(100vw * 24 / 1280)",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            this.hide();
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "calc(100vw * 24 / 1280)" }} />
                    </Box>

                    <Typography
                        sx={{
                            color: "#fff",
                            fontSize: "calc(100vw * 20 / 1280)",
                            textTransform: "uppercase",
                        }}
                    >
                        <InfoOutlinedIcon
                            sx={{
                                fontSize: "calc(100vw * 28 / 1280)",
                                marginRight: "calc(100vw * 4 / 1280)",
                                verticalAlign: "middle",
                                display: "inline-flex",
                            }}
                        />
                        Trang trại Phú Hưng, Bình Định
                    </Typography>

                    <div
                        style={{
                            fontSize: "calc(100vw * 12 / 1280)",
                            fontWeight: "light",
                            color: "#fff",
                            marginTop: "calc(100vh * 12 / 680)",
                            height: "78%",
                            overflow: "hidden",
                            textAlign: "justify",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: this.state.content,
                        }}
                    ></div>
                </Box>
            </Fade>
        );
    }
}

export default ClientInfo;
