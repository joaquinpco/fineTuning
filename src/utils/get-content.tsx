import { TYPES_CONTENT } from "../constants/constants";
import { HOME_CONTENT } from "../constants/constants";
import { NAME_MODELS } from "../constants/constants";

export const getContent = (
  typeContent: string,
  handlerSentence: Function,
  useModel: Function
) => {
  let content = <></>;
  switch (typeContent) {
    case TYPES_CONTENT.NATURAL_LANGUAGE_PROCESSING:
      {
        content = HOME_CONTENT.NATURAL_LANGUAGE_PROCESSING({
          handlerSentence,
          useModel,
          NAME_MODELS,
        });
      }
      break;
    default: {
      content = <></>;
    }
  }
  return content;
};
