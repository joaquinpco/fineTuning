import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  useIonLoading,
} from "@ionic/react";

import { useState, useEffect } from "react";

import { Menu } from "../components/Menu";

import { MODELS, TYPES_CONTENT } from "../constants/constants";

import { tModel } from "../constants/types";

import { getContent } from "../utils/get-content";

import "./Home.css";

const Home: React.FC = () => {
  const [results, setResults] = useState<any>(<></>);
  const [receiver, setReceiver] = useState<any>();
  const [present, dismiss] = useIonLoading();

  const useModel = async (model: tModel) => {
    const selectedModel: any = MODELS[model];
    try {
      present({
        message: "Fine tuning model, please wait...",
      });
      setResults(await selectedModel(receiver));
    } catch (error) {
      console.error(error);
    } finally {
      dismiss();
    }
  };

  const handler = (receiver: any) => {
    console.log(receiver);
    setReceiver(receiver);
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
          {getContent(typeContent, handler, useModel)}
          {results}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
