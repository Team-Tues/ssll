interface TokenURI {
  image: string;
  description?: string;
  website?: string;
  x?: string;
  discord?: string;
  telegram?: string;
}

interface TokenEvent {
  token: `0x${string}`;
  name: string;
  symbol: string;
  tokenURI: TokenURI;
}
