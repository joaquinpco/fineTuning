import { IonList, IonItem } from "@ionic/react";

import { pipeline } from "@xenova/transformers";

import { iModels } from "./interfaces";

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
];
