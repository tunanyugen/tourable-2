import { Box, MenuItem, Select } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";

export interface SceneGroupSelectorProps extends GUIObjectProps {}

export interface SceneGroupSelectorState extends GUIObjectState {}

class SceneGroupSelector extends GUIObject<SceneGroupSelectorProps, SceneGroupSelectorState> {
    constructor(props: SceneGroupSelectorProps) {
        super(props);
        this.props.tourable.onLoadObservable.Add(
            this._observableManager,
            () => {
                this.forceUpdate();
            },
            true
        );
        this.props.tourable.sceneManager.changeSceneGroupObservable.Add(
            this._observableManager,
            () => {
                this.forceUpdate();
            },
            false
        );
    }
    render() {
        return (
            <Box
                className="tourable__scene-group-selector"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    position: "absolute",
                    left: "40px",
                    bottom: "50px",
                }}
            >
                <Box sx={{ color: "white" }}>
                    <div dangerouslySetInnerHTML={{ __html: this.props.tourable.config.name }}></div>
                </Box>
                <Select
                    variant="standard"
                    label="Scene group"
                    sx={{
                        fontSize: "16px",
                        color: "white",
                        width: "calc(100vw * 300 / 1920)",
                        "::before": {
                            borderBottom: "1px solid white",
                        },
                    }}
                    value={
                        this.props.tourable.sceneManager.currentSceneGroup ? this.props.tourable.sceneManager.currentSceneGroup.name : ""
                    }
                >
                    {this.renderItems()}
                </Select>
            </Box>
        );
    }
    renderItems = () => {
        return this.props.tourable.sceneManager.sceneGroups.map((sceneGroup, index) => {
            return (
                <MenuItem
                    key={`${sceneGroup.name}-${index}`}
                    value={sceneGroup.name}
                    onClick={() => {
                        this.props.tourable.sceneManager.switchSceneGroup(this.props.tourable, sceneGroup.id);
                    }}
                >
                    {sceneGroup.name}
                </MenuItem>
            );
        });
    };
}

export default SceneGroupSelector;
