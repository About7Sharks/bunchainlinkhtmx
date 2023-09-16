// app.tsx
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { getPrices } from "../util/price";
import { BASEHTML } from "./html";
console.log("STARTING SERVER");

const prices = await getPrices();
const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BASEHTML>
        <>
          <h1 class="text-4xl font-semibold mx-1 mb-2">ChainLink Price Feeds</h1>
          <p class="m-2 text-shadow-md mb-3">
            All of the price feeds below are being fetched using the VIEM
            library to interact with Ethereum Name Service to fetch Chainlink's
            price oracle contracts and prices.
          </p>
          {createPriceCards(prices)}
        </>
      </BASEHTML>
    )
  )
  .get("/updateFeed", async () => {
    let prices = await getPrices()();
    return createPriceCards(prices);
  })
  .listen(8080);

console.log("Server is running on http://localhost:8080");

const createPriceCards = (prices: any) => {
  return (
    <div
      hx-get="/updateFeed"
      hx-trigger="every 5m"
      hx-swap="outerHTML"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {prices?.map((price) => (
        <div
          onclick={`copyToClip("${price.address}")`}
          class="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
        >
          <h2 class="text-2xl text-gray-900 font-semibold mb-2">
            {price.feed}
          </h2>
          <p class="text-gray-600">Price: ${(price.price * 1).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};
