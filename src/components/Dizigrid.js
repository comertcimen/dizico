import { Container, Grid, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Infocard from "./Infocard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loadmore: {
    "& > *": {
      background: "#1e2029",
      color: "#9b9dab",
      marginTop: "1rem",
    },
    "& > *:hover": {
      background: "#252833",
      color: "#fff",
    },
  },
  link: {
    textDecoration: "none",
    lineHeight: 0,
  },
}));

const Dizigrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const url =
    "https://dizicoadmin.herokuapp.com/series?_sort=published_at:desc";

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(url);

      const res = result.data;
      setItems(res);
    };

    fetchItems();
  }, []);

  const loader = () => {
    setLoading(true);

    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container style={{ marginTop: 40 }}>
      <Box mb={4}>
        <Typography variant='h5' style={{ color: "#fff" }}>
          Son bölümler
        </Typography>
      </Box>
      <Grid container direction='row' spacing={2}>
        {items.map((item) => (
          <Grid item xl={3} md={4} sm={12} xs={12} key={item.id}>
            <Link
              className={classes.link}
              to={`/${item.tmdb_id}-${item.serie_title
                .toLowerCase()
                .replace(/ /g, "-")}/season-${item.season}/episode-${
                item.episode
              }`}
            >
              <Infocard
                image={item.poster}
                name={item.serie_title}
                season={`Sezon ${item.season}`}
                episode={`Bölüm ${item.episode}`}
                subtitle={item.subtitle}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
      <div className={classes.loadmore}>
        <Button
          variant='contained'
          size='large'
          fullWidth={true}
          startIcon={!loading && <AddIcon />}
          onClick={loader}
          disabled={loading}
        >
          {loading ? <CircularProgress size={25} /> : "Daha Fazla Göster"}
        </Button>
      </div>
    </Container>
  );
};

export default Dizigrid;
