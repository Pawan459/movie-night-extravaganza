import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, CssBaseline } from "@material-ui/core";
import Header from "../../Components/Header/Header";
import CardWrapper from "../../Components/CardWrapper/CardWrapper";

import "./HomePage.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [searchInput, setsearchInput] = useState("");
  const [searchMoviesData, setsearchMoviesData] = useState([]);
  const [favoriteMovies, setfavoriteMovies] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    searchMovies();
  }, [searchInput]);

  const searchMovies = async (event) => {
    await fetch(
      `http://www.omdbapi.com/?apikey=d3e883bb&s=${searchInput}*&page=1`
    )
      .then((success) => success.json())
      .then((movies) => {
        console.log(movies.Search);
        setsearchMoviesData(movies.Search);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="homepage">
      <Header setsearchInput={setsearchInput} />
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Movies" {...a11yProps(0)} />
          <Tab label="Favorite Movies" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {searchMoviesData &&
            searchMoviesData.map((movie, index) => {
              return (
                <CardWrapper
                  key={index}
                  movie={movie}
                  setfavoriteMovies={setfavoriteMovies}
                  favoriteMovies={favoriteMovies}
                />
              );
            })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {favoriteMovies &&
            favoriteMovies.map((movie, index) => {
              return (
                <CardWrapper
                  key={index}
                  movie={movie}
                  setfavoriteMovies={setfavoriteMovies}
                  favoriteMovies={favoriteMovies}
                />
              );
            })}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Container>
    </div>
  );
}
