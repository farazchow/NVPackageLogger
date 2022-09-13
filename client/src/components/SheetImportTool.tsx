import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import { Row, Col } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { read, WorkBook, utils } from "xlsx";

export default function SheetImportTool(props: any) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [sheetNames, setSheetNames] = useState<String[]>();
  const [sheetData, setSheetData] = useState({});

  const acceptableFileName = ["xlsx", "xls"];

  const CheckFileName = (name: string) => {
    // name comes in form File.extension
    return acceptableFileName.includes(
      name.split(".").slice(-1)[0].toLowerCase()
    );
  };

  const handleFile = async (e: any) => {
    const myFile = e.target.files[0];
    if (!myFile) {
      console.log("No File");
      return;
    }

    if (!CheckFileName(myFile.name)) {
      alert("Invalid File Type");
      return;
    }

    //Read the XLSX Metadata and assign sheets
    const data = await myFile.arrayBuffer();
    const mySheetData = readDataFromExcel(data);

    setFile(myFile);
    setFileName(myFile.name);

    props.onFileUploaded(mySheetData);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    if (fileRef.current) {
      props.onFileUploaded(null);
      fileRef.current.value = "";
    }
    return;
  };

  const readDataFromExcel = (data: any) => {
    const wb = read(data);
    setSheetNames(wb.SheetNames);

    let mySheetData: { [key: string]: any } = {};

    for (var i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];
      const worksheet = wb.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet, {
        blankrows: true,
        header: 1,
      });

      mySheetData[sheetName] = jsonData;

      console.log(sheetName);
    }

    setSheetData(mySheetData);
    return mySheetData;
  };

  return (
    <>
      <Row>
        <Col>
          <div>
            <div className="mb-2">
              {fileName && <p>{fileName}</p>}
              {!fileName && <p>Please Upload a File</p>}
            </div>
            <input
              type="file"
              accept="xlsx, xls"
              multiple={false}
              onChange={(e: any) => handleFile(e)}
              ref={fileRef}
            />
            <div>{fileName && <button onClick={handleRemove} />}</div>
          </div>
        </Col>
      </Row>
    </>
  );
}
