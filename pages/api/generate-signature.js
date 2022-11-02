import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const handler = async (req, res) => {
    const {address, amount} = req.body;
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");
    const contract = await sdk.getContract("0xF0E1E7C95ef6C4DCBBB23c300E6A2E135DE624B7");
    const price = amount >= 2 ? 0.075 : 0.1;
    try {
        const signedPayLoad = await contract.erc721.signature.generate({
            to: address,
            price,
            quantity: amount,
        });
        return res.status(200).json({signedPayload});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
        
    }
    
};
export default handler;