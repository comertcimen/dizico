import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  CssBaseline,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
} from "@material-ui/core";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import TvIcon from "@material-ui/icons/Tv";
import AlbumIcon from "@material-ui/icons/Album";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logo from "./media/logo.webp";
import { Link, NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  logo: {
    maxHeight: 32,
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "25vw",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
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
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
  // Drawer
  appBar: {
    background: "#14161d",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    background: "#14161d",
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    "&:hover": {
      color: "#fff",
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    textDecoration: "none",
    lineHeight: 0,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link to='/' className={classes.link} onClick={handleDrawerClose}>
              <img src={Logo} className={classes.logo} alt='' />
            </Link>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Dizi Ara...'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </ListItem>

            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>

            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Register"} />
            </ListItem>

            <NavLink
              to='/'
              className={classes.link}
              onClick={handleDrawerClose}
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </NavLink>

            <NavLink
              to='/discover'
              className={classes.link}
              onClick={handleDrawerClose}
              activeClassName={"navbaractivelink"}
            >
              <ListItem button>
                <ListItemIcon>
                  <ExploreIcon />
                </ListItemIcon>
                <ListItemText primary={"Discover"} />
              </ListItem>
            </NavLink>

            <NavLink
              to='/trends'
              className={classes.link}
              onClick={handleDrawerClose}
              activeClassName={"navbaractivelink"}
            >
              <ListItem button>
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary={"Trends"} />
              </ListItem>
            </NavLink>

            <NavLink
              to='/calendar'
              className={classes.link}
              onClick={handleDrawerClose}
              activeClassName={"navbaractivelink"}
            >
              <ListItem button>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary={"Calendar"} />
              </ListItem>
            </NavLink>

            <NavLink
              to='/allseries'
              className={classes.link}
              onClick={handleDrawerClose}
              activeClassName={"navbaractivelink"}
            >
              <ListItem button>
                <ListItemIcon>
                  <TvIcon />
                </ListItemIcon>
                <ListItemText primary={"All Series"} />
              </ListItem>
            </NavLink>

            <NavLink
              to='/collections'
              className={classes.link}
              onClick={handleDrawerClose}
              activeClassName={"navbaractivelink"}
            >
              <ListItem button>
                <ListItemIcon>
                  <AlbumIcon />
                </ListItemIcon>
                <ListItemText primary={"Collections"} />
              </ListItem>
            </NavLink>

            <NavLink
              to='/w2g'
              className={classes.link}
              onClick={handleDrawerClose}
              activeClassName={"navbaractivelink"}
            >
              <ListItem button>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary={"Watch Together"} />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    </ClickAwayListener>
  );
};

export default Navbar;
