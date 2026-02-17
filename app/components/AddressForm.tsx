import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <div>
      <h3>Address</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
            console.log(address);
          }
        }}
      />
    </div>
  );
};

export default AddressForm;