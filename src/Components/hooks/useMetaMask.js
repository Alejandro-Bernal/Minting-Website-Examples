import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injector } from "../web3-wallet/Connector";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  // Define the web3 functions we will need from the web3 core
  const { activate, chainId, account, library, connector, active, deactivate } =
    useWeb3React();

  const ethBalance = useBalance(library, account);

  const [isActive, setIsActive] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false); // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(true);

  // init the loading
  useEffect(() => {
    connect().then((val) => {
      setIsLoading(false);
    });
  }, []);

  const handleIsActive = useCallback(() => {
    console.log("Connected to WEB3 with Metamask.", active);
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // connect function for web 3
  const connect = async () => {
    console.log("Connecting to MetaMask...");
    setShouldDisable(true);
    try {
      await activate(injector);
      setShouldDisable(false);
    } catch (err) {
      console.log("Error Connecting: ", err);
    }
  };

  // Disconnect your account when you are done
  const disconnect = async () => {
    console.log("Disconnecting...");
    try {
      await deactivate();
    } catch (err) {
      console.log("error disconnecting from web 3: ", err);
    }
  };

  const values = useMemo(
    () => ({
      chainId,
      ethBalance,
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
      shouldDisable,
    }),
    [isActive, isLoading, shouldDisable, account, chainId, ethBalance]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetamMask must be used with MetaMaskProvider component."
    );
  }

  return context;
}

function useBalance(library, account) {
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (account) {
      console.log("user is connected to WEB3");
      library.eth.getBalance(account).then((val) => setBalance(val));
    }
  }, [account, library]);

  return balance ? formatEther(balance) : "Please Connect to get ETH Balance";
}
