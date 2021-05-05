import { Container, Box, Typography, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import Dizi from "./Dizi";

const Editorspick = () => {
  const url = "https://dizicoadmin.herokuapp.com/editorspicks";
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(url);

      const res = result.data;
      setPicks(res);
    };

    fetchItems();
  }, []);

  return (
    <>
      <Container style={{ marginTop: 40 }}>
        <Box mb={4}>
          <Typography variant='h5' style={{ color: "#fff" }}>
            Editörün Seçtikleri
          </Typography>
        </Box>
        <Grid container direction='row' spacing={2}>
          {picks.map((item) => (
            <Grid item xl={3} md={4} sm={6} xs={12} key={item.id}>
              <Link
                to={`/${item.tmdb_id}-${item.title
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                <Suggestion image={item.backdrop} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Switch>
        <Route path={`/:tmdbid`}>
          <Dizi />
        </Route>
      </Switch>
    </>
  );
};

export default Editorspick;
