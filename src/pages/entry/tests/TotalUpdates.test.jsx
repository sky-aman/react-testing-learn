import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { expect } from "vitest";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<Options optionType="scoops" />);

  //   make sure total starts out at $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const mintChipInput = await screen.findByRole("spinbutton", {
    name: "Mint chip",
  });
  await user.clear(mintChipInput);
  await user.type(mintChipInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
  unmount();
});

test("update topping subtotal when topping change", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<Options optionType="toppings" />);

  const toppingSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubTotal).toHaveTextContent("0.00");

  const peanutButterCheck = await screen.findByRole("checkbox", {
    name: "Peanut butter cups",
  });
  await user.click(peanutButterCheck);
  expect(toppingSubTotal).toHaveTextContent("1.50");

  const mochiCheck = await screen.findByRole("checkbox", {
    name: "Mochi",
  });

  await user.click(mochiCheck);
  expect(toppingSubTotal).toHaveTextContent("3.00");

  // remove peanut butter topping
  await user.click(peanutButterCheck);
  expect(toppingSubTotal).toHaveTextContent("1.50");

  unmount();
});

describe("grand total", () => {
  test("grand total starts at $0.00", async () => {
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
    unmount();
  });

  test.skip("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /^Grand total/i,
    });

    const mintChipInput = await screen.findByRole("spinbutton", {
      name: "Mint chip",
    });
    await user.clear(mintChipInput);
    await user.type(mintChipInput, "2");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "3");

    const mochiTopping = await screen.findByRole("checkbox", {
      name: "Mochi",
    });
    await user.click(mochiTopping);

    expect(grandTotal).toHaveTextContent("11.50");
    unmount();
  });

  test.skip("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /^Grand total/i,
    });

    const mochiTopping = await screen.findByRole("checkbox", {
      name: "Mochi",
    });
    await user.click(mochiTopping);

    const gummiBearsTopping = await screen.findByRole("checkbox", {
      name: "Gummi bears",
    });
    await user.click(gummiBearsTopping);

    const mintChipInput = await screen.findByRole("spinbutton", {
      name: "Mint chip",
    });
    await user.clear(mintChipInput);
    await user.type(mintChipInput, "2");

    expect(grandTotal).toHaveTextContent("7.00");
    unmount();
  });

  test.skip("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /^Grand total/i,
    });

    const mochiTopping = await screen.findByRole("checkbox", {
      name: "Mochi",
    });
    await user.click(mochiTopping);
    await user.click(mochiTopping);

    const gummiBearsTopping = await screen.findByRole("checkbox", {
      name: "Gummi bears",
    });
    await user.click(gummiBearsTopping);

    const mintChipInput = await screen.findByRole("spinbutton", {
      name: "Mint chip",
    });
    await user.clear(mintChipInput);
    await user.type(mintChipInput, "2");

    expect(grandTotal).toHaveTextContent("5.50");
    unmount();
  });
});
