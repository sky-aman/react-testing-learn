import { render, screen } from "../../../test-utils/testing-library-utils";
import { expect, test } from "vitest";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  //   confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Mint chip scoop", "Vanilla scoop"]);
});

test("display images for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImage = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImage).toHaveLength(3);
  const toppings = toppingImage.map((topping) => topping.alt);

  expect(toppings).toEqual([
    "Peanut butter cups topping",
    "Gummi bears topping",
    "Mochi topping",
  ]);
});
