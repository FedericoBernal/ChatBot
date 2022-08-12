import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { FaArrowRight } from "react-icons/fa";

function LanguageHistory({ history }) {
  return (
    <div>
      <ListGroup style={{ maxHeight: "200px", overflow: "auto" }}>
        {history.map((translate, index) => {
          return (
            <ListGroup.Item key={index}>
              <span style={{ color: "#c7c7c7", fontWeight: "600" }}>
                {translate.fromLanguage}
              </span>
              &nbsp;
              {translate.fromText}&nbsp;
              <FaArrowRight style={{ color: "#c7c7c7" }} />
              &nbsp;
              <span style={{ color: "#c7c7c7", fontWeight: "600" }}>
                {translate.toLanguage}
              </span>{" "}
              &nbsp;
              {translate.toText}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default LanguageHistory;
