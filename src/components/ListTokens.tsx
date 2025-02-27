import { useEffect, useState } from "react";
import { getTokenEvents } from "../utils/getTokenEvents";

export default function ListTokens() {
  const [tokenEvents, setTokenEvents] = useState<TokenEvent[]>([]);

  useEffect(() => {
    getTokenEvents().then((tokens: TokenEvent[]) => {
      setTokenEvents(tokens);
    });
  }, []);

  return (
    <div>
      <pre>
        {JSON.stringify(
          tokenEvents.map((token) => ({
            ...token,
            dex: `https://agni.finance/swap?outputCurrency=${token.token}`,
          })),
          null,
          4
        )}
      </pre>
    </div>
  );
}
