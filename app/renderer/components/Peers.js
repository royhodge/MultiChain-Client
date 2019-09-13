// Services
import React from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Peers({ props }) {

  const classes = useStyles();

  const { state } = props;
  const { peers } = state;


  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Peers
      {peers.map((peer, i) =>
            <ListItemText key={i} primary={peer} />
          )}
        </Typography>
      </Paper>
    </React.Fragment>
  );
}
