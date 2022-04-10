import { Box, Button } from "@mui/material";
import React from "react";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import LibraryItem from "./LibraryItem";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export interface LibraryProps extends GUIProps {}

export interface LibraryState extends GUIState {}

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
    }
    private _container:React.RefObject<HTMLDivElement> = React.createRef();
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
                        gap: "calc(100vw * 45 / 1920)",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden"
                    }}
                >
                    {this.renderItems()}
                </Box>
                {this.renderNavigation("right")}
            </Box>
        );
    }
    renderItems = () => {
        let scenes = Array.from(this.props.tourable.sceneManager.scenes);
        return scenes.map(([key, scene], index) => {
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
    renderNavigation = (direction:"left"|"right") => {
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
            >
                {(() => {
                    return direction == "left" ? <ChevronLeftIcon/> : <ChevronRightIcon/>
                })()}
            </Button>
        );
    }
}

export default Library;
