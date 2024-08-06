import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Banner from "src/components/Banner";
import { useNavigate } from "react-router-dom";
import { useLoading } from "src/contexts/loading";
import axios from "axios";
import { Field, Form } from "react-final-form";
import { InputText } from "src/components/elements/InputText";
import { useCart } from "src/contexts/cart";
import { useMemo } from "react";
import { useUser } from "src/contexts/user";
import { useProductCart } from "src/hooks/useProductCart";

type CheckoutFormParams = {
  name: string;
  phone: string;
  address: string;
  payment: string;
};

function Checkout() {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const { cart } = useCart();
  const { user } = useUser();
  const { getCartUser } = useProductCart();

  const totalPrice = useMemo(() => {
    if (!cart) return 0;
    return cart.products.reduce((total, { product, quantity }) => {
      if (product && product.price) {
        return total + product.price * quantity;
      }
      return total;
    }, 0);
  }, [cart]);

  const onSubmit = async (values: CheckoutFormParams) => {
    if (!user || !cart || !cart?.products.length) return;
    try {
      setLoading(true);
      await axios.post("/orders", {
        ...values,
        products: cart.products,
        user: user._id,
        totalPrice,
      });
      await getCartUser();
      alert("Thanh toán thành công");
      nav("/");
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner page="Checkout" />

      <Typography
        variant="h3"
        color="black"
        textAlign={"center"}
        margin={"50px 0px"}
        mt={2}
      >
        Thanh toán
      </Typography>
      <Container sx={{ mb: 10 }} className="form">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            payment: "COD",
          }}
          render={({ values }) => {
            return (
              <Stack gap={3}>
                <Field
                  name="name"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Tên"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field
                  name="phone"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Số điện thoại"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field
                  name="address"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Địa chỉ"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field<string>
                  name="payment"
                  render={({ input }) => (
                    <FormControl>
                      <FormLabel>Phương thức thanh toán</FormLabel>
                      <RadioGroup {...input} row>
                        <FormControlLabel
                          value="COD"
                          control={<Radio />}
                          label="COD"
                        />
                        <FormControlLabel
                          value="BANK"
                          control={<Radio />}
                          label="BANK"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />

                <Typography variant="h5" color="blue" mt={2}>
                  Tổng : {totalPrice}
                </Typography>
                <Button variant="contained" onClick={() => onSubmit(values)}>
                  Xác nhận
                </Button>
              </Stack>
            );
          }}
        />
      </Container>
    </>
  );
}

export default Checkout;
