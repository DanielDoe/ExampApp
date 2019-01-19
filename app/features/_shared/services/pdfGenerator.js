// import React from 'react';
// var fs = require('fs')
// const os = require('os');
// var conversion = require("phantom-html-to-pdf")();
// const pathName = require('path').join(require('os').homedir(), 'Desktop');
// // import ReactPDF from '@react-pdf/renderer';
// // import MyDocument from './pdfService';

// // export const generator = () => ReactPDF.render(MyDocument, `${__dirname}/ExamReport.pdf`);

// export const PDFgenerator = data => {
//      conversion({ html: "<h1>Hello World</h1>" }, function(err, pdf) {
//         var output = fs.createWriteStream('../services/');
//         console.log(pdf.logs);
//         console.log(pdf.numberOfPages);
//           // since pdf.stream is a node.js stream you can use it
//           // to save the pdf to a file (like in this example) or to
//           // respond an http request.
//         pdf.stream.pipe(output);
//       });;
//     // console.log('PDF generator');
// };


import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

// export class Generator extends React.Component{
//   render(){
//     return ReactPDF.render(<MyDocument />, 'Report.pdf');
//   }
// }

class ViewPDF extends React.Component{
  render(){
    return(
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    )
  }
}

