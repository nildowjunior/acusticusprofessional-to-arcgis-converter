import React from 'react';
import './App.css';
import FileBlock from "./FileBlock";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.inputTextArea = React.createRef();
        this.state = {
            files: []
        };
        this.generateWarningsCSVFiles = this.generateWarningsCSVFiles.bind(this);
        this.mountFileHref = this.mountFileHref.bind(this);
        this.handleOnClickGenerateFiles = this.handleOnClickGenerateFiles.bind(this);
    }

    mountFileHref(content) {
        return `data:text/csv;charset=utf-8;base64,${window.btoa(content)}`
    }

    handleOnClickGenerateFiles() {
        this.setState({
            files: this.generateWarningsCSVFiles(JSON.parse(this.inputTextArea.current.value))
        });
    }

    generateWarningsCSVFiles(data) {
        let files = [];
        data.WarningDevices.forEach(device => {
            let csvFileName = device.DisplayName + ".csv";
            let content = "latitude,longitude\n";
            device.CoveredArea.PolygonPath.forEach(path => {
                content += path.Lat + "," + path.Lng + "\n";
            });
            files.push({
                name: csvFileName,
                content
            });
        });
        return files;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <p>
                        {"Para converter os arquivos CSVs gerados para o formato KMZ você pode utilizar o site "} <a
                        href="https://mygeodata.cloud/converter/latlong-to-kmz">{"deste link"}</a>
                    </p>
                </div>
                <div className="row">
                    <div
                        className="col-md-5"
                    >
                  <textarea name="data" id="data" style={{
                      width: "100%",
                      minHeight: "500px",
                      boxSizing: "border-box"
                  }} ref={this.inputTextArea}
                  />
                    </div>
                    <div className="col-md-2">
                        <button onClick={this.handleOnClickGenerateFiles}>Generate csv files</button>
                    </div>
                    <div
                        className="col-md-5"
                    >
                        {this.state.files.map(filesData => {
                            return (
                                <FileBlock
                                    key={filesData.name}
                                    style={{display: "block", marginBotton: "10px"}}
                                    name={filesData.name}
                                    content={filesData.content}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
};
