import { FormControl } from '@mui/material';
import * as React from 'react';
const DecoupledEditor = require("@tunanyugen/ckeditor5");

export interface CKEditorProps {
    name:string;
    label:string;
    defaultValue:string;
    placeholder:string;
    onChange: (value:string) => void;
    ckeditorconfig:any;
}
 
export interface CKEditorState  {
    value:string;
}
 
class CKEditor extends React.Component<CKEditorProps, CKEditorState> {
    static defaultProps: CKEditorProps = {
        name: "",
        label: "",
        defaultValue: "",
        placeholder: "",
        ckeditorconfig: {},
        onChange: () => {}
    }
    private _editor:any;
    private _toolbar:React.RefObject<HTMLDivElement> = React.createRef();
    private _content:React.RefObject<HTMLDivElement> = React.createRef();
    constructor(props: CKEditorProps) {
        super(props);
        this.state = {
            value: this.props.defaultValue || ""
        }
    }
    componentDidMount(){
        this.renderEditor();
    }
    render() { 
        return (
            <FormControl fullWidth className="admin__form__element">
                <div>{this.props.label}</div>
                <div ref={this._toolbar} className="react-component__ckeditor__toolbar"></div>
                <div ref={this._content} className="react-component__ckeditor__content"></div>
                <textarea hidden readOnly name={this.props.name} value={this.state.value}></textarea>
            </FormControl>
        );
    }
    renderEditor = () => {
        DecoupledEditor.create(this.props.defaultValue, {
            ...this.props.ckeditorconfig,
            placeholder: this.props.placeholder,
        })
        .then((editor: any) => {
            this._editor = editor;
            this._editor.config.entities = false;

            this._editor.model.document.on("change:data", () => {
                let data = this._editor.getData();
                this.setState({ value: data})
                this.props.onChange(data)
            })

            this._toolbar.current.appendChild(this._editor.ui.view.toolbar.element);
            this._content.current.appendChild(this._editor.ui.view.editable.element);
        })
        .catch((error: any) => {
            console.error('There was a problem initializing the editor.', error);
        });
    }
}
 
export default CKEditor;