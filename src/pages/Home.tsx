import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  IonInput,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useState } from "react";

import "./Home.css";

import { pipeline } from "@xenova/transformers";

const Home: React.FC = () => {
  interface iModels {
    "fill-mask": Function;
    "question-answering": Function;
    summarization: Function;
  }

  type tModel = "fill-mask" | "question-answering" | "summarization";

  const MODELS: iModels = {
    "fill-mask": async (sentence: string) => {
      const pipe = await pipeline("fill-mask", "Xenova/bert-base-uncased");
      return await pipe(sentence);
    },
    "question-answering": async (sentence: string) => {
      console.log("question-answering");
      const pipe = await pipeline(
        "question-answering",
        "Xenova/distilbert-base-cased-distilled-squad"
      );

      let arraySentence = sentence.split("?");
      let question = arraySentence[0] + "?";
      let context = arraySentence[1];
      const result = await pipe(question, context);
      console.log(result);
      return [];
    },
    summarization: async (sentence: string) => {
      console.log("summarization");
      const pipe = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");

      const result = await pipe(sentence);

      console.log(result);
      return [];
    },
  };

  const [results, setResults] = useState<Array<any>>([]);

  const useModel = async (model: tModel) => {
    const selectedModel: any = MODELS[model];
    setResults(await selectedModel(sentence));
  };

  const [sentence, setSentence] = useState<string>("");
  const handlerSentence = (sentence: string | undefined | null) => {
    let formatSentence: string =
      sentence === null || sentence === undefined ? "" : sentence;
    setSentence(formatSentence);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fine Tuning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInput
          onIonChange={(e) => handlerSentence(e.detail.value)}
        ></IonInput>
        <IonSelect
          label="Default label"
          placeholder="Favorite Fruit"
          onIonChange={(e) => useModel(e.detail.value)}
        >
          <IonSelectOption value="fill-mask">fill-mask</IonSelectOption>
          <IonSelectOption value="question-answering">
            question-answering
          </IonSelectOption>
          <IonSelectOption value="summarization">summarization</IonSelectOption>
        </IonSelect>
        <IonList>
          {results.map((item, index) => {
            return <IonItem key={index}>{item.sequence}</IonItem>;
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
