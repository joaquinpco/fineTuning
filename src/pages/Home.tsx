import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonButtons,
  IonMenuButton,
  IonSelectOption,
  IonInput,
  useIonLoading,
} from "@ionic/react";

import { createElement, useState, useEffect } from "react";

import { Menu } from "../components/Menu";

import {
  MODELS,
  NAME_MODELS,
  HOME_CONTENT,
  TYPES_CONTENT,
} from "../constants/constants";

import { tModel } from "../constants/types";

import { getContent } from "../utils/get-content";

import "./Home.css";

const Home: React.FC = () => {
  const [results, setResults] = useState<any>(<></>);

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

  const [typeContent, setTypeContent] = useState<string>(
    TYPES_CONTENT.NATURAL_LANGUAGE_PROCESSING
  );

  useEffect(() => {
    setResults(<></>);
  }, [typeContent]);

  return (
    <>
      <Menu contentId="home_content" setTypeContent={setTypeContent}></Menu>
      <IonPage id="home_content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Fine Tuning</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="content">
          {getContent(typeContent, handlerSentence, useModel)}
          {results}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
