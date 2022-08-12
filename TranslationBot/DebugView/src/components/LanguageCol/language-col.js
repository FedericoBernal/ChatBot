import Form from "react-bootstrap/Form";
import React from "react";
import LanguageDropdown from "../LanguageDropdown/language-dropdown";
import "./language-col.css";

function LanguageCol({
  dropdownText,
  language,
  onChangeLanguageDropdown,
  text,
  onChangeLanguageForm,
  backgroundColor,
  disabled,
}) {
  const getText = () => {
    if (text.includes("\n\n\n")) {
      return text;
    }
    return addNewLinesToText(text);
  };

  const addNewLinesToText = (text) => {
    var str = "\n\n\n";
    str = str + text;
    str.replace(/\r\n|\r|\n/g, "&#13;&#10;");
    return str;
  };

  return (
    <div className="language-col">
      <div className="language-dropdown">
        <LanguageDropdown
          text={dropdownText}
          value={language}
          onChange={(language) => onChangeLanguageDropdown(language)}
        />
      </div>
      <div className="language-textarea">
        <Form.Control
          as="textarea"
          placeholder="Type your messeage here..."
          value={getText()}
          style={{
            padding: 10,
            height: "300px",
            backgroundColor: backgroundColor,
          }}
          onChange={(event) =>
            onChangeLanguageForm(event.target.value?.toString())
          }
          disabled={disabled}
        />{" "}
      </div>
    </div>
  );
}

export default LanguageCol;
