import React from 'react';
import { withSnackbar } from 'notistack';
// import { remote } from 'electron';

// Constants
import LocalChains from '../constants/LocalChains'
import Chainspath from '../constants/Chainpaths'
import Platform from '../constants/Platform'
import Feedback from '../constants/Feedback'
import GetCreds from '../constants/GetCreds'

// Containers
import Topnav from './Topnav'
import TabToolbar from './TabToolbar'
// Components
import Windowbar from '../components/WindowBar'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentChain: false,
      chainspath: false,
      platform: false,
      localchains: [],
      multichain: false,
      chainInfo: false,
      chainParams: false,
      streams: [],
      addresses: [],
      assets: [],
      peers: []
    }
    // Global functions to open modal or give feedback
    this.snackFeedback = this.snackFeedback.bind(this);
    this.openModal = this.openModal.bind(this);
    // General info functions
    this.getLocalInfo = this.getLocalInfo.bind(this);
    // Multichain functions
    this.getChainParams = this.getChainParams.bind(this);
    this.getChainInfo = this.getChainInfo.bind(this);
    this.getChainAddresses = this.getChainAddresses.bind(this);
    this.getChainStreams = this.getChainStreams.bind(this);
    this.getChainAssets = this.getChainAssets.bind(this);
    this.getPeerInfo = this.getPeerInfo.bind(this);
    this.setChain = this.setChain.bind(this);
  }
   // General info functions
  getLocalInfo() {
    LocalChains()
      .then((chains) => {
        this.setState({
          chainspath: Chainspath,
          platform: Platform,
          localchains: chains,
        });
      })
  }
    // Multichain functions
  getChainParams() {
    this.state.multichain.getBlockchainParams((err, info) => {
      if (err) {
        this.snackFeedback('error', err.message);
        return;
      }
      this.setState({
        chainParams: info
      });
    });
  }
  getChainInfo() {
    this.state.multichain.getInfo((err, info) => {
      if (err) {
        this.snackFeedback('error', err.message);
        return;
      }
      this.setState({
        chainInfo: info
      });
    });
  }
  getChainAddresses() {
    this.state.multichain.getAddresses((err, info) => {
      if (err) {
        this.snackFeedback('error', err.message);
        return;
      }
      this.setState({
        addresses: info
      });
    });
  }
  getChainStreams() {
    this.state.multichain.listStreams((err, info) => {
      if (err) {
        this.snackFeedback('error', err.message);
        return;
      }
      this.setState({
        streams: info
      });
    });
  }
  getChainAssets() {
    this.state.multichain.listAssets((err, info) => {
      if (err) {
        this.snackFeedback('error', err.message);
        return;
      }
      this.setState({
        assets: info
      });
    });
  }
  getPeerInfo() {
    this.state.multichain.getPeerInfo((err, info) => {
      if (err) {
        this.snackFeedback('error', err.message);
        return;
      }
      this.setState({
        peers: info
      });
    });
  }

  // Update state with chain data
  setChain(chain) {
    GetCreds(chain)
      .then((creds) => {
        this.setState({
          currentChain: creds,
          multichain: require("multichain-node")(creds)
        })
      })
      .then(() => {
        this.getChainInfo();
        this.getChainParams();
        this.getChainAddresses();
        this.getChainStreams();
        this.getChainAssets();
        this.getPeerInfo();
      })
      .catch(err => {
        this.snackFeedback('error', err);
      });
      this.snackFeedback('success', 'Connected to ' + chain);
  }


  // Async functions to load once component has been mounted
  componentDidMount() {
    this.getLocalInfo();
  }
  // User feedback once data has changed
  componentDidUpdate() {
    if (!(this.state.multichain)) {
      this.snackFeedback('error', 'Not connected to any chains');
      return;
    }
  }

  render() {
    // Props for child elements
    const componentProps = {
      Topnav: {
        state: this.state,
        functions: {
          feedback: this.snackFeedback,
          setChain: this.setChain
        }
      },
      Body: {
        state: this.state,
        functions: {
          feedback: this.snackFeedback,
        }
      },
    }

    return (
      <React.Fragment>
        <Windowbar />
        <Topnav props={componentProps.Topnav} />
        <TabToolbar props={componentProps.Topnav} />
      </React.Fragment>
    );
  }

  // DOM element functions
  openModal(modal) {
    this.setState({
      modals: {
        [modal]: true,
      }
    })
  }

  closeModal(modal) {
    this.setState({
      modals: {
        [modal]: false,
      }
    })
  }

  snackFeedback(varient, message) {
    switch (varient) {
      case 'success':
        Feedback.success(this.props.enqueueSnackbar, message)
        break;
      case 'error':
        Feedback.error(this.props.enqueueSnackbar, message)
        break;
      case 'addToIPFS':
        Feedback.addToIPFS(this.props.enqueueSnackbar, message)
        break;
      default:
        Feedback.comingSoon(this.props.enqueueSnackbar, message)
        break;
    }
  }

}

export default (withSnackbar(App))

