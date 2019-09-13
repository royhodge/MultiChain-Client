// Services
import React from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Body({ props }) {

  const classes = useStyles();

  const { state } = props;
  const { chainInfo, chainParams, streams, addresses, assets } = state;

  const details = [
    'nodeaddress',
    'version',
    'blocks',
    'protocolversion',
    'setupblocks'
  ]

  const params = [
    'anyone-can-activate',
    'anyone-can-admin',
    'anyone-can-connect',
    'anyone-can-create',
    'anyone-can-issue',
    'anyone-can-mine',
    'anyone-can-receive',
    'anyone-can-receive-empty',
    'anyone-can-send'
  ]
  const consensus = [
    'consensus-activate',
    'consensus-admin',
    'consensus-create',
    'consensus-issue',
    'consensus-mine',
    'consensus-upgrade'
  ]

  return (
    <div style={{
      marginTop: 100
    }}>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Chain Details:
          <List>
            <ListItemText primary={chainInfo ? 'Nodeaddress: ' + chainInfo.nodeaddress : 'Nodeaddress: '} />
            <ListItemText primary={chainInfo ? 'Version: ' + chainInfo.version : 'Version: '} />
            <ListItemText primary={chainInfo ? 'Blocks: ' + chainInfo.blocks : 'Blocks: '} />
            <ListItemText primary={chainInfo ? 'Protocolversion: ' + chainInfo.protocolversion : 'Protocolversion: '} />
            <ListItemText primary={chainInfo ? 'Setupblocks: ' + chainInfo.setupblocks : 'Setupblocks: '} />
          </List>
        </Typography>
      </Paper>
      <Divider />

      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Parameters:
          <List>
            {params.map(param =>
              <ListItemText key={param} primary={chainParams ? `${param}: ` + chainParams[`${param}`] : `${param}: `} />
            )}
          </List>
        </Typography>
      </Paper>
      <Divider />

      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Consensus:
          <List>
            {consensus.map(con =>
              <ListItemText key={con} primary={chainParams ? `admin-${con}: ` + chainParams[`admin-${con}`] : `admin-${con}: `} />
            )}
          </List>
        </Typography>
      </Paper>
      <Divider />

      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Addresses
          {addresses.map((address,i) =>
            <ListItemText key={i} primary={address} />
          )}
        </Typography>
      </Paper>
      <Divider />
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Streams
          {streams.map((stream,i) =>
            <ListItemText key={i} primary={stream.name} />
          )}
        </Typography>
      </Paper>
      <Divider />
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Assets
          {assets.map((asset,i) =>
            <ListItemText key={i} primary={asset} />
          )}
        </Typography>
      </Paper>
    </div>
  );
}
