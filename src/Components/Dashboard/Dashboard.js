import React, { useState, useEffect } from "react";
import searchMovies from "../search.service";
import MovieCard from '../MovieCard';
import AppBar from "@material-ui/core/AppBar";
import MovieCreationIcon from "@material-ui/icons/MovieCreation";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import _ from "lodash";
import SearchList from '../SearchList';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Collection
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#FFFFFF",
    width: '100%',
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  icon: {
    marginRight: theme.spacing(3),
  },
  loginout: {
    marginLeft: theme.spacing(3),
    color: "#FFFFFF",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#FFFFFF",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    margin: theme.spacing(0, 2, 0, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 1),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
    width:'100%'
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  list: {
    color: '#FFFFFF'
  },
  cross: {
    position: "absolute",
    right: "5px",
    top: "5px",
  },
  mtitle: {
    textAlign: "center",
  },
  cardMedia: {
    paddingTop: "56.25%",
    position: "relative",
    height: '250px',
  },

  cardContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "none",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Album(props) {
  const [auth, setAuth] = useState(true);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([])
  const [searchKey, setSearchKey] = useState('');
  const [open, setOpen] = React.useState(false);
  const [msg, setMessage] = React.useState('');
  const [severityType, setSeverityType] = React.useState('');

  const classes = useStyles();

  useEffect(() => {
    searchMovies('https://api.themoviedb.org/3/discover/movie?api_key=d22b99661d93534df089283a0b5300ec&language=en-US&sort_by=popularity.desc', "", 1)
      .then((res) => {
        let tempData = res && res.data && res.data.results && res.data.results.length > 0 ? res.data.results : []
        setData(tempData)
      }
      );
  }, []);

  const handleSearch = (event) => {
    setSearchKey(event.target.value)
    searchMovies('https://api.themoviedb.org/3/search/movie?api_key=d22b99661d93534df089283a0b5300ec', event.target.value, 1).then((res) => {
      setSearchData(res && res.data && res.data.results && res.data.results.length > 0 ? res.data.results : [])
    }).catch(() => {
      setSearchData([])
      setSearchKey('')
    })
  };

  const selectedItem = (item) => {
    let tempData = [item, ...data]

    setData(_.uniqBy(tempData), 'title')
    setSearchKey('')
    setOpen(true)
    setMessage('New Movie Added into collection')
    setSeverityType('success')
  }

  const handleChange = (event) => {
    setAuth(event.target.checked);
    props.setToggleCompFunc(false)
  };

  const removeMovie = (index) => {
    let tempData = _.cloneDeep(data);
    tempData.splice(index, 1);
    setData(tempData);
    setOpen(true)
    setMessage('Movie Removed')
    setSeverityType('error')
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessage('')
    setSeverityType('')
  };
  return (
  <div style={{'width' :'100vw'}} >
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MovieCreationIcon className={classes.icon} />
          <Typography className={classes.title} variant="h6" noWrap>
            Movies
            </Typography>
          <div >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Movies"
                onChange={(event) => handleSearch(event)}
                value={searchKey}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {searchKey ? <SearchList data={searchData} selectedItem={selectedItem} /> : ''}
          </div>
          <div className={classes.loginout}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    className={classes.loginout}
                    checked={auth}
                    onChange={handleChange}
                    aria-label="login switch"
                  />
                }
                label={auth ? "Logout" : "Login"}
              />
            </FormGroup>
          </div>
        </Toolbar>
      </AppBar>
    </div>
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Your Movies
            </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} >
        {/* End hero unit */}
        <Grid container spacing={4}>
          {data.map((movie, index) => (
            <Grid item key={movie.title} xs={12} sm={6} md={3}>
              <MovieCard
                title={movie.title}
                url={movie.poster_path}
                index={index}
                aremoveMovie={removeMovie}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severityType}>
        {msg}
        </Alert>
    </Snackbar>
    <footer className={classes.footer}>
      <Copyright />
    </footer>
    </div>
  );
}
