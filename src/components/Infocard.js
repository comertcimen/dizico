import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Typography, Tooltip } from "@material-ui/core";
import ClosedCaptionIcon from "@material-ui/icons/ClosedCaption";
import NoSubtitle from "./media/no_subtitle.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#1e2029",
    paddingLeft: 10,
    paddingRight: 10,
    "&:hover": {
      background: "#252833",
      cursor: "pointer",
    },
  },
  title: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
  },

  info: {
    display: "flex",
    color: "#6d7080",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
  },
  cover: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 3,
  },
  popover: {
    background: "#1d202c",
    color: "#fff",
    fontSize: ".9em",
    padding: ".5rem",
    marginBottom: ".2em",
  },
}));

const Infocard = ({ image, name, season, episode, subtitle }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={image} title='' />

      <div className={classes.title}>
        <Typography noWrap={true} variant='body1' style={{ color: "white" }}>
          {name}
        </Typography>
        <div className={classes.info}>
          <Typography variant='subtitle2'>{season}</Typography>
          <Typography variant='subtitle2'>{episode}</Typography>
          {subtitle ? (
            <Tooltip
              title='Türkçe Altyazı'
              classes={{ tooltip: classes.popover }}
              placement='top'
            >
              <ClosedCaptionIcon style={{ marginLeft: "auto" }} />
            </Tooltip>
          ) : (
            <Tooltip
              title='Altyazısız'
              classes={{ tooltip: classes.popover }}
              placement='top'
            >
              <img
                src={NoSubtitle}
                style={{
                  marginLeft: "auto",
                  marginRight: 3,
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
                alt=''
              />
            </Tooltip>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Infocard;
