
import React from "react";
import PDFGenerator from "../../../../node_modules/react-pdf-generator/dist/PDFGenerator";

let dpi = 72;
let a4 = {
    width: 8.2677,
    height: 11.6929
}

export default class PDFservice extends React.Component{
    render(){
        return(
            <PDFGenerator dpi={dpi} pageSize={a4}>
                <div style={{ width: 'fit-content' }}>
                    <div style={{
                        backgroundColor: 'blue',
                        height: '842px',
                        width: (dpi * a4.width).toString() + 'px'
                    }}>
                        <h1>Monthly Report</h1>
                    </div>
                    <div style={{
                        backgroundColor: 'red',
                        height: '400px',
                        width: (dpi * a4.width).toString() + 'px'
                    }}>
                        <h1>Weekly Report</h1>
                    </div>
                </div>
            </PDFGenerator>
        );
    }
}

