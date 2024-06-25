"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import QRCode from "react-qr-code";
import Wifi from "./components/Wifi";

export default function Home() {
  const [qrText, setQrText] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="">
        <Container className="mx-auto">
          <h1 className="my-4">Qr Generator</h1>
          {qrText.length > 0 && (
            <div>
              <QRCode
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
