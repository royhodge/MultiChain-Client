import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Link from '@material-ui/icons/Link';

const useStyles = makeStyles({
  drawer: {
    width: 250,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullList: {
    width: 'auto',
  },
  barIcon: {
    color: 'white'
  },
  active: {
    border: '2px solid green',
    borderRadius: '8px'
  }
});

export default function Drawers({ props }) {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false, });
  const [activeChain, setActiveChain] = React.useState(false);

  const { localchains } = props.state;

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const connect = (chain) => {
    props.functions.setChain(chain);
    setActiveChain(chain);
  }
  const create = () => {
    alert('open create chain modal');
  }

  const leftMenu = side => (
    <div
      className={classes.drawer}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)} >
      <List>
        <ListItem className={classes.list} button key={'sidenav'}>
          <ListItemText primary={'Local chains'} />
        </ListItem>
        <ListItem className={classes.list} button key={'createBtn'}>
          <Button key={'create'} variant="outlined" onClick={create}>Create</Button>
        </ListItem>
      </List>
      <Divider />
      <List>
        {localchains.map(chain => (
          <ListItem
            className={chain === activeChain ? classes.active : ' '}
            button key={chain}>
            <ListItemIcon>
              <Link />
            </ListItemIcon>
            <ListItemText
              onClick={() => connect(chain)}
              primary={chain} />
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('left', true)}>
        <FingerprintIcon className={classes.barIcon} />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {leftMenu('left')}
      </Drawer>
    </React.Fragment>
  );
}
