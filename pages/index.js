import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { useState } from "react";
export default function Home() {
  const address = useAddress();
  const [amount, setAmount] = useState(0);
  const { contract } = useContract(
    "0x4c626e15eB86bcFC1bfDBF2e81747394dA6cf8eA"
  );
  const mint = async () => {
    const signedPayLoadReq = await fetch("/api/generate-signature", {
      method: "POST",
      body: JSON.stringify({ address, amount }),
    });
    const data = await signedPayLoadReq.json();

    try {
      await contract.erc721.signature.mint(data.signedPayLoad);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <ConnectWallet accentColor="#f213a4" />
      <p>Price: 1 ETH</p>
      <p>If you mint 2 , the price per each NFT is going to be 0.75 ETH</p>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <button onClick={mint}>Mint</button>
    </div>
  );
}
