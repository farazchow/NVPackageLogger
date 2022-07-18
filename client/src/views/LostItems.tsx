import { useEffect, useState } from "react";
import { LostItemInterface } from "../../../server/models/lostItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";

export function LostItems() {
    const [data, setData] = useState<LostItemInterface[]>([]);

    // data fetching
    useEffect(() => {
        async function getData() {
        console.log("starting to fetch data");
        const result = await (await fetch("/api/LostItemLoggingURL")).json(); // TODO: change fetch URL
        console.log("data retried", result);
        setData(result);
        }
        getData();
    }, []);

    return (
        <>
            <h2>Lost Items</h2>
            <Row>
                <Col>
                    <Card className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">MongoDB Data</h6>
                        </CardHeader>
                        <Card.Body className="p-0 pb-3">
                            <table data-size="small" className="table mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">
                                            Photo
                                        </th>
                                        <th scope="col" className="border-0">
                                            Description
                                        </th>
                                        <th scope="col" className="border-0">
                                            Date Created
                                        </th>
                                        {/*<th scope="col" className="border-0">
                                            Created By
                                        </th>
                                        */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data ? (
                                        data.map((item: LostItemInterface, key: number) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.photo}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.createdAt}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td align="center">No Lost Items!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default LostItems;
