import { useEffect, useState } from "react";
import { getTokenEvents } from "../utils/getTokenEvents";

export default function ListTokens() {
  const [tokenEvents, setTokenEvents] = useState<TokenEvent[]>([]);

  useEffect(() => {
    getTokenEvents().then((tokens: TokenEvent[]) => {
      setTokenEvents(tokens.reverse());
    });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(tokenEvents, null, 4)}</pre>
    </div>
  );
}
