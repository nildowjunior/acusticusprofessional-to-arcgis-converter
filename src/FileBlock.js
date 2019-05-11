import React from "react";
import CSVFileDowload from "./CSVFileDowload";

export default class FileBlock extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {name, content} = this.props;
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <CSVFileDowload
                        className="input-group-text"
                        name={`${name}`}
                        content={content}
                    />
                </div>
                <textarea className="form-control" aria-label="With textarea">{content}</textarea>
            </div>
        );
    }
};