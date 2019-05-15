import React from 'react';
import './App.css';
import FileBlock from "./FileBlock";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.inputTextArea = React.createRef();
        this.state = {
            files: [],
            showUseInstructions: false,
            error: undefined
        };
        this.generateWarningsCSVFiles = this.generateWarningsCSVFiles.bind(this);
        this.mountFileHref = this.mountFileHref.bind(this);
        this.generateWarningCSVFile = this.generateWarningCSVFile.bind(this);
        this.handleOnClickGenerateFiles = this.handleOnClickGenerateFiles.bind(this);
        this.getUseInstructions = this.getUseInstructions.bind(this);
        this.handleOnClickToggleUseInstructions = this.handleOnClickToggleUseInstructions.bind(this);
    }

    mountFileHref(content) {
        return `data:text/csv;charset=utf-8;base64,${window.btoa(content)}`
    }

    handleOnClickGenerateFiles() {
        let files, error;
        try {
            files = this.generateWarningsCSVFiles(JSON.parse(this.inputTextArea.current.value));
        } catch (e) {
            files = [];
            error = e.toString();
        }

        this.setState({
            files,
            error
        })
    }

    generateWarningCSVFile(device) {
        if (device && device.CoveredArea && device.CoveredArea.PolygonPath && device.DisplayName) {
            let content = "latitude,longitude\n";
            device.CoveredArea.PolygonPath.forEach(path => {
                content += path.Lat + "," + path.Lng + "\n";
            });
            return {
                name: device.DisplayName + ".csv",
                content
            };
        }
        else throw new Error("device doesn't have all the required attributes")
    }

    generateWarningsCSVFiles(data) {
        let files = [];
        if (data && data.WarningDevices) {
            data.WarningDevices.forEach((device) => files.push(this.generateWarningCSVFile(device)));
        } else {
            files.push(this.generateWarningCSVFile(data));
        }
        return files;
    }

    handleOnClickToggleUseInstructions() {
        this.setState({
            showUseInstructions: !this.state.showUseInstructions
        });
    }

    getUseInstructions() {
        if (this.state.showUseInstructions) {
            return (
                <div className="row col-md-12">
                    <ol>
                        <li>{"Acesse o site "} <a target="_blank" rel="noopener noreferrer"
                                                  href="http://acusticusprofessional.telegrafia.eu/Acusticus.aspx">{"acusticus professional"}</a>
                        </li>
                        <li>{"Abra as ferramentas de desenvolvedor (pressione F12 ou Ctrl + Shift + i)"}</li>
                        <li>{"Nas ferramentas de desenvolvedor acesse a aba \"Network\""}</li>
                        <li>{"Se estiver logado:"}</li>
                        <ol>
                            <li>{"Selecione um dos componentes de áudio"}</li>
                            <li>{"Use a opção de salvar (menu lateral direito)"}</li>
                            <li>{"Nas ferramentas de desenvolvedor utilizar a opção de filtro da parte superior para buscar o request \"updateWarningDeviceSettings\". Existirá um item desse para cada vez que a opção salvar for pressionada"}</li>
                            <li>{"Siga as demais instruções"}</li>
                        </ol>
                        <li>{"Se estiver deslogado"}</li>
                        <ol>
                            <li>{"Pressione F5 para recarregar a página"}</li>
                            <li>{"Nas ferramentas de desenvolvedor utilizar a opção de filtro da parte superior para buscar o request \"loadProjectLayerWithVisibleGeoObjects\""}</li>
                            <li>{"Siga as demais instruções"}</li>
                        </ol>
                        <li>{"Seleciona o item apresentado"}</li>
                        <li>{"Acesse a aba \"preview\" e copie o conteúdo da resposta (apenas a parte textual sem copiar o \" do inicio e do final"}</li>
                        <li>{"Cole o conteúdo copiado no espaço abaixo e pressione o botão para gerar os arquivos CSV"}</li>
                    </ol>
                    <p>
                        {"Para converter os arquivos CSVs gerados para o formato KMZ você pode utilizar o site  "} <a
                        target="_blank" rel="noopener noreferrer"
                        href="https://mygeodata.cloud/converter/latlong-to-kmz">
                        {"deste link"}
                    </a>
                    </p>
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="container">
                <div className="row col-md-12">
                    <button onClick={this.handleOnClickToggleUseInstructions}>{`${this.state.showUseInstructions ? "Ocultar" : "Apresentar"} instruções de uso`}</button>
                </div>
                {this.getUseInstructions()}
                <div className="row col-md-12">
                    <p style={{color: 'red'}}>
                        {this.state.error}
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <textarea
                            name="data"
                            id="data"
                            className="dataInput"
                            ref={this.inputTextArea}
                        />
                    </div>
                    <div className="col-md-2">
                        <button onClick={this.handleOnClickGenerateFiles}>
                            {"Generate csv files"}
                        </button>
                    </div>
                    <div className="col-md-5">
                        {this.state.files.map(filesData =>
                            <FileBlock
                                key={filesData.name}
                                name={filesData.name}
                                content={filesData.content}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
};
