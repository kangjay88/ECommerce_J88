import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress} 
          touched={touched} // whether someone has clicked on the field, isTouched becomes true as soon as they touch it
          errors={errors}  //error text that is provided in the validation schema ("required")
          handleBlur={handleBlur} 
          handleChange={handleChange}  //the value that gets changed
        />
      </Box>

      <Box mb="20px">
        <FormControlLabel //the checkbox for "same as shipping address"
          control={
            <Checkbox //look at Material UI documentation to see how this format works
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress", //how we refer to the field
                  !values.shippingAddress.isSameAddress //how we flip the checkbox
                )
              }
            />
          }
          label="Same for Shipping Address"
        />
      </Box>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && ( //if it is not checked: reveal this information
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;