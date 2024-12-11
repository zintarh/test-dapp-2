"use client";
import React, { useCallback, useState } from "react";
import { AccountInterface } from "starknet";
import Controller from "@cartridge/controller";
import Page2 from "./test-new-connect";

const ETH_CONTRACT =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

const controller = new Controller({
  rpc: "https://api.cartridge.gg/x/starknet/mainnet",
});

export default function Main() {
  const [account, setAccount] = useState<AccountInterface | null>(null);
  async function connect() {
    try {
      const res = await controller.connect();
      if (res) {
        setAccount(res);
      }
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  }

  function disconnect() {
    controller.disconnect();
    setAccount(null);
  }

  const onIncrement = useCallback(() => {
    if (!account) return;
    account.execute([
      {
        contractAddress:
          "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
        entrypoint: "incrementCounter",
        calldata: ["0x1"],
      },
    ]);
  }, [account]);

  return (
    <div className="flex items-center flex-col justify-center h-[400px]">
      {/* {!account ? (
        <button onClick={connect}>Connect</button>
      ) : (
        <>
          <button onClick={onIncrement}>Increment Counter</button>
          <button onClick={disconnect}>Disconnect</button>
        </>
      )} */}

      <Page2 />
    </div>
  );
}
