import {
  Button,
  Container,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import Banner from "src/components/Banner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "src/contexts/cart";
import { useProductCart } from "src/hooks/useProductCart";
import { Link } from "react-router-dom";

const labels = ["Product", "Price", "Quantity", "Action"];

function Cart() {
  const { cart } = useCart();
  const { removeToCart } = useProductCart();

  return (
    <>
      <div className="span">
        <Banner page="Cart" />
      </div>

      {/* Tieu de */}
      <Container>
        <h1 style={{ textAlign: "center" }}>Giỏ hàng</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {labels.map((label, index) => (
                  <TableCell key={index} align="center">
                    <Typography fontWeight={500}>{label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cart?.products.map((item, index) =>
                item?.product ? (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <img
                        src={item.product.image}
                        width={"100px"}
                        alt={item.product.title}
                      />
                      <Typography fontWeight={500}>
                        {item.product.title.substring(0, 10)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={500}>
                        {item.product.price}đ
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={500}>{item.quantity}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => removeToCart(item.product._id)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={index}>
                    <TableCell colSpan={4} align="center">
                      <Typography color="error">
                        Product information not available.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack alignItems={"center"} sx={{ mt: 3 }}>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ mb: 10 }}>
              Thanh toán
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
}

export default Cart;
