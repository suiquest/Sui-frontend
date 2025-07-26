import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions"
import { getContractConfig } from "./config";

type NetworkVariables = ReturnType<typeof useNetworkVariables>;

function getNetworkVariables(network: Network) {
    return networkConfig[network].variables;
}

function createBetterTxFactory<T extends Record<string, unknown>>(
    fn: (tx: Transaction, networkVariables: NetworkVariables, params: T) => Transaction
) {
    return (params: T) => {
        const tx = new Transaction();
        const networkVariables = getNetworkVariables(network);
        return fn(tx, networkVariables, params);
    };
}

type Network = "mainnet" | "testnet"

const network = "testnet";

const { networkConfig, useNetworkVariables } = createNetworkConfig({
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: getContractConfig(),
    },
    mainnet: {
        url: getFullnodeUrl("mainnet"), 
        variables: getContractConfig(),
    }
});


const suiClient = new SuiClient({ url: networkConfig[network].url });

export { getNetworkVariables, networkConfig, network, suiClient, createBetterTxFactory, useNetworkVariables };
export type { NetworkVariables };
