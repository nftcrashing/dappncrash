import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const handler = async (req, res) => {
  const { address, amount } = JSON.parse(req.body);

  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");
  const contract = await sdk.getContract(
    "0x4c626e15eB86bcFC1bfDBF2e81747394dA6cf8eA"
  );
  const price = amount >= 2 ? 0.075 : 0.1;
  try {
    const signedPayLoad = await contract.erc721.signature.generate({
      to: address,
      price,
      quantity: amount,
    });
    return res.status(200).json({ signedPayLoad });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
export default handler;
