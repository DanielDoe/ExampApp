export const InvigilationReport = (staff, termDetails) => {
    let tableData = '';
    let data = '';
    let table = '';
    let schoolName = 'KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY';
    let reportSheet = `
    <!DOCTYPE html>
        <html>
        <head>
        <style>
        html, body {
            page-break-before: always;
        }
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }

        td, th {
        border: 1px solid 	#000000;
        text-align: left;
        padding: 3px;
        }

        p {
        padding: 0px;
        margin: 0px;
        text-align: center;
        font-weight: bold;
        font-family: arial, sans-serif;
        }

        tr:nth-child(even) {
        background-color: #ffffff;
        }

        @media print {
            tr, td {
                page-break-inside: avoid
            }
        }
        </style>
        </head>
        <body>`;
    for (let j = 0, newlength = staff.length; j < newlength; j++) {
        let data = staff[j];
        let sn = j + 1;
        table += `<tr>
            <td style="text-align: center;">${sn}</td>
            <td style="text-align: left;">${data.name}</td>
            <td style="text-align: center;">${data.duration_total}</td>
            <td style="text-align: left;">${data.status}</td>
            <td style="text-align: center;">${data.rate_hr}</td>
            <td style="text-align: center;">${data.amount}</td>
            <td style="text-align: center;">${data.tax}</td>
            <td style="text-align: center;">${data.amount_due}</td>
        </tr>`;
    }
    reportSheet += `
    <div style="width: 100%; height: 100%;">
    <div>
        <p>KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
        <p>COLLEGE OF ENGINEERING</p>
        <p>INVIGILATION HOURS</p>
        <p>${termDetails.sem.toUpperCase()} SEMESTER EXAMINATIONS ${termDetails.year.toUpperCase()} ACADEMIC YEAR</p>
    </div>

    <div style="padding: 0.2rem;">
        <table style="padding: 0.2rem 0rem; font-size: smaller;">
            <tr style="">
                <th style="text-align: center; font-weight: bold;padding: 10px">SN</th>
                <th style="text-align: center; font-weight: bold;">Name</th>
                <th style="text-align: center; font-weight: bold;">Time/mins</th>
                <th style="text-align: center; font-weight: bold;">Status</th>
                <th style="text-align: center; font-weight: bold;">Rate/Hr</th>
                <th style="text-align: center; font-weight: bold;">Amt(GH₵)</th>
                <th style="text-align: center; font-weight: bold;">Tax(GH₵)</th>
                <th style="text-align: center; font-weight: bold;">Amt Due (GH₵)</th>
            </tr>
            ${table}
        </table>
    </div>
    </div>`;
    return reportSheet += `
    </body>
    </html>`;
}
