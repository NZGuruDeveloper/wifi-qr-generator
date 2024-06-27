"use client";

import { useState, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import QRCode from "react-qr-code";
import Wifi from "./components/Wifi";

import { Button, Form } from "react-bootstrap";

import { useReactToPrint } from "react-to-print";

export default function Home() {
  const [qrText, setQrText] = useState("");

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",

    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <button>Print using a Functional Component</button>;
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="dark:font-white">
        <Container className="mx-auto">
          <h1 className="my-4">Qr Generator</h1>
          {qrText.length > 0 && (
            <div >
              <QRCode
                ref={contentToPrint}
                value={qrText}
                size={256}
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                  marginBottom: "30px",
                }}
                viewBox={`0 0 256 256`}
              />
              <div>
                <Button variant="primary" type="submit" style={{ marginBottom: "30px" }} onClick={reactToPrintTrigger}>Print this out!</Button>
              </div>
              <div>{/*qrText*/}</div>
            </div>
          )}
          <Tab.Container defaultActiveKey="text">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="wifi">Wifi</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="wifi">
                    <Wifi setQrText={setQrText} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </main>
  );
}
