import React, { useState } from "react";
import SheetImportTool from "../components/SheetImportTool";
import { Table, Row, Col } from "react-bootstrap";
import { resident, shadowResident } from "../../../server/models/resident";
import { post } from "../../utilities";

export const ResidentSpreadSheet: React.FunctionComponent = () => {
  const [sheetData, setSheetData] = useState<any>(null);
  const [sheetName, setSheetName] = useState("");

  const handleFileUploaded = (e: any) => {
    console.log("File Uploaded", e);

    if (e) {
      setSheetName(Object.keys(e)[0]);
    }
    setSheetData(e);
  };

  const handleSubmit = () => {
    const objs: any[] = [];

    if (sheetData && sheetName) {
      sheetData[sheetName].slice(1).map((row: any) =>
        objs.push({
          firstName: row[0],
          middleName: row[1],
          lastName: row[2],
          kerb: row[3],
          residentID: row[4],
          year: row[5],
          homeAddress: row[6],
          phoneNumber: row[7],
          forwardingAddress: row[8],
          checkedIn: true,
        })
      );

      for (let i = 0; i < objs.length; i++) {
        post("/api/resident/postResident", objs[i])
          .then(() => console.log("succesful post", objs[i]))
          .catch((err: Error) => console.log("Error posting"));
      }
    }

    return;
  };

  return (
    <>
      <SheetImportTool onFileUploaded={(e: any) => handleFileUploaded(e)} />
      <input type="submit" onClick={handleSubmit}></input>
      {sheetData && (
        <Row>
          <div>{sheetName}</div>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  {sheetData[sheetName][0].map((h: string) => (
                    <td key={h}>{h}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetData[sheetName].slice(1).map((row: any) => (
                  <tr key={row}>
                    {row.map((b: string) => (
                      <td>{b}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};
