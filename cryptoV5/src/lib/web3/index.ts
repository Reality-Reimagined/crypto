// lib/web3/index.ts
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 137] // Ethereum, BSC, Polygon
});

export function getLibrary(provider) {
  return new Web3Provider(provider);
}
