import React, { useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
// import Parser from 'csv-parse';

export default function CsvFileUploader() {
  const [file, setFile] = useState(null);
  const [PathwayFile, setPathwayFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const zip = new JSZip();


    const handleFileChange = async (event) => {
      const zipContent = event.target.files[0];
      const zip = new JSZip();
  
      try {

        const zipData = await zip.loadAsync(zipContent);
        const fileNames = Object.keys(zipData.files);
        console.log(fileNames)
        const csvFile = zipData.file('pathways.txt');
  
        if (csvFile) {
          const content = await csvFile.async('text');
          console.log(content)
          // parseCSVData(content);
        } else {
          console.log('CSV file not found in the zip.');
        }
      } catch (error) {
        console.error('Error reading the zip file:', error);
      }
    };
    // const parseCSVData = (csvData) => {
    //   Parser(csvData, { delimiter: ',' }, (err, output) => {
    //     if (err) {
    //       console.error('Error parsing CSV:', err);
    //     } else {
    //       console.log('CSV data as array:', output);
    //       // You can now use the 'output' variable containing the CSV data as an array.
    //     }
    //   });
    // };

  // const handleFileChange = (event) => {

  //   const file = event.target.files[0];

  //   zip.loadAsync(file).then(
  //       (zipContent) => {
  //       const fileNames = Object.keys(zipContent.files);
        
  //       if (csvFile) {
  //         const content = await csvFile.async('text');
  //         parseCSVData(content);
  //       }
  //       const csvFile = zipContent.file(/pathways\.txt$/i);
  //       const content = csvFile.async('text');

  //       console.log(content)
  //       // setZipFiles(fileNames);
  //   });
    // const csvFile = zip.file(/pathways\.txt$/i);


    // console.log(csvFile)

    // // console.log(event.target.files)
    // const selectedFile = event.target.files[0];
    // csvFile["stops.txt"].then(function (data) {
    //   console.log(data)
    //   // GetValueFile(data);                         
    // });      

    // console.log(selectedFile)
    // Object.keys(event.target.files).forEach((fileName) => {
    //     const filePromise = event.target.files.file(fileName).async('uint8array');
    //     console.log(filePromise)
    //     // filePromises.push(filePromise);
    //   });

    // setFile(selectedFile);
  //   setErrorMessage(null);
  // };

  const handleFileUpload = () => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = handleFileRead;
      fileReader.readAsArrayBuffer(file);
    }
  };

  const handleFileRead = (event) => {
    const zipFileData = event.target.result;
    // console.log(zipFileData)
    JSZip.loadAsync(zipFileData).then((zip) => {
      const csvFile = zip.file(/\.txt$/i)[0];

      if (csvFile) {
        csvFile.async('string').then((csvContent) => {
          Papa.parse(csvContent, {
            complete: handleCsvParse,
            error: handleCsvParseError,
            header: true, // Set this to true if your CSV has headers
          });
        });
      } else {
        setErrorMessage('No CSV file found in the zip file.');
      }
    }).catch((error) => {
      console.error(error);
      setErrorMessage('Error extracting CSV file from the zip.');
    });
  };

  const handleCsvParse = (result) => {
    // Handle the parsed CSV data here
    console.log(result.data);
  };

  const handleCsvParseError = (error) => {
    // Handle the parsing error here
    console.error(error);
    setErrorMessage('Error parsing CSV file. Please make sure it is valid.');
  };

  return (
    <div>
      <input type="file" accept=".zip" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
