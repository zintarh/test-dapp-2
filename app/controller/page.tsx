
"use client"
import React, { useCallback, useEffect, useState } from "react";
import { AccountInterface } from "starknet";
import Controller from "@cartridge/controller";

const ETH_CONTRACT = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';


const controller = new Controller({
    policies: [
        {
            target: ETH_CONTRACT,
            method: 'approve',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            target: ETH_CONTRACT,
            method: 'transfer'
        },
        {
            target: ETH_CONTRACT,
            method: 'mint'
        },
        {
            target: ETH_CONTRACT,
            method: 'burn'
        },
        {
            target: ETH_CONTRACT,
            method: 'allowance'
        }
        
    ],
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

    // useEffect(() => {
    //     const autoConnect = async () => {
    //         try {
    //             if (await controller.probe()) {
    //                 await connect();
    //             }
    //         } catch (error) {
    //             console.error("Auto-connect failed:", error);
    //         }

    //     };
    //     autoConnect();
    // }, []);





    const onIncrement = useCallback(() => {
        if (!account) return;
        account.execute([
            {
                contractAddress: "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
                entrypoint: "incrementCounter",
                calldata: ["0x1"],
            },
        ]);
    }, [account]);


    console.log(account)

    return (
        <div className="flex items-center flex-col justify-center h-[400px]">
            {!account ? (
                <button onClick={connect}>Connect</button>
            ) : (
                <>
                    <button onClick={onIncrement}>Increment Counter</button>
                    <button onClick={disconnect}>Disconnect</button>
                </>
            )}
        </div>
    );
}

