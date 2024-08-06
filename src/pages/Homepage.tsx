import { Grid, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "src/components/Banner";
import Loading from "src/components/Loading";
import Poster from "src/components/Poster";
import ProductCard from "src/components/ProductCard";
import { Product } from "src/types/Product";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="span">
        <Banner page="Home" />
      </div>

      <h1 style={{ textAlign: "center" }}>Sản Phẩm</h1>
      <Loading isShow={loading} />
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <br />
      <br />
      <br />
      <Poster />
    </>
  );
}

export default Homepage;
