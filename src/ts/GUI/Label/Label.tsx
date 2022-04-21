import { Typography } from '@mui/material';
import React from 'react'

export interface LabelProps {
    
}
 
export interface LabelState {
    
}
 
class Label extends React.Component<LabelProps, LabelState> {
    constructor(props: LabelProps) {
        super(props);
    }
    render() { 
        return (<Typography>{this.props.children}</Typography>);
    }
}
 
export default Label;