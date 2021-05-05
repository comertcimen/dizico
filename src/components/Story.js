import React, { useState } from "react";
import { Dialog, DialogContent, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Plyr from "plyr";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:first-child": {
      padding: 0,
      lineHeight: 0,
    },
  },
  box: {
    width: "60vw",
  },
}));

const Story = ({ poster, youtubeid, title, season }) => {
  const [open, setOpen] = useState(false);
  const [watched, setWatched] = useState("story");

  const player = new Plyr("#player");
  player.source = {
    type: "video",
    sources: [
      {
        src: `${youtubeid}`,
        provider: "youtube",
      },
    ],
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setWatched("storyvisited");
  };
  const classes = useStyles();

  return (
    <div className='alignstory'>
      <div className={watched}>
        <img src={poster} alt='' onClick={handleClickOpen} />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent className={classes.root}>
            <Box className={classes.box} id='storymobile'>
              <div className='plyr__video-embed' id='player'>
                <iframe
                  title={`${youtubeid}`}
                  src={`https://www.youtube.com/embed/${youtubeid}`}
                  allowFullScreen
                  allowtransparency='true'
                  width='100%'
                  height='100%'
                  allow='autoplay'
                ></iframe>
              </div>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
      <Typography
        noWrap={true}
        align='right'
        variant='subtitle2'
        style={{ color: "#fff" }}
      >
        {title}
      </Typography>
      <Typography
        display='inline'
        noWrap={true}
        align='right'
        variant='caption'
        style={{ color: "#6d7080" }}
      >
        {`Sezon ${season}`}
      </Typography>
    </div>
  );
};

export default Story;
