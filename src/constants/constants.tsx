import {
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { pipeline } from "@xenova/transformers";

import { iModels, iHomeContent } from "./interfaces";

export const MODELS: iModels = {
  "fill-mask": async (sentence: string) => {
    const pipe = await pipeline("fill-mask", "Xenova/bert-base-uncased");
    const response = await pipe(sentence);

    return (
      <IonList>
        {response.map((item: any, index: number) => {
          return <IonItem key={index}>{item.sequence}</IonItem>;
        })}
      </IonList>
    );
  },
  "question-answering": async (sentence: string) => {
    const pipe = await pipeline(
      "question-answering",
      "Xenova/distilbert-base-cased-distilled-squad"
    );

    let arraySentence = sentence.split("?");
    let question = arraySentence[0] + "?";
    let context = arraySentence[1];
    const response = await pipe(question, context);

    const { answer, score } = response;
    return (
      <IonList>
        <IonItem>Answer: {answer}</IonItem>
        <IonItem>Score: {score}</IonItem>
      </IonList>
    );
  },
  translation: async (sentence: string) => {
    const pipe = await pipeline("translation_en_to_fr", "Xenova/t5-small");

    const response = await pipe(sentence);

    const { translation_text } = response[0];
    return (
      <IonList>
        <IonItem>{translation_text}</IonItem>
      </IonList>
    );
  },
  summarization: async (sentence: string) => {
    const pipe = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");

    const response = await pipe(sentence);

    const { summary_text } = response[0];
    return (
      <IonList>
        <IonItem>Summary text: {summary_text}</IonItem>
      </IonList>
    );
  },
};

export const NAME_MODELS = [
  {
    name: "Fill-Mask",
    value: "fill-mask",
  },
  { name: "Question-Answering", value: "question-answering" },
  { name: "Summarization", value: "summarization" },
  { name: "Translation", value: "translation" },
];

export const TYPES_CONTENT = {
  NATURAL_LANGUAGE_PROCESSING: "NATURAL_LANGUAGE_PROCESSING",
  VISION: "VISION",
  AUDIO: "AUDIO",
  MULTIMODAL: "MULTIMODAL",
};

export const HOME_CONTENT: iHomeContent = {
  NATURAL_LANGUAGE_PROCESSING: ({
    handlerSentence = (param: any) => {},
    useModel = (param: any) => {},
    NAME_MODELS = new Array<{ value: string; name: string }>(),
  } = {}) => {
    return (
      <>
        <IonInput onIonChange={(e) => handlerSentence(e.detail.value)} />
        <IonSelect
          label="Models to choose"
          placeholder="..."
          onIonChange={(e) => useModel(e.detail.value)}
        >
          {NAME_MODELS.map((item, index) => {
            return (
              <IonSelectOption key={index} value={item.value}>
                {item.name}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </>
    );
  },
  VISION: () => {
    return <></>;
  },
  AUDIO: () => {
    return <></>;
  },
  MULTIMODAL: () => {
    return <></>;
  },
};
