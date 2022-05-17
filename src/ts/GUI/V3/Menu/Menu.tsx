import { Box, List, Slide, Typography } from "@mui/material";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from "./MenuItem"
export interface MenuProps extends GUIProps {}

export interface MenuState extends GUIState {
    show: boolean
}

class Menu extends GUIObject<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        super(props);
        this.state = {
            ...this.state, 
            show: true
        }
    }

    renderItem() {
        const fakeData = [{
            NameHotpot: "View Toàn cảnh",   
        },
        {
            NameHotpot: "Phân khu 1",   
        },
        {
            NameHotpot: "Phân khu 2",   
        },
        {
            NameHotpot: "Phân khu 3",   
        },
        {
            NameHotpot: "Phân khu 4",   
        },
     
    ];

       return fakeData.map((e, index) => {
           return (
                <MenuItem  
                key={`${e.NameHotpot}-${index}`}
                tourable={this.props.tourable}
                NameHotpot={e.NameHotpot}>
                </MenuItem>
           )
       }) 

    }
    
    render() {

        return (
            <Box
             sx= {{ 
            position: "absolute",
            left: "0",
            bottom: "12.5vh",
            }}>
                <Box sx={{
                        display: "flex",
                        position: "absolute",
                        width: "calc(100vw * 40 / 1280)",
                        height: "calc(100vw * 40 / 1280)",
                        top: "calc(100vh * 12 / 680)",
                        left: "calc(100vw * 12 / 1280)",
                        backgroundColor: "#fff",
                        color: "#000",
                        borderRadius: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        zIndex: "1"
                    }}

                    onClick={() => {
                        if(this.state.show === false) {
                            this.setState({show:true})
                        }else {
                            this.setState({show:false})
                        }
                    }}
                    >
                        <MenuIcon sx={{
                            width: "calc(100vw * 24 / 1280)",
                            height: "calc(100vh * 24 / 680)"
                        }}/>
                    </Box>
                <Slide in={this.state.show} direction="right" timeout={1000}>
                    <Box 
                        className="tourable__Menu"
                        sx={{
                           
                            width: "calc(100vw * 240 / 1280)",
                            height: "70vh",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            borderTopRightRadius: "20px",
                            borderBottomRightRadius: "20px",
                        }}
                    >
                      
                        {/* Logo image */}
                        <img src="https://www.greenfeed.com.vn/wp-content/uploads/2021/08/logo.svg" 
                        alt="Logo Client"
                        style={{
                            display: "block",
                            margin: "calc(100vh * 32 / 680) 25% calc(100vh * 32 / 680) 25%",
                            width: "50%",
                            height: "auto",
                            filter: "invert(100%) sepia(100%) saturate(5%) hue-rotate(258deg) brightness(108%) contrast(100%)"
                        }}
                        />

                        <List sx={{padding: "0 calc(100vw * 32 / 1280)"}}>
                            {this.renderItem()}
                        </List>
                    </Box>
                </Slide>
            </Box>
        );
    }
}

export default Menu;
