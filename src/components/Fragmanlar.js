import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Autoplay } from "swiper";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

SwiperCore.use([Autoplay]);

const Fragmanlar = () => {
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    const url = "https://dizicoadmin.herokuapp.com/trailers";
    const fetchItems = async () => {
      const result = await axios(url);

      const res = result.data;
      setTrailer(res);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Container maxWidth='lg'>
        <Box mb={4}>
          <Typography variant='h5' style={{ color: "#fff" }}>
            Sıradaki Sezon Fragmanları
          </Typography>
        </Box>
        {trailer.length ? (
          <Swiper
            spaceBetween={0}
            slidesPerView={5}
            wrapperTag='ul'
            autoplay={true}
            loop={false}
          >
            {trailer.map((item) => (
              <SwiperSlide tag='li' key={item.id}>
                <Story
                  poster={item.poster}
                  youtubeid={item.youtube_id}
                  title={item.title}
                  season={item.season}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
      </Container>
    </div>
  );
};

export default Fragmanlar;
