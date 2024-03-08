import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json([
      {
        name: "Mint chip",
        imagePath: "/images/mint-chip.png",
      },
      {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
      },
    ]);
  }),
  http.get("http://localhost:3030/toppings", () => {
    return HttpResponse.json([
      {
        name: "Peanut butter cups",
        imagePath: "/images/peanut-butter-cups.png",
      },
      {
        name: "Gummi bears",
        imagePath: "/images/gummi-bears.png",
      },
      {
        name: "Mochi",
        imagePath: "/images/mochi.png",
      },
    ]);
  }),
];
