import React from "react";
import "./CardWrapper.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 260,
    margin: "1%",
    display: "flex",
    background: "#ddd",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
    objectFit: "contain",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function MediaControlCard(props) {
  const { movie, setfavouriteMovies, favouriteMovies } = props;
  const classes = useStyles();

  const addToFavorite = () => {
    if (movie in favouriteMovies) return;

    setfavouriteMovies([...favouriteMovies, movie]);
  };

  return (
    <Card className={classes.root + " card-wrapper"}>
      <CardMedia
        className={classes.media}
        image={movie.Poster}
        component="img"
        height="300"
        title="Poster"
      />
      <CardContent>
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
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          className={classes.button}
          startIcon={<FavoriteIcon />}
          onClick={addToFavorite}
        >
          Favorite
        </Button>
      </CardActions>
    </Card>
  );
}
