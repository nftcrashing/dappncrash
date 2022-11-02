import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const handler = async (req, res) => {
    const {address, amount} = req.body;
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli",);
    const contract = await sdk.getcontract("0xfF919Bb7Fff7DB653B065b211810d27944821591");
    const price = amount >= 2 ? 0.075 : 0.1;
    try {
        const signedPayLoad = await contract.erc721.contract.generate({
            to: address,
            price,
            quantity: amount,
        });
        return res.status(200).json({SignedPayload});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
        
    }
    
};
export default handler;