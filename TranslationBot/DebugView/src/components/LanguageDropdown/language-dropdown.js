import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React from "react";
import axios from "axios";
import config from "react-global-configuration";
import Config from "../Config/config";

function LanguageDropdown({ text, value, onChange }) {
  const [languageList, setLanguageList] = React.useState(null);
  config.set(Config, { freeze: false });

  React.useEffect(() => {
    axios
      .get(
        `${config.get("BaseUrl")}/Languages?api-version=3.0&scope=translation`
      )
      .then((response) => {
        var items = convertObjectToArray(response.data.translation);
        orderListByLanguageName(items);
        setLanguageList(items);
      });
  }, []);

  const convertObjectToArray = (object) => {
    return Object.keys(object).map(function (key) {
      return { key: key, properties: object[key] };
    });
  };

  const orderListByLanguageName = (items) => {
    return items.sort((a, b) => {
      if (a.properties.name.toLowerCase() < b.properties.name.toLowerCase()) {
        return -1;
      }
      if (a.properties.name.toLowerCase() > b.properties.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };

  if (!languageList) return null;

  return (
    <>
      <FloatingLabel controlId="floatingSelect" label={text}>
        <Form.Select
          aria-label="Default select example"
          value={value || ""}
          onChange={(event) => onChange(event.target.value?.toString())}
        >
          <option value=""></option>
          {languageList.map((language) => {
            return (
              <option key={language.key} value={language.key}>
                {language.properties.name} ({language.key})
              </option>
            );
          })}
        </Form.Select>
      </FloatingLabel>
    </>
  );
}
export default LanguageDropdown;
