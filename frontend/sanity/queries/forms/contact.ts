import { groq } from "next-sanity";
import { bodyQuery } from "../shared/body";

// @sanity-typegen-ignore
export const formContactQuery = groq`
  _type == "form-contact" => {
    _type,
    _key,
    padding,
    colorVariant,
    heading,
    description,
    firstNameLabel,
    lastNameLabel,
    workEmailLabel,
    companyLabel,
    messageLabel,
    consentText[]{
      ${bodyQuery}
    },
    buttonText,
    successMessage,
  }
`;
