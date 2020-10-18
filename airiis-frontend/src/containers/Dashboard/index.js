import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import DashboardGeneral from '../DashboardGeneral';
const img = require('../../images/logo_large.png');
const background = require('../../images/bg.png')
const drawerWidth = 240;

// In Toolbar: <img alt="AIriis" src={img} width="8%" style={{marginTop: '2%'}}/>

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${background})`
    ,
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    padding: '1%',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    display: 'contents',
    position: 'absolute',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
const Dashboard = () => {

  const classes = useStyles();
  const [value] = React.useState(0); 

  return (
    <div className={classes.root}>
    <CssBaseline />
    {/* <AppBar
      position="absolute"
      color="primary"
    >
      <Toolbar className={classes.toolbar}>
        <img alt="aduanas" src={img} width="10%" />
        <Typography variant="h6" className={classes.title} justify="center" />
        <Typography variant="h1" className={classes.title} justify="center">
          Aduanas
        </Typography>
      </Toolbar> */}
    {/* </AppBar> */}
      <Toolbar className={classes.toolbar}>
        <img alt="AIriis" src={img} width="8%" style={{marginTop: '2%'}}/>
      </Toolbar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {value === 0 ? (
          <Container maxWidth="lg" className={classes.container}>
            <DashboardGeneral />
          </Container>
        ) : null}
      </main>
  </div>
);
};

export default Dashboard;
