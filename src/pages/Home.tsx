import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonInput,
  useIonLoading,
} from "@ionic/react";

import { useState, createElement } from "react";

import { MODELS, NAME_MODELS } from "../constants/constants";

import { tModel } from "../constants/types";

import "./Home.css";

const Home: React.FC = () => {
  const [results, setResults] = useState<any>(createElement("div"));

  const [present, dismiss] = useIonLoading();

  const useModel = async (model: tModel) => {
    const selectedModel: any = MODELS[model];
    try {
      present({
        message: "Fine tuning model, please wait...",
      });
      setResults(await selectedModel(sentence));
    } catch (error) {
    } finally {
      dismiss();
    }
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
      <IonContent fullscreen className="content">
        <IonInput
          onIonChange={(e) => handlerSentence(e.detail.value)}
        ></IonInput>
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
        {results}
      </IonContent>
    </IonPage>
  );
};

export default Home;
