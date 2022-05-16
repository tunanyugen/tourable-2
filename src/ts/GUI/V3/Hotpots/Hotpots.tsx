import { Box, List, Slide, Typography } from "@mui/material";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import MenuIcon from '@mui/icons-material/Menu';
import HotpotItem from "./HotpotItem"
export interface HotpotsProps extends GUIProps {}

export interface HotpotsState extends GUIState {
}

class Hotpots extends GUIObject<HotpotsProps, HotpotsState> {
    constructor(props: HotpotsProps) {
        super(props);
    }

    renderItem() {
        const fakeData = [{
            NameHotpot: "View Toàn cảnh",
            top: 0,
            left: 0,
            show: false
        },
        {
            NameHotpot: "Phân khu 1",
            top: 51,
            left: 31,
            show:true
        },
        {
            NameHotpot: "Phân khu 2",
            top: 35,
            left: 27,
            show: true
            
        },
        {
            NameHotpot: "Phân khu 3",
         
            top: 37.5,
            left: 42,
            show: true
     
        },
        {
            NameHotpot: "Phân khu 4",
            top: 0,
            left: 0,
            show: false
        },
     
    ];

       return fakeData.map((e, index) => {
           return (
                <HotpotItem 
                key={`${e.NameHotpot}-${index}`}
                tourable={this.props.tourable}
                NameHotpot={e.NameHotpot}
                top={e.top}
                left={e.left}
                show={e.show}
                >
                </HotpotItem>
           )
       }) 
    }
    

    render() {
        return (
            <Box>
                {this.renderItem()}
            </Box>
        )
    }
}

export default Hotpots