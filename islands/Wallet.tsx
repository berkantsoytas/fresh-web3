/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { ethers, providers } from "ethers";

export default function Wallet() {
  const [connected, setConnected] = useState(true);
  const [account, setAccount] = useState<string>("0x0");

  useEffect(() => {
    async function connection() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        const addresses = await provider.listAccounts();
        if (addresses.length) {
          setConnected(true);
        } else {
          setConnected(false);
        }
      } else {
        alert("Please install web3 wallet.");
      }
    }
    connection();
  }, []);

  async function connect() {
    try {
      console.log("click");
      const provider = new providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const accounts = (await provider.listAccounts()) as string[];
      setAccount(accounts[0]);
      setConnected(true);
      console.log(accounts);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <div class={tw`flex flex-col gap-2 w-full`}>
      <div class={tw`flex flex-row gap-2 w-full`}>
        <button
          class={tw`block w-full px-12 py-3 text-sm font-medium text-white bg-green-600 border border-green-600 rounded sm:w-auto active:text-opacity-75 hover:bg-green-400 focus:outline-none focus:ring disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={!IS_BROWSER || connected}
          onClick={connect}
        >
          Connect
        </button>
      </div>
      <p class={tw`flex-grow-1 font-bold text-xl`}>
        {account === "0x0" ? (
          <span>Please Connect Wallet</span>
        ) : (
          <span>{account}</span>
        )}
      </p>
    </div>
  );
}
