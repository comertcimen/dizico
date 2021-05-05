import { Container, Typography, Button, Grid, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const useStyles = makeStyles({
  root: {
    "& > *": {
      color: "#fff",
    },
    overflow: "hidden",
  },
  btn: {
    background: "#42e3d0",
    color: "#14161d !important",
    marginBottom: ".5rem",
    "&:hover": {
      background: "#42e3d0",
      color: "#14161d !important",
    },
  },
  grid: {
    marginTop: "1rem",
    justifyContent: "center",
  },
  poster: {
    borderRadius: 5,
    boxShadow: "0 20px 30px 0 rgba(0, 0, 0, .8)",
  },
  overviewtitle: {
    marginBottom: "1rem",
  },
  genretitle: {
    marginTop: "1rem",
  },
  genres: {
    color: "#42e3d0",
    marginBottom: "1rem",
  },
  table: {
    borderSpacing: 0,
    marginTop: "1rem",
    whiteSpace: "nowrap",
  },
  td: {
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "13px 20px 15px",
    textAlign: "center",
  },
});

const Dizisezon = () => {
  let { season, tmdbid } = useParams();
  const tmdbtrimmed = tmdbid.replace(/[-^].*/, "");

  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${tmdbtrimmed}`;
    const config = {
      headers: {
        Authorization: process.env.REACT_APP_KEY,
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    const fetchData = async () => {
      const result = await axios(url, config);
      setData(result.data);
    };

    fetchData();
  }, [tmdbtrimmed]);

  return (
    <>
      {data ? (
        <Container maxWidth='lg' className={classes.root}>
          <Button variant='contained' size='small' className={classes.btn}>
            {data.in_production ? "DEVAM EDIYOR" : "SONLANDIRILDI"}
          </Button>
          <Box display='flex'>
            <Typography
              id='episodenames'
              variant='h4'
              style={{
                color: "#fff",
              }}
            >
              {data.name}
            </Typography>
            <Typography
              id='episodenames'
              variant='h4'
              style={{
                color: "#fff",
                opacity: ".6",
                marginLeft: 8,
                fontWeight: "lighter",
              }}
            >
              - Sezon {season.replace(/[a-z-]/g, "")}
            </Typography>
          </Box>

          <Grid container className={classes.grid}>
            <Grid item xl={4} lg={4} md={6}>
              <img
                src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                className={classes.poster}
                alt=''
              />
            </Grid>

            <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='h6' className={classes.overviewtitle}>
                  Genel Bakış
                </Typography>
                <Typography variant='body1'>{data.overview}</Typography>
                <Typography variant='body1' className={classes.genretitle}>
                  Genres:{" "}
                  <span className={classes.genres}>
                    {data.genres.map((genre) => genre.name + " ")}
                  </span>
                </Typography>
                <table className={classes.table} id='table'>
                  <tbody>
                    <tr>
                      <td className={classes.td}>
                        <div>Country</div>
                        <div>{data.origin_country}</div>
                      </td>

                      <td className={classes.td}>
                        <div>Episode Length</div>
                        <div>
                          {data.episode_run_time.map((time) => time + " min ")}
                        </div>
                      </td>

                      <td className={classes.td}>
                        <div>Number of Episodes</div>
                        <div>{data.number_of_episodes}</div>
                      </td>

                      <td className={classes.td}>
                        <div>Imdb</div>
                        <div>{data.vote_average}</div>
                      </td>

                      <td className={classes.td}>
                        <div>First Air Date</div>
                        <div>{data.first_air_date}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Grid>
          </Grid>
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

export default Dizisezon;
