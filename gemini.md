## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: none

---

# gemini.md : Guide de Projet - Covoiturage Automatisé

## 1. Objectifs du Projet
* Développer une maquette interactive (POC) simulant la mise en relation de covoiturage basée sur la géolocalisation passive.
* Démontrer le respect de la vie privée via un parcours utilisateur à double consentement (Opt-in) et des profils anonymes.
* Utiliser SvelteKit et Tailwind CSS pour un prototypage rapide et un rendu "Mobile-First".

## 2. Prérequis Techniques
* Node.js installé.
* Éditeur de code (idéalement avec assistance IA type Cursor ou Windsurf pour exécuter le prompt).
* Framework : SvelteKit (`npm create svelte@latest`).
* Styling : Tailwind CSS.

## 3. Étapes de Développement

### Étape 1 : Setup du Projet
* [ ] Initialiser le projet SvelteKit.
* [ ] Installer et configurer Tailwind CSS.
* [ ] Définir les variables de couleurs (Orange: `#FF7900`, fond blanc, texte gris/noir).

### Étape 2 : Modélisation des Données (Mock Data)
* [ ] Fichier `src/lib/data.js` :
    * `currentUser` : { pseudo, avatar, visible: boolean, criteria: {} }
    * `anonymousProfiles` : Tableau d'objets contenant { id, pseudo_anonyme, match_percentage, criteria: { music, chat, punctuality } }
    * `messages` : Tableau simulant un historique de chat.

### Étape 3 : Développement des Composants UI
* [ ] `Header.svelte` : Barre de navigation simple avec le logo et l'accès au profil.
* [ ] `CriteriaBadge.svelte` : Petits badges visuels pour afficher les préférences (ex: icône note de musique pour "Aime la musique").
* [ ] `ProfileCard.svelte` : La carte affichant un utilisateur anonyme dans la liste de découverte.

### Étape 4 : Intégration des Vues (Pages)