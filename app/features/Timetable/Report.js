import React, {
    Component
} from 'react';



export default class Report extends Component {
    constructor(props) {
        super(props);
    };

    createPDF() {
        let tableData = '';
        let score = '';
        let table = '';
        let schoolName = 'KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY';
        let termDetails = {
            Year: '2017/2018 Academic Year',
            Term: 'Second'
        };


        reportGenerator = () => {
            let reportSheet = '<div>';
            for (let index = 0, length = DataObjects.length; index < length; index++) {
                let studentData = DataObjects[index];
                let table = '';
                for (j = 0, newlength = studentData.scores.length; j < newlength; j++) {
                    let score = studentData.scores[j];
                    let sn = j + 1;
                    table += `<tr>
                    <td style="">${sn}</td>
                    <td style="text-align: center;">${score.name}</td>
                    <td style="text-align: center;">${score.ES}</td>
                    <td style="text-align: center;">${score.Total}</td>
                    <td style="text-align: center;">${score.Grade}</td>
                    <td style="text-align: center;">${score.Remarks}</td>
                </tr>`;
                }
                reportSheet += `<style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-style: sans-serif
                }
                td{
                    padding: 20px 10px 20px 10px;
                }
                tr:nth-child(even){background: #ffffff} 
            </style> 
            <div style="width: 100%; height: 100%;">
            <div>
                <table>
                    <tr>
                    <td style="border-Top: 1px solid #F5DDB8 ; width: 80%; padding-top: 20px">
                        <p style="margin-top: 20px; 
                        padding-bottom: none; font-size: 14; line-height: 1">${termDetails.Year}</p>
                        <p style="padding-top: none;font-size: 14; line-height: 1 
                        padding-bottom: 10px;">${termDetails.Term}</p>
                    </td>     
                    </tr>
                </table>
            </div>
    
            <div style="border-Top: 1px solid #F5DDB8; padding-bottom: 3px; border-radius: 5px">
                <table style="border-bottom: 1px solid #F5DDB8; border-radius: 5px;">
                    <tr style="background-color: #F5DDB8;padding: 5px; border-radius: 5px">
                        <th style="text-align: left; font-weight: bold;padding: 10px">SN</th>
                        <th style="text-align: center; font-weight: bold; padding: 10px">Name</th>
                        <th style="text-align: center; font-weight: bold; padding: 10px">Hours</th>
                        <th style="text-align: center; font-weight: bold; padding: 10px">Status</th>
                        <th style="text-align: center; font-weight: bold; padding: 10px">Rate/Hr</th>
                        <th style="text-align: center; font-weight: bold; padding: 10px">Amt(GH₵)</th>
                        <th style="text-align: center; font-weight: bold; padding: 10px">Tax(GH₵)</th>
                        <th style="text-align: center; font-weight: bold; padding: 10px">Amt Due (GH₵)</th>
                    </tr>
                    ${table}
                </table>
            </div>
            </div>`;
            }
            return reportSheet += '</div>'
        }
    }
}