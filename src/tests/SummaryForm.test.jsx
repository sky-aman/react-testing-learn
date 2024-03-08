import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import SummaryForm from "../pages/SummaryForm";
import userEvent from "@testing-library/user-event";

test("checkbox flow", () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitButton = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(checkboxElement).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test("button enable on checkbox first click and disable on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitButton = screen.getByRole("button", {
    name: /submit/i,
  });

  await userEvent.click(checkboxElement);
  expect(submitButton).toBeEnabled();

  await userEvent.click(checkboxElement);
  expect(submitButton).toBeDisabled();
});

test("popover reponds to a hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    "No ice cream will actually be delivered"
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);

  const popover = screen.queryByText("No ice cream will actually be delivered");
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
