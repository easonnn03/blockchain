import { fetchCertificate } from "../utils/smartContract";
import { generatePDF } from "../utils/pdfGenerator";

export default function Home() {
    const handleGenerateCert = async () => {
        try {
            const { companyName, issuedDate } = await fetchCertificate();
            console.log("Fetched certificate:", companyName, issuedDate);

            const pdfBytes = await generatePDF(companyName, issuedDate);

            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Certificate_of_authenticity.pdf";
            a.click();
        } catch (error) {
            console.error("Error generating certificate:", error);
        }
    };

    return (
        <div>
            <h1>Certificate Generator</h1>
            <button onClick={handleGenerateCert}>Generate Certificate</button>
        </div>
    );
}
