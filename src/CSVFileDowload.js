import React from "react";
import RawFileDowload from "./RawFileDowload";

export default class CSVFileDowload extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {name, content, ...others} = this.props;
        return (
            <RawFileDowload
                downloadName={name}
                MIMEType="text/csv;charset=utf-8"
                base64Content={window.btoa(content)}
                {...others}
            >
                {this.props.name}
            </RawFileDowload>
        );
    }
};