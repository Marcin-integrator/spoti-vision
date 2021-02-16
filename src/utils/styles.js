import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 'max-content',
    margin: 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  title: {
    fontWeight: 800,
  },
  numbers: {
    fontSize: 30,
    paddingRight: 8,
  },
}));
