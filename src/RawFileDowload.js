import React from "react";

export default class RawFileDowload extends React.PureComponent {
    constructor(props) {
        super(props);
    }


    render() {
        let {downloadName, MIMEType, base64Content, children, ...others} = this.props;
        return (
            <a
                download={downloadName}
                href={`data:${MIMEType};base64,${base64Content}`}
                {...others}
            >
                {children}
            </a>
        );
    }
};