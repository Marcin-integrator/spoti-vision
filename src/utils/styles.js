import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 'max-content',
    margin: 'auto',
    justifyContent: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  halfProfile: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexBasis: 'content',
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
