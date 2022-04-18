import { Box, Button } from "@mui/material";
import React from "react";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import LibraryItem from "./LibraryItem";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export interface LibraryProps extends GUIProps {}

export interface LibraryState extends GUIState {
    currentItem: number;
}

class Library extends GUIObject<LibraryProps, LibraryState> {
    constructor(props: LibraryProps) {
        super(props);
        this.props.tourable.onLoadObservable.Add(
            this._observableManager,
            () => {
                this.forceUpdate();
            },
            true
        );
        this.props.tourable.onLoadObservable.Add(
            this._observableManager,
            () => {
                // update on new scene created
                this.props.tourable.sceneManager.createDefaultSceneObservable.Add(
                    this._observableManager,
                    (scene) => {
                        this.forceUpdate();
                    },
                    false
                );
                // update on scene settings applied
                this.props.tourable.editorGUI.current.sceneConfig.current.applySettingsObservable.Add(
                    this._observableManager,
                    () => {
                        this.forceUpdate();
                    },
                    false
                );
                // update on scene group change
                this.props.tourable.sceneManager.changeSceneGroupObservable.Add(
                    this._observableManager,
                    (sceneGroup) => {
                        this.forceUpdate();
                    },
                    false
                );
                // rerender once tourable has loaded
                this.forceUpdate();
            },
            true
        );
        this.state = {
            ...this.state,
            currentItem: 0,
        };
    }
    private _container: React.RefObject<HTMLDivElement> = React.createRef();
    render() {
        return (
            <Box
                sx={{
                    position: "absolute",
                    left: "50%",
                    bottom: "calc(100vh * 50 / 1080)",
                    width: "calc(100vw * 1120 / 1920)",
                    transform: "translate(-50%, 0)",
                }}
            >
                {this.renderNavigation("left")}
                <Box
                    ref={this._container}
                    sx={{
                        display: "flex",
                        gap: "30px",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    {this.renderItems()}
                </Box>
                {this.renderNavigation("right")}
            </Box>
        );
    }
    /**
     *
     * @param direction 1 = next
     * @param direction -1 = previous
     */
    scrollTo = (direction: -1 | 1) => {
        let index = this.state.currentItem + direction;
        if (this._container.current.children[index]) {
            this.setState({ currentItem: index }, () => {
                this._container.current.scrollTo((this._container.current.children[this.state.currentItem] as HTMLElement).offsetLeft, 0);
            });
        }
    };
    renderItems = () => {
        if (!this.props.tourable.sceneManager.currentSceneGroup) {
            return [];
        }
        let scenes = this.props.tourable.sceneManager.currentSceneGroup.sceneIDs.map((sceneID) => {
            return this.props.tourable.sceneManager.scenes.get(sceneID);
        });
        return scenes.map((scene, index) => {
            return (
                <LibraryItem
                    key={`${scene.panorama.name}-${index}`}
                    label={scene.panorama.name}
                    src={scene.panorama.thumbnail}
                    onClick={(e) => {
                        this.props.tourable.sceneManager.switchScene(this.props.tourable, scene.id);
                    }}
                />
            );
        });
    };
    renderNavigation = (direction: "left" | "right") => {
        return (
            <Button
                sx={{
                    position: "absolute",
                    width: "27px",
                    minWidth: "0px",
                    height: "27px",
                    border: "1px solid #ffffff",
                    borderRadius: "50%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: direction == "left" ? "calc(100% + 16px)" : null,
                    left: direction == "right" ? "calc(100% + 16px)" : null,
                    color: "#ffffff",
                }}
                onClick={(e) => {
                    this.scrollTo(direction == "left" ? -1 : 1);
                }}
            >
                {(() => {
                    return direction == "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />;
                })()}
            </Button>
        );
    };
}

export default Library;
