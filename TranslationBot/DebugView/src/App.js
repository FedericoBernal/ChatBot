import "./App.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaExchangeAlt, FaHistory, FaTrashAlt } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import axios from "axios";
import LanguageCol from "./components/LanguageCol/language-col";
import Navbar from "react-bootstrap/Navbar";
import LanguageHistory from "./components/LanguageHistory/language-history";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import HandleError from "./components/HandleError/handle-error";
import config from "react-global-configuration";
import LoadingOverlay from "react-loading-overlay";
import Config from "./components/Config/config";

function App() {
  const [fromLanguage, setFromLanguage] = useState("");
  const [toLanguage, setToLanguage] = useState("");
  const [toText, setToText] = useState("");
  const [fromText, setFromText] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [isLoading, setLoading] = useState(false);

  config.set(Config, { freeze: false });

  const onClickInvertLanguage = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    const temporalToText = toText;
    setToText(fromText);
    setFromText(temporalToText);
  };

  const onClickTranslateText = () => {
    setLoading(true);
    const error = HandleError(
      fromText.replace(/\n/g, ""),
      fromLanguage,
      toLanguage
    );

    if (error.showToast) {
      setLoading(false);
      setShowToast(true);
      setMessageToast(error.message);
      return;
    }
    const axiosConfig = {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.REACT_APP_COGNITIVE_KEY,
        "Ocp-Apim-Subscription-Region": process.env.REACT_APP_COGNITIVE_REGION,
      },
    };

    const data = [
      {
        text: fromText.replace(/\n/g, ""),
      },
    ];

    let category = "";
    if (process.env.REACT_APP_CATEGORY_DICTONARY) {
      const categoryDictonaryJson = JSON.parse(
        process.env.REACT_APP_CATEGORY_DICTONARY
      );
      if (categoryDictonaryJson[`${fromLanguage}-${toLanguage}`])
        category = `&category=${
          categoryDictonaryJson[`${fromLanguage}-${toLanguage}`].categoryID
        }`;
    }

    axios
      .post(
        `${config.get(
          "BaseUrl"
        )}/translate?api-version=3.0&from=${fromLanguage}&to=${toLanguage}${category}`,
        data,
        axiosConfig
      )
      .then((response) => {
        if (response.data) {
          const responseText = response.data.pop().translations.pop().text;
          setToText(responseText);
          var recentTranslate = {
            fromLanguage: fromLanguage,
            fromText: fromText,
            toLanguage: toLanguage,
            toText: responseText,
          };
          const newHistory = [...history, recentTranslate];
          setHistory(newHistory);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      {" "}
      <div className="App">
        <Navbar bg="dark" variant="dark" style={{ marginBottom: "5%" }}>
          <Container>
            <Navbar.Brand href="#home">Translator | Debug View</Navbar.Brand>
          </Container>
        </Navbar>
        <LoadingOverlay
          active={isLoading}
          spinner
          text="Please wait..."
          styles={{
            wrapper: { backgroundColor: "gray", display: "contents" },
          }}
        ></LoadingOverlay>
        <Container>
          <Row>
            <Col>
              <LanguageCol
                dropdownText="from"
                language={fromLanguage}
                onChangeLanguageDropdown={(fromLanguage) =>
                  setFromLanguage(fromLanguage)
                }
                onChangeLanguageForm={(language) => setFromText(language)}
                text={fromText}
              />
            </Col>
            <Col xs={1}>
              <div style={{ marginTop: "20%" }}>
                <OverlayTrigger overlay={<Tooltip>Translate</Tooltip>}>
                  <Button
                    style={{ margin: "5%" }}
                    variant="outline-secondary"
                    onClick={() => onClickTranslateText()}
                  >
                    <BsTranslate />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger overlay={<Tooltip>Invert languages</Tooltip>}>
                  <Button
                    style={{ margin: "5%" }}
                    variant="outline-secondary"
                    onClick={() => onClickInvertLanguage()}
                  >
                    <FaExchangeAlt />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      {showHistory ? "Hide history" : "Show history"}
                    </Tooltip>
                  }
                >
                  <Button
                    style={{ margin: "5%" }}
                    variant="outline-secondary"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    <FaHistory />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Clean</Tooltip>}>
                  <Button
                    style={{ margin: "5%" }}
                    variant="outline-secondary"
                    onClick={() => {
                      setFromText("");
                      setToText("");
                      setHistory([]);
                    }}
                  >
                    <FaTrashAlt />
                  </Button>
                </OverlayTrigger>
              </div>
            </Col>
            <Col>
              <LanguageCol
                dropdownText="to"
                language={toLanguage}
                onChangeLanguageDropdown={(toLanguage) =>
                  setToLanguage(toLanguage)
                }
                backgroundColor="#f0f8ff"
                text={toText}
                disabled={true}
              />
            </Col>
          </Row>
          {showHistory && (
            <Row>
              <div style={{ marginTop: "10%" }}>
                <h5> History</h5>
                <LanguageHistory history={history} />
              </div>
            </Row>
          )}

          <ToastContainer position="bottom-end">
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={4000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>{messageToast}</Toast.Body>
            </Toast>
          </ToastContainer>
        </Container>
      </div>
    </>
  );
}

export default App;
