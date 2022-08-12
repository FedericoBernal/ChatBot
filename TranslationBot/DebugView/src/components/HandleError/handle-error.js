const HandleError = (textFrom, languageFrom, languageTo) => {
  const object = {
    showToast: false,
    message: "",
  };

  if (languageFrom == "") {
    object.showToast = true;
    object.message = "The source language is empty. Please, select a valid language.";
  } else if (languageTo == "") {
    object.showToast = true;
    object.message = "The target language is empty. Please, select a valid language.";
  } else if (languageTo == languageFrom) {
    object.showToast = true;
    object.message =
      "Both languages are the same. Please, change one of then and try again.";
  } else if (textFrom == "") {
    object.showToast = true;
    object.message = "The text to be translated is empty. Please, enter some text to translate.";
  }

  return object;
};

export default HandleError;
