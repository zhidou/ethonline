import * as ethers from "ethers";

// const network = process.env.NODE_ENV === "production" ? "homestead" : "goerli";
const network = "homestead";

export const ehtersProvider = ethers.getDefaultProvider(network, {
  etherscan: "KRPN34QZW7X416XCT6IWRUF7J2HTSWSKSS",
});
