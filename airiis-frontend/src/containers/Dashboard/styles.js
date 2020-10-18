import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  'dashboard-container': {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  'dashboard-content': {
    flex: 1,
    height: '100%',
  },
}));

export default useStyles;
