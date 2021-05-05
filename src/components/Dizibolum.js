import {
  Container,
  Typography,
  Link,
  Box,
  Breadcrumbs,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Plyr from "plyr";
import BeatLoader from "react-spinners/BeatLoader";
import Subtitle from "./media/test.vtt";

const useStyles = makeStyles({
  root: {
    "& > *": {
      color: "#fff",
    },
    overflow: "hidden",
  },
  title: {
    opacity: ".6",
    marginLeft: "1rem",
    fontWeight: "lighter",
  },
  backdrop: {
    maxWidth: "90vw",
  },
});

const Dizibolum = () => {
  let { season, tmdbid, episode } = useParams();

  const classes = useStyles();
  const [data, setData] = useState(null);
  const [video, setVideo] = useState(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${tmdbid}`;
    const video = `https://api.themoviedb.org/3/tv/${tmdbid}/videos`;
    const config = {
      headers: {
        Authorization: process.env.REACT_APP_KEY,
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    const fetchData = async () => {
      const result = await axios(url, config);
      setData(result.data);
      setPoster(result.data.backdrop_path);

      const result2 = await axios(video, config);
      setVideo(result2.data.results[0].key);
    };

    fetchData();
  }, [tmdbid]);

  const player = new Plyr("#player");
  player.source = {
    type: "video",
    sources: [
      {
        src:
          "https://s710.clipwatching.com/zx5x6gow6b2dxcne4yvtpbv236vt7hp3a6ikzuppuxca5bfzrxzc7jl6nila/v.mp4",
        type: "video/mp4",
        size: 720,
        default: true,
      },
      {
        src:
          "https://s710.clipwatching.com/zx5x6gow6b2dxcne4yvtpbv236vt7hp3a6ikzuppuotq5bfzrxzgw47n7sca/v.mp4",
        type: "video/mp4",
        size: 360,
      },
    ],
    poster: `https://image.tmdb.org/t/p/w1280${poster}`,
    tracks: [
      {
        kind: "captions",
        label: "English",
        srclang: "en",
        src: `${Subtitle}`,
        default: true,
      },
    ],
  };

  return (
    <>
      {data ? (
        <Container maxWidth='lg' className={classes.root}>
          <Breadcrumbs separator='›' aria-label='breadcrumb'>
            <Link color='inherit' href={`/${tmdbid}`}>
              {data.name}
            </Link>
            <Link color='inherit' href={`/${tmdbid}/${season}`}>
              Sezon {season.replace(/[a-z-]/g, "")}
            </Link>
            <Typography>Bölüm {season.replace(/[a-z-]/g, "")}</Typography>
          </Breadcrumbs>

          <Box display='flex'>
            <Typography variant='h4' id='episodenames'>
              {data.name}
            </Typography>
            <Typography
              variant='h4'
              className={classes.title}
              id='episodenames'
            >
              - Sezon {season.replace(/[a-z-]/g, "")}
            </Typography>

            <Typography
              variant='h4'
              className={classes.title}
              id='episodenames'
            >
              - Bölüm {episode.replace(/[a-z-]/g, "")}
            </Typography>
          </Box>

          <Box mt={10}>
            <video id='player' controls></video>
          </Box>
        </Container>
      ) : (
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <BeatLoader size={50} color={"#42e3d0"} />
        </Box>
      )}
    </>
  );
};

export default Dizibolum;
