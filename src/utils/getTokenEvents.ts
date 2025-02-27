import { publicClient } from "../config";
import { launchpadAbi } from "../abis/launchpadAbi";

export async function getTokenEvents(): Promise<TokenEvent[]> {
  // get all logs emitted from launchpad
  const logs: any = await publicClient.getLogs({
    address: process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS as `0x${string}`,
    event: launchpadAbi[3] as any,
    fromBlock: BigInt(76282020),
    toBlock: "latest",
  });
  // map token address to TokenURI
  const tokenEvents: TokenEvent[] = [];
  logs.forEach((log: any) => {
    tokenEvents.push({
      token: log.args._token,
      name: log.args._name,
      symbol: log.args._symbol,
      tokenURI: JSON.parse(atob(log.args._tokenURI.split(",")[1])),
    });
  });
  return tokenEvents;
}
