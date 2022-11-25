import { Grid, makeStyles } from "@material-ui/core";
import "./App.scss";
import Add from "./components/Add";
import Game from "./components/Game/Game";
// import Feed from "./components/Feed";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar/Rightbar";


const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className="contain_all">
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Game/>
        </Grid>
     
      </Grid>
      {/* <Add /> */}
    </div>
  );
};

export default App;
