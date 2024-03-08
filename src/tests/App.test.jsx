import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../App";

test("find heading", () => {
  render(<App />);

  const headingElement = screen.getByRole("heading", {
    name: /Sundaes on Demand/i,
  });

  expect(headingElement).toBeInTheDocument();
});
