import React from 'react';
import fs from 'fs';
import { remote } from 'electron';
import admZip from 'adm-zip';

// Constants
import Downloader from '../constants/Downloader'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      action: 'Downloading Multichain',
      bytesDownloaded: 0,
      progress: 'Downloading..',
      extractedFiles: []
    }
    this.unzipFile = this.unzipFile.bind(this);
    this.showExtractedFiles = this.showExtractedFiles.bind(this);
    this.download = this.download.bind(this);
  }


  download() {
    let address;
    switch (process.arch) {
      case 'win32':
        address = 'https://www.multichain.com/download/multichain-windows-2.0.2.zip'
        break;
      default:
        address = 'https://www.multichain.com/download/multichain-2.0.2.tar.gz'
        break;
    }
    Downloader(address, 'multichain.zip',
      (bytes, percent) => {
        if (percent !== 100) {
          this.setState({
            bytesDownloaded: bytes
          });
          return;
        }
        this.setState({
          bytesDownloaded: percent + '%',
          progress: 'Complete'
        });
      }
    );
  }

  unzipFile() {
    var zip = new admZip("./multichain.zip");
    zip.extractAllTo('multichain/', true)
    this.setState({
      action: 'Files extracted',
    })
  }

  showExtractedFiles() {
    fs.readdir('./multichain', { encoding: 'utf-8' }, (eventType, entries) => {
      this.setState({
        extractedFiles: entries,
        action: 'Restarting..',
      })
    });
  }
  // Async functions to load once component has been mounted
  componentDidMount() {
    if (!(fs.existsSync('multichain.zip'))) {
      this.download();
      return;
    };
    this.setState({
      bytesDownloaded: '100 %',
      progress: 'Complete'
    });
  }

  // User feedback once data has changed
  componentDidUpdate() {
    if (fs.existsSync('multichain.zip') && this.state.progress === 'Complete') {
      setTimeout(() => {
        this.unzipFile();
      }, 100);
    }

    if (this.state.action === 'Files extracted') {
      this.showExtractedFiles();
    }

    if (this.state.action === 'Restarting..') {
      remote.app.relaunch();
      remote.app.quit();
    }
  }


  render() {

    return (
      <React.Fragment>
        <div>{this.state.action}</div>
        <br></br>
        <div>{this.state.progress}</div>
        <br></br>
        <div>{this.state.bytesDownloaded}</div>
        <br></br>
        <div>Files extracted:</div>
        <ul>{this.state.extractedFiles.map((file, i) => <li key={i}>{file}</li>)}</ul>
      </React.Fragment>
    );
  }
}

export default App

