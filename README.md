# Abdullahi Mohamed

# Platsloggan

## Beskrivning
Platsloggan är en mobilapplikation utvecklad med React Native och Expo, skapad för användare som vill kunna spara och dokumentera sina favoritplatser direkt i mobilen. Appen vänder sig till den som enkelt vill kunna kombinera ett platsnamn, exakta GPS-koordinater och en bild från fotoalbumet, samt smidigt kunna navigera vidare till en detaljsida för att se den sparade informationen.

## Så bygger och kör du projektet
1. Klona repot från Github
2. Gå in i projektmappen
3. Installera beroenden med npm install
4. Starta projektet med npx expo start

## Använda RN-komponenter
- View: Fungerar som en strukturell behållare för att organisera och lägga ut layouten på skärmen.
- Text: Används för att visa upp rubriker, informationstexter och knappetiketter i gränssnittet.
- TextInput: Ett inmatningsfält där användaren kan skriva in namnet på platsen.
- Pressable: En interaktiv knappkomponent som hanterar tryckhändelser för GPS-hämtning, bildval och navigering.
- Image: Används för att visa upp den valda bilden från enhetens fotoalbum.

## Använda Expo SDK-moduler
- expo-router: Hanterar filbaserad routing och navigering mellan appens skärmar (index och detaljsida) samt skickar med parametrar.
- expo-location: Begär behörighet och hämtar enhetens aktuella GPS-koordinater.
- expo-image-picker: Öppnar mobilens fotoalbum för att låta användaren välja en bild.
- expo-haptics: Ger haptisk feedback (vibration) i mobilen när användaren trycker på appens knappar.

## Uppfyllda krav
-  Minst 4 React Native-komponenter (View, Text, TextInput, Pressable, Image)
-  Minst 4 Expo SDK-moduler (expo-router, expo-location, expo-image-picker, expo-haptics)
- Routing & Navigering (Filbaserad navigering med expo-router, Stack-layout och parameternavigering)
-  Git & GitHub 
-  README.md 