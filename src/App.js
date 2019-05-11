import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          files: []
        };
        this.generateWarningsCSVFiles = this.generateWarningsCSVFiles.bind(this);
        this.mountFileHref = this.mountFileHref.bind(this);
    }

    mountFileHref(content) {
      return `data:text/csv;charset=utf-8;base64,${window.btoa(content)}`
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
        this.setState({
            files
        });
    }

    render() {
        return (
            <div>
              <div>
                  <textarea name="data" id="data" cols="30" rows="10" onChange={(event) => {
                      this.generateWarningsCSVFiles(JSON.parse(event.target.value));
                  }}/>
              </div>
              <div>
                  {this.state.files.map(filesData => {
                    return (
                        <div>
                            <a key={filesData.name} download={filesData.name} href={this.mountFileHref(filesData.content)}>{`Download ${filesData.name}`}</a>
                            <br/>
                        </div>
                    )
                  })}
              </div>
            </div>
        );
    }
};
