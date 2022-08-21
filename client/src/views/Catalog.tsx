import { FunctionComponent } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";

export type catalog = {
  text: string;
  link: string;
};

const Catalog: FunctionComponent = () => {
  const currentCatalog: catalog[] = [
    { text: "Packages", link: "/catalog/pckges" },
    { text: "Desk Items", link: "/catalog/desk-items" },
    { text: "Residents", link: "/catalog/residents" },
    { text: "Notes", link: "/catalog/notes" },
  ];

  const archivedCatalog = [
    { text: "Archived Packages", link: "/catalog/arch-pckges" },
    { text: "Previous Residents", link: "/catalog/prev-residents" },
    { text: "Archived Notes", link: "/catalog/arch-notes" },
  ];

  return (
    <>
      <div style={{ margin: "12px" }}>
        <Card.Header style={{ background: "green" }}>Active</Card.Header>

        {currentCatalog.map((catalog: catalog) => (
          <Link to={catalog.link} style={{ textDecoration: "none" }}>
            <Card>
              <Card.Body>
                <Card.Text>{catalog.text}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
      <br />
      <div style={{ margin: "12px" }}>
        <Card.Header style={{ background: "grey" }}>Archived</Card.Header>
        {archivedCatalog.map((catalog: catalog) => (
          <Link to={catalog.link} style={{ textDecoration: "none" }}>
            <Card>
              <Card.Body>
                <Card.Text>{catalog.text}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}{" "}
      </div>
    </>
  );
};

export default Catalog;
