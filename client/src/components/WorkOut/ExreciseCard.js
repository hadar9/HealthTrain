import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import back from '../../images/back.jpg';
import Bending_hands_with_a_dumbbell from '../../images/Bending hands with a dumbbell.jpg';
import Bending_legs_with_large_dumbbell from '../../images/Bending legs with large dumbbell.jpg';
import Bending_legs_with_small_dumbbell from '../../images/Bending legs with small dumbbell.jpg';
import hoop from '../../images/hoop.jpg';
import pushups from '../../images/pushups.jpg';
import Raising_your_hands_with_a_dumbbell from '../../images/Raising your hands with a dumbbell.jpg';
import sits_up from '../../images/sits up.jpg';
import static_belly from '../../images/Static belly.jpg';

export default function ExreciseCard({ exc, parentcomp }) {
  let useStyles;
  if (parentcomp !== 'start') {
    useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
        background: '#f7f7f7',
      },
      media: {
        height: 0,
        paddingTop: '100%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
    }));
  } else {
    useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 500,
        background: '#f7f7f7',
      },
      media: {
        height: 0,
        paddingTop: '100%', // 16:9
      },
    }));
  }

  const images = {
    back,
    Bending_hands_with_a_dumbbell,
    Bending_legs_with_large_dumbbell,
    Bending_legs_with_small_dumbbell,
    hoop,
    pushups,
    Raising_your_hands_with_a_dumbbell,
    sits_up,
    static_belly,
  };
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      {images[exc.name.split(' ').join('_')] ? (
        <CardMedia
          className={classes.media}
          image={images[exc.name.split(' ').join('_')]}
          title='Paella dish'
        />
      ) : null}
      {parentcomp !== 'start' ? (
        <CardContent>
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {exc.name}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <strong>Exercise Name: </strong>
                {exc.name}
              </Typography>
              <Typography paragraph>
                <strong>Gear: </strong>
                {exc.gear}
              </Typography>
              <Typography paragraph>
                <strong>Difficulty level: </strong>
                {exc.difficultylevel}
              </Typography>
              <Typography paragraph>
                <strong>Sets: </strong>
                {exc.sets}
              </Typography>
              <Typography paragraph>
                <strong>Time: </strong>
                {exc.time} minutes
              </Typography>
            </CardContent>
          </Collapse>
        </CardContent>
      ) : (
        <>
          <CardContent>
            <Typography paragraph>
              <strong>Exercise Name: </strong>
              {exc.name}
            </Typography>
            <Typography paragraph>
              <strong>Gear: </strong>
              {exc.gear}
            </Typography>
            <Typography paragraph>
              <strong>Difficulty level: </strong>
              {exc.difficultylevel}
            </Typography>
            <Typography paragraph>
              <strong>Sets: </strong>
              {exc.sets}
            </Typography>
            <Typography paragraph>
              <strong>Time: </strong>
              {exc.time} minutes
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
}
