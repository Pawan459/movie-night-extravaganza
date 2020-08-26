import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Container, CssBaseline, Button } from "@material-ui/core";
import Header from "../../Components/Header/Header";
import CardWrapper from "../../Components/CardWrapper/CardWrapper";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";

import "./HomePage.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="customCards">{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    alignSelf: "center",
    maxHeight: 60,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [searchInput, setsearchInput] = useState("");
  const [searchMoviesData, setsearchMoviesData] = useState([]);
  const [favouriteMovies, setfavouriteMovies] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    searchMovies();
  }, [searchInput]);

  const handleSearch = (event, inputValue) => {
    setsearchInput(inputValue);
    setCurrPage(1);
  };

  const handleNextPage = (event) => {
    setCurrPage(currPage + 1);
    searchMovies();
  };

  const searchMovies = async (event) => {
    await fetch(
      `http://www.omdbapi.com/?apikey=d3e883bb&s=${searchInput}*&page=${currPage}`
    )
      .then((success) => success.json())
      .then((movies) => {
        console.log(movies.Search);
        setsearchMoviesData(movies.Search);
      })
      .catch((error) => console.log(error));
  };

  const renderSearchMovies = () => {
    if (!searchMoviesData) return null;
    return searchMoviesData.map((movie, index) => {
      return (
        <CardWrapper
          key={index}
          movie={movie}
          setfavouriteMovies={setfavouriteMovies}
          favouriteMovies={favouriteMovies}
        />
      );
    });
  };

  const renderFavouriteContent = () => {
    if (!favouriteMovies) return null;
    return favouriteMovies.map((movie, index) => {
      return (
        <CardWrapper
          key={index}
          movie={movie}
          setfavouriteMovies={setfavouriteMovies}
          favouriteMovies={favouriteMovies}
        />
      );
    });
  };

  return (
    <div className="homepage">
      <Header setsearchInput={handleSearch} />
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Movies" {...a11yProps(0)} />
          <Tab label="Favourite Movies" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {renderSearchMovies()}
          {searchMoviesData && searchMoviesData.length > 9 && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
              startIcon={<NavigateNextRoundedIcon />}
              onClick={handleNextPage}
            >
              Next Page
            </Button>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {renderFavouriteContent()}
        </TabPanel>
      </Container>
    </div>
  );
}
