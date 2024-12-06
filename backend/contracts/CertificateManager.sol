// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateManager {
    string public companyName;
    string public issueDate;

    // Event for logging the certificate details
    event CertificateIssued(string companyName, string issueDate);

    // Constructor
    constructor() {
        companyName = "";
        issueDate = "";
    }

    // Function to set the certificate details
    function setCertificateDetails(string memory _companyName, string memory _issueDate) public {
        companyName = _companyName;
        issueDate = _issueDate;

        // Emit the event after setting the certificate details
        emit CertificateIssued(_companyName, _issueDate);
    }

    // Function to get the certificate details
    function getCertificateDetails() public view returns (string memory, string memory) {
        return (companyName, issueDate);
    }
}
