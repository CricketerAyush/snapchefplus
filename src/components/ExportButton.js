import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ExportButton() {
  const exportPDF = () => {
    const input = document.getElementById("export-section");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("SnapChef-Recipes.pdf");
    });
  };

  return (
    <button
      onClick={exportPDF}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      📄 Export Recipes as PDF
    </button>
  );
}

export default ExportButton;
