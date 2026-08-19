const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'src', 'public', 'docs');
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
}

function createSimplePDF(title, filename) {
    const stream = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 120 >>
stream
BT
/F1 20 Tf
50 720 Td
(${title}) Tj
0 -40 Td
/F1 12 Tf
(A.G.M. Rural College of Engineering & Technology - Official Document) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000414 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
485
%%EOF`;

    const filePath = path.join(docsDir, filename);
    fs.writeFileSync(filePath, stream);
    console.log(`Created PDF document: ${filename}`);
}

createSimplePDF('AGMRCET - Mandatory Disclosure Statement', 'MD.pdf');
createSimplePDF('AICTE Letter of Approval & Extension 2025-26', 'Eoa_and_Loa_25_26.pdf');
createSimplePDF('AGMRCET - Academic Calendar of Events', 'coe.pdf');
createSimplePDF('AGMRCET HR Policy and Service Rules', 'AGMRCET HR POLICY.pdf');
createSimplePDF('AGMRCET Semester End Examination Notification', 'SEE.pdf');
