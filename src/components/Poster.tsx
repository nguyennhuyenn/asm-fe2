import React from "react";
import { Container } from "@mui/material";

type Props = {};

const Poster = (props: Props) => {
  return (
    <div>
      <Container>
        <div className="poster-main">
          <div className="poster-left">
            <img
              src="https://newdocer.cache.wpscdn.com/photo/20190912/e3e933dc2d4f4f799d5dd188fe9a12a3.jpg"
              alt=""
            />
          </div>
          <div className="poster-right">
            <div className="poster-top">
              <img
                src="https://thuthuatjb.com/wp-content/uploads/2021/09/Hinh-nen-iPhone-13.png"
                alt=""
              />
            </div>
            <div className="poster-bot">
              <img
                className="left"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/f3832e180145769.6505ae76214ca.jpg"
                alt=""
              />
              <img
                className="right"
                src="https://i.pinimg.com/736x/f9/1c/3a/f91c3a9be28b0c467b50baa3672011ad.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Poster;
