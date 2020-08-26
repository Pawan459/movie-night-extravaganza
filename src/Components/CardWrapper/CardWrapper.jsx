import React from "react";
import "./CardWrapper.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: 250,
    marginBottom: 30,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    textAlign: "initial",
  },
  cover: {
    width: 151,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function MediaControlCard(props) {
  const { movie, setfavoriteMovies, favoriteMovies } = props;
  const classes = useStyles();

  const addToFavorite = () => {
    setfavoriteMovies([...favoriteMovies, movie]);
  };

  return (
    <div className="card-wrapper">
      <div className="overlay">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<FavoriteIcon />}
          onClick={addToFavorite}
        >
          Favorite
        </Button>
      </div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={movie.Poster}
          height="300"
          title="Poster"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {movie.Title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {movie.Type}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {movie.Year}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
