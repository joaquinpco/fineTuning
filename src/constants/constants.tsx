import {
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { pipeline, RawImage } from "@xenova/transformers";

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
  "object-detection": (files: FileList) => {
    const file = files[0];
    console.log(file);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const blob = new Blob([new Uint8Array(e.target.result)], {
            type: file.type,
          });
          console.log(blob);
          const pipe = await pipeline(
            "object-detection",
            "Xenova/detr-resnet-50"
          );
          const response = await pipe(await RawImage.fromBlob(blob));
          console.log(response);

          resolve(
            <IonList>
              {response.map((item: any, index: number) => {
                return (
                  <IonItem key={index}>
                    Label: {item.label}, Score: {item.score}
                  </IonItem>
                );
              })}
            </IonList>
          );
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  },
  "image-classification": (files: FileList) => {
    const file = files[0];
    console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const blob = new Blob([new Uint8Array(e.target.result)], {
            type: file.type,
          });
          console.log(blob);
          const pipe = await pipeline(
            "image-classification",
            "Xenova/vit-base-patch16-224"
          );
          const response = await pipe(await RawImage.fromBlob(blob));
          console.log(response);

          resolve(
            <IonList>
              {response.map((item: any, index: number) => {
                return (
                  <IonItem key={index}>
                    Label: {item.label}, Score: {item.score}
                  </IonItem>
                );
              })}
            </IonList>
          );
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  },
  "automatic-speech-recognition": (files: FileList) => {
    const file = files[0];
    console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const pipe = await pipeline(
            "automatic-speech-recognition",
            "Xenova/whisper-tiny.en"
          );

          const blob = new Blob([new Uint8Array(e.target.result)], {
            type: file.type,
          });
          console.log(blob);
          var blobUrl = URL.createObjectURL(blob);
          const response = await pipe(blobUrl);
          console.log(response);

          resolve(
            <IonList>
              <IonItem key="0">Label: {response.text}</IonItem>;
            </IonList>
          );
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  },
  "image-to-text": (files: FileList) => {
    const file = files[0];
    console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const blob = new Blob([new Uint8Array(e.target.result)], {
            type: file.type,
          });
          console.log(blob);
          const pipe = await pipeline(
            "image-to-text",
            "Xenova/vit-gpt2-image-captioning"
          );
          const response = await pipe(await RawImage.fromBlob(blob));
          console.log(response);

          resolve(
            <IonList>
              {response.map((item: any, index: number) => {
                return (
                  <IonItem key={index}>
                    Image description: {item.generated_text}
                  </IonItem>
                );
              })}
            </IonList>
          );
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  },
  "zero-shot-image-classification": (files: FileList) => {
    const file = files[0];
    console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const blob = new Blob([new Uint8Array(e.target.result)], {
            type: file.type,
          });
          console.log(blob);
          const pipe = await pipeline("zero-shot-image-classification");
          const labels_for_classification = [
            "cat and dog",
            "lion and cheetah",
            "rabbit and lion",
          ];
          const response = await pipe(
            await RawImage.fromBlob(blob),
            labels_for_classification
          );
          console.log(response);

          resolve(
            <IonList>
              {response.map((item: any, index: number) => {
                return (
                  <IonItem key={index}>
                    Score: {item.score} Label: {item.label}
                  </IonItem>
                );
              })}
            </IonList>
          );
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  },
};

export const NAME_MODELS_NATURAL_LANGUAGE_PROCESING = [
  {
    name: "Fill-Mask",
    value: "fill-mask",
  },
  { name: "Question-Answering", value: "question-answering" },
  { name: "Summarization", value: "summarization" },
  { name: "Translation", value: "translation" },
];

export const NAME_MODELS_VISION = [
  {
    name: "Object detection",
    value: "object-detection",
  },
  {
    name: "Image classification",
    value: "image-classification",
  },
];

export const NAME_MODELS_AUDIO = [
  {
    name: "Automatic speech recognition",
    value: "automatic-speech-recognition",
  },
];

export const NAME_MODELS_MULTIMODAL = [
  {
    name: "Image to Text",
    value: "image-to-text",
  },
  {
    name: "Zero-Shot Image Classification",
    value: "zero-shot-image-classification",
  },
];

export const TYPES_CONTENT = {
  NATURAL_LANGUAGE_PROCESSING: "NATURAL_LANGUAGE_PROCESSING",
  VISION: "VISION",
  AUDIO: "AUDIO",
  MULTIMODAL: "MULTIMODAL",
};

export const HOME_CONTENT: iHomeContent = {
  NATURAL_LANGUAGE_PROCESSING: ({
    handler = (param: any) => {},
    useModel = (param: any) => {},
    NAME_MODELS = new Array<{ value: string; name: string }>(),
  } = {}) => {
    return (
      <>
        <IonInput onIonChange={(e) => handler(e.detail.value)} />
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
  VISION: ({
    handler = (param: any) => {},
    useModel = (param: any) => {},
    NAME_MODELS = new Array<{ value: string; name: string }>(),
  } = {}) => {
    return (
      <>
        <input type="file" onChange={(e) => handler(e.target.files)} />
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
  AUDIO: ({
    handler = (param: any) => {},
    useModel = (param: any) => {},
    NAME_MODELS = new Array<{ value: string; name: string }>(),
  } = {}) => {
    return (
      <>
        <input type="file" onChange={(e) => handler(e.target.files)} />
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
  MULTIMODAL: ({
    handler = (param: any) => {},
    useModel = (param: any) => {},
    NAME_MODELS = new Array<{ value: string; name: string }>(),
  } = {}) => {
    return (
      <>
        <input type="file" onChange={(e) => handler(e.target.files)} />
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
};
