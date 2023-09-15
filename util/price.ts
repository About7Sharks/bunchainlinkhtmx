import { normalize } from "viem/ens";
import { formatUnits } from "viem";
import { client } from "./client";

const chainlinkENSFeeds = [
  "total-marketcap-usd.data.eth",
  "btc-usd.data.eth",
  "eth-usd.data.eth",
  "snx-usd.data.eth",
  "link-usd.data.eth",
  "bnb-usd.data.eth",
  "uni-usd.data.eth",
  "aave-usd.data.eth",
  "yfi-usd.data.eth",
  "xau-usd.data.eth",
  "comp-usd.data.eth",
  "mkr-usd.data.eth",
];

const chainlinkABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
];

// create type for evm wallet address that is a string and is 42 characters long and starts with 0x
type EVMAddress = string & { length: 42 } & { startsWith: "0x" };

export const getENSAddress = async (name: string) => {
  //   let normalized = normalize(name);
  // get Chainlink address from ENS name
  let address = await client.getEnsAddress({
    name,
  });
  return address;
};

export const readChainlinkOracle = async (address: EVMAddress) => {
  const latestAnswer = await client.readContract({
    address,
    abi: chainlinkABI,
    functionName: "latestAnswer",
  });
  const decimals = await client.readContract({
    address,
    abi: chainlinkABI,
    functionName: "decimals",
  });
  const price = formatUnits(latestAnswer, decimals);
  return price;
};

export const getPrices = async () => {
  const addresses = await Promise.all(
    chainlinkENSFeeds.map((feed) => getENSAddress(feed))
  );
  // read all chainlink ENS addresses
  const prices = await Promise.all(
    addresses.map((address) => readChainlinkOracle(address))
  );
  // print all chainlink ENS addresses
  return chainlinkENSFeeds.map((feed, i) => ({
    feed,
    address: addresses[i],
    price: prices[i],
  }));
};
