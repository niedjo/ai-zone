
# AI Zone

Le réseau social ultime pour partager et découvrir des œuvres générées par des intelligences artificielles.

##lien vers le site : 

http://ai-zone.free.nf/?i=2
## 🖼️ Description

**AI Zone** est une application mobile conçue pour permettre aux utilisateurs de partager leurs créations générées par des intelligences artificielles avec une communauté passionnée. Les utilisateurs peuvent découvrir, publier et interagir avec des œuvres d'art, des images, et des vidéos générées par IA, créant ainsi un écosystème unique où l'innovation et la créativité sont au centre.

## 🚀 Fonctionnalités

- **Partage d'œuvres IA** : Publiez et partagez vos créations générées par des IA avec la communauté.
- **Découverte de contenus** : Explorez des images, vidéos, et œuvres artistiques générées par IA, créées par d'autres utilisateurs.
- **Communauté engagée** : Rejoignez une communauté d'amateurs, de professionnels et d'entrepreneurs partageant la même passion pour l'IA.
- **Filtrage et recherche** : Recherchez des œuvres spécifiques grâce à une fonction de recherche puissante.
- **Support multilingue** : L'application prend en charge plusieurs langues, y compris l'anglais et le français.

## 🛠️ Technologies Utilisées

- **React Native** : Framework pour la construction de l'interface utilisateur.
- **Expo** : Plateforme pour développer des applications React Native.
- **NativeWind** : Bibliothèque de style pour React Native.
- **Appwrite** : Backend open-source pour gérer l'authentification et les données des utilisateurs.
- **Expo Image Picker** : Module pour sélectionner et télécharger des images.
- **Expo AV** : Module pour lire des vidéos et des audios.
- **Tailwind CSS** : Framework de style utilitaire pour une conception réactive et moderne.

## 📦 Dépendances

Voici un extrait des dépendances majeures utilisées dans le projet :

```json
{
  "dependencies": {
    "@expo/vector-icons": "^14.0.2",
    "@react-native-picker/picker": "^2.7.7",
    "@react-navigation/native": "^6.0.2",
    "expo": "~51.0.22",
    "expo-av": "~14.0.6",
    "expo-document-picker": "^12.0.2",
    "expo-font": "~12.0.9",
    "expo-image-picker": "~15.0.7",
    "expo-router": "~3.5.18",
    "nativewind": "^2.0.11",
    "react": "18.2.0",
    "react-native": "0.74.3",
    "react-native-appwrite": "^0.4.0",
    "react-native-reanimated": "~3.10.1",
    "react-native-safe-area-context": "4.10.5"
  }
}
```

## 📝 Modèles de Données

### **fieldType**
```typescript
export type fieldType = {
    username?: string;
    email : string;
    password : string;
}
```

### **VideoFormType**
```typescript
export type VideoFormType = {
  title : string,
  video : ImagePicker.ImagePickerAsset | null;
  thumbnail : ImagePicker.ImagePickerAsset | null;
  prompt : string,
  userID : string
}
```

### **Translations**
```typescript
export type Translations = {
    presentation: string;
    fullPresentation: string;
    Continue_with_Email: string;
    ...
};
```

## 🚀 Démarrage Rapide

### Prérequis

Assurez-vous d'avoir installé les outils suivants sur votre machine :

- **Git**
- **Node.js**
- **npm** (ou **yarn**)
- **Expo CLI**

### Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/niedjo/ai-zone.git
   cd ai-zone
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Lancez l'application :

   ```bash
   npm start
   ```

   Scannez le code QR avec votre application **Expo Go** sur votre appareil mobile.

## 🌍 Multilingue

L'application prend en charge plusieurs langues. Vous pouvez configurer la langue en utilisant les types `Translations` et les fichiers de traduction associés.

## 📜 License

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.

## 📧 Contact

Pour toute question, suggestion ou retour, veuillez contacter [niedjokuitche@gmail.com](mailto:niedjokuitche@gmail.com).
```
