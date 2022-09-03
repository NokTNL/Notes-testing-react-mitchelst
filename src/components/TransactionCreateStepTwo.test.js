import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("Pay button disabled on initial render", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "6" }} />);

  // Because of Formik, the button is first enabled then quickly disabled. Use await to wait until it is disabled
  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});

test("pay button disabled when only the amount is inputted but not the note", async () => {
  const user = userEvent.setup();
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "6" }} />);

  const amountInput = screen.getByLabelText(/amount/i);

  // Only amount is typed in
  await user.type(amountInput, "100");
  expect(screen.getByRole("button", { name: /pay/i })).toBeDisabled();
});
