"use client";
import React, { useEffect, useState } from "react";
import { constants, Contract, RpcProvider } from "starknet";
import { connect, disconnect } from "tokenbound-connectkit";
import { CounterABi } from "./utils/abi";
const contractAddress = "0x18ba8fe6834e089c09d62b3ff41e94f549a9797a7b93a1fb112ca9fbaf3959d";
const provider = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
});

export default function Page() {
  const [connection, setConnection] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [account, setAccount] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const counterContract = new Contract(CounterABi, contractAddress, provider);

  const connectFn = async () => {
    try {
      const { wallet } = await connect({
        tokenboundOptions: {
          chainId: constants.NetworkName.SN_MAIN,
        },
      });

      setConnection(wallet);
      setAccount(wallet?.account);
      setAddress(wallet?.selectedAddress);
    } catch (e) {
      console.error(e, "error");
      alert((e as any).message);
    }
  };

  const disconnectFn = async () => {
    await disconnect();
    setAddress("");
    setAccount(undefined);
    setConnection(null);
  };

  useEffect(() => {
    const getCounter = async () => {
      const counter = await counterContract.get_balance();
      setCount(parseInt(counter.toString()));
    };
    getCounter();
  }, []);

 

  const setCounter = async () => {
    const call = counterContract.populate("increase_balance", [1]);
    const res = await counterContract.increase_balance(call.calldata);
    await provider.waitForTransaction(res?.transaction_hash);
    const newCount = await counterContract.get_balance();
    setCount(parseInt(newCount.toString()));
  };

 
  useEffect(() => {
    if (account) {
      counterContract.connect(account);
    }
  
  }, [account])

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <div className="my-10">
      <p className="text-[30px] text-center font-bold"> Example dApp</p>
      <p className="py-1 text-center text-[#F1F0E8] font-normal">Connect with tokenbound and increament count by <span className="text-[20px] font-bold">1</span></p>
      </div>
      {!connection ? (
        <div>
          <button
            className="button text-center cursor-pointer px-5 pt-5 py-3 text-[#F1F0E8] bg-[#0C0C4F]"
            onClick={connectFn}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <button className="button text-center cursor-pointer px-5 pt-5 py-3 text-[#F1F0E8] bg-[#0C0C4F]" onClick={disconnectFn}>
          Disconnect
        </button>
      )}

      <header>
        {address && (
          <p className="pt-3">
            <b>Connected Address: <span className="text-[#F1F0E8]">{address}</span></b>
          </p>
        )}

        <div className="py-5">
          <div className="py-5 flex items-center justify-center">
            <p className="text-[20px]">
              Count: <span className="font-bold">{count}</span>
            </p>
          </div>

          <div>
            <button
              className="px-5 py-3 bg-[#0C0C4F] text-[#F1F0E8] cursor-pointer"
              onClick={setCounter}
            >
              Increment Count
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
