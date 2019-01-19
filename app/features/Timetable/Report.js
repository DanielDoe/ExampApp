import staff from './sample';



export const Report = () => {
    let tableData = '';
    let data = '';
    let table = '';
    let schoolName = 'KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY';
    let termDetails = {
        Year: '2017/2018 ',
        Term: 'SECOND'
    };
    let reportSheet = `
    <!DOCTYPE html>
        <html>
        <head>
        <style>
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }

        td, th {
        border: 1px solid #dddddd;
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
        </style>
        </head>
        <body>`;
    for (let j = 0, newlength = staff.length; j < newlength; j++) {
        let data = staff[j];
        let sn = j + 1;
        table += `<tr>
            <td style="text-align: left;">${sn}</td>
            <td style="text-align: left;">${data.name}</td>
            <td style="text-align: left;">${data.hours}</td>
            <td style="text-align: left;">${data.status}</td>
            <td style="text-align: left;">${data.rate_hr}</td>
            <td style="text-align: left;">${data.amount}</td>
            <td style="text-align: left;">${data.Tax}</td>
            <td style="text-align: left;">${data.amount_due}</td>
        </tr>`;
    }
    reportSheet += `
    <div style="width: 100%; height: 100%;">
    <div>
        <p>KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
        <p>COLLEGE OF ENGINEERING</p>
        <p>INVIGILATION HOURS</p>
        <p>${termDetails.Term}SEMESTER EXAMINATIONS ${termDetails.Year} ACADEMIC YEAR</p>
    </div>

    <div style="padding: 0.2rem;">
        <table style="padding: 0.2rem 0rem;">
            <tr style="">
                <th style="text-align: center; font-weight: bold;padding: 10px">SN</th>
                <th style="text-align: center; font-weight: bold;">Name</th>
                <th style="text-align: center; font-weight: bold;">Hours</th>
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
