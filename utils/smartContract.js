import { JsonRpcProvider, Contract } from "ethers";

export async function fetchCertificate() {
    const provider = new JsonRpcProvider("http://127.0.0.1:8545"); // Ensure the local node is running
    const contract = new Contract(
        "0x8464135c8f25da09e49bc8782676a84730c318bc", // Replace with your contract address
        [
            {
                "inputs": [],
                "name": "getCertificateDetails",
                "outputs": [
                    { "internalType": "string", "name": "", "type": "string" },
                    { "internalType": "string", "name": "", "type": "string" }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        provider
    );

    const [companyName, issuedDate] = await contract.getCertificateDetails(); // Correct function call
    return { companyName, issuedDate };
}
