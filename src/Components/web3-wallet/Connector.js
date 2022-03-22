import { InjectedConnector } from "@web3-react/injected-connector";

export const injector = new InjectedConnector({
  // ID: 1 --> Eth mainnet
  // ID: 3 --> Ropsten Testnet
  // ID: 4 --> Rinkeby Testnet
  // ID: 5 --> Goerli Testnet
  // ID: 42 --> Kovan Testnet
  supportedChainIds: [1, 3, 4, 5, 42],
});
