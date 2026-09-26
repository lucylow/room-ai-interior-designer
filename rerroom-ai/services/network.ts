import * as Network from "expo-network";
import { useMemo } from "react";
import { toConnectivity, type Connectivity } from "./networkCore";

export function useConnectivity(): Connectivity {
  const state = Network.useNetworkState();
  return useMemo(() => toConnectivity(state), [state.isConnected, state.isInternetReachable]);
}
