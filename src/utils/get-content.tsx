import {
  NAME_MODELS_AUDIO,
  NAME_MODELS_MULTIMODAL,
  TYPES_CONTENT,
} from "../constants/constants";
import { HOME_CONTENT } from "../constants/constants";
import {
  NAME_MODELS_NATURAL_LANGUAGE_PROCESING,
  NAME_MODELS_VISION,
} from "../constants/constants";

export const getContent = (
  typeContent: string,
  handler: Function,
  useModel: Function
) => {
  let content = <></>;
  switch (typeContent) {
    case TYPES_CONTENT.NATURAL_LANGUAGE_PROCESSING:
      {
        content = HOME_CONTENT.NATURAL_LANGUAGE_PROCESSING({
          handler: handler,
          useModel,
          NAME_MODELS: NAME_MODELS_NATURAL_LANGUAGE_PROCESING,
        });
      }
      break;
    case TYPES_CONTENT.VISION:
      {
        content = HOME_CONTENT.VISION({
          handler: handler,
          useModel,
          NAME_MODELS: NAME_MODELS_VISION,
        });
      }
      break;
    case TYPES_CONTENT.AUDIO:
      {
        content = HOME_CONTENT.AUDIO({
          handler: handler,
          useModel,
          NAME_MODELS: NAME_MODELS_AUDIO,
        });
      }
      break;
    case TYPES_CONTENT.MULTIMODAL:
      {
        content = HOME_CONTENT.MULTIMODAL({
          handler: handler,
          useModel,
          NAME_MODELS: NAME_MODELS_MULTIMODAL,
        });
      }
      break;
    default: {
      content = <></>;
    }
  }
  return content;
};
