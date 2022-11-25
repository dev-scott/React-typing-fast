import { Container, makeStyles } from "@material-ui/core";
import "./Feed.scss";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
   
    </Container>
  );
};

export default Feed;
