import "./App.css";
// import button
import { Button } from "react-bootstrap";
// Hooks
import useMetaMask from "./Components/hooks/useMetaMask";

function App() {
  const { connect, disconnect, isActive, account, chainId, ethBalance } =
    useMetaMask();
  let networkName = setChainIdName(chainId);

  return (
    <div className="app">
      <h1>Welcome, To get started minting please connect with MetaMask!</h1>
      <div className="btn-container">
        <div className="btn-item">
          {isActive ? disconnectButton(disconnect) : connectButton(connect)}
        </div>
      </div>
      <div className="mt-2 mb-2">
        Account:
        <b> {isActive ? account : "You are not connected to MM yet!"}</b>
      </div>
      <div className="mt-2 mb-2">
        Network ChainID:{" "}
        {isActive ? chainId : "You are not connected to MM Yet!"}
      </div>
      <div className="mt-2 mb-2">
        Network Name:{" "}
        {isActive ? networkName : "You are not connected to MM Yet!"}
      </div>
      <div className="mt-2 mb-2">Account Balance: {ethBalance} ETH</div>
    </div>
  );
}

function connectButton(connect) {
  return (
    <Button className="btn-item" variant="primary" onClick={connect}>
      connnect to MM
    </Button>
  );
}

function disconnectButton(disconnect) {
  return (
    <Button className="btn-item" variant="danger" onClick={disconnect}>
      Disconnect from MM
    </Button>
  );
}

function setChainIdName(chainId) {
  let networkName = "";
  switch (chainId) {
    case 1:
      networkName = "Ethereum Mainnet";
      break;
    case 3:
      networkName = "Eth Ropsten Testnet";
      break;
    case 4:
      networkName = "Eth Rinkeby Testnet";
      break;
    case 5:
      networkName = "Eth Goerli Testnet";
      break;
    case 42:
      networkName = "Eth Kovan Testnet";
      break;
    default:
      networkName = "Unknown Network";
  }

  return networkName;
}

export default App;
