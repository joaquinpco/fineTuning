import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonMenuToggle,
} from "@ionic/react";

import { TYPES_CONTENT } from "../constants/constants";

import "./Menu.css";

interface ContainerProps {
  contentId: string;
  setTypeContent: Function;
}

export const Menu: React.FC<ContainerProps> = ({
  contentId,
  setTypeContent,
}) => {
  const clickHandler = (typeContent: string) => {
    setTypeContent(typeContent);
  };
  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem
              onClick={() =>
                clickHandler(TYPES_CONTENT.NATURAL_LANGUAGE_PROCESSING)
              }
            >
              Natural Language Processing
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem onClick={() => clickHandler(TYPES_CONTENT.VISION)}>
              Vision
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem onClick={() => clickHandler(TYPES_CONTENT.AUDIO)}>
              Audio
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem onClick={() => clickHandler(TYPES_CONTENT.MULTIMODAL)}>
              Multimodal
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
