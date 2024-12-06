const hre = require("hardhat");

async function main() {
  // Deploy the CertificateManager contract
  const CertificateManager = await hre.ethers.getContractFactory("CertificateManager");
  const certificateManager = await CertificateManager.deploy(); // Deploy the contract

  console.log("Deploying contract...");
  const receipt = await certificateManager.waitForDeployment(); // Wait for the deployment to complete

  console.log("CertificateManager deployed to:", certificateManager.target); // Log the contract address

  // Now set the company name and issue date in the contract
  const companyName = "CHAMPION SDN BHD";
  const issueDate = "1/12/2024";

  // Transact the data to the contract
  const setCertificateTx = await certificateManager.setCertificateDetails(companyName, issueDate);
  await setCertificateTx.wait(); // Wait for the transaction to be mined

  console.log(`Certificate details set: Company Name - ${companyName}, Issue Date - ${issueDate}`);
}

// Run the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
