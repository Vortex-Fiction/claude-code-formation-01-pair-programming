---
marp: true
theme: default
paginate: true
title: Phase 1 — Pair programming efficace
---

# Phase 1 — Pair programming efficace

Bien utiliser Claude Code en développement

Repo : `claude-code-formation-01-pair-programming`

---

# Partage de réussite

- Une chose que Claude Code a bien faite pour vous cette semaine
- Une chose qui a raté
- 10 minutes, deux ou trois personnes

---

# Le lendemain, vous saurez…

- obtenir un bon résultat **du premier coup** sur une tâche simple
- écrire un prompt en trois parties
- choisir entre mode plan et action directe
- garder une session propre : une tâche, un contexte
- reconnaître une session qui dérape

---

# Démarrage

- Installer : voir le `README.md` du repo (macOS et Windows)
- Se connecter : `claude` puis suivre les instructions
- Ouvrir `claude` **à la racine du repo** : c'est son espace de travail
- Extension VS Code / JetBrains : même agent, dans l'IDE

<!-- Faire la démo d'installation sur un poste vierge si possible. Montrer que Claude lit le CLAUDE.md du repo au démarrage. -->

---

# Ce qu'on ne colle jamais

> « Si tu ne l'enverrais pas par courriel à un inconnu, ne le colle pas. »

- Secrets, clés d'API, mots de passe
- Fichiers `.env`
- Données clients, données personnelles
- Le contenu d'une base de production

<!-- C'est la première règle, avant même la configuration des permissions qu'on verra en phase 2. -->

---

# Comment Claude fonctionne : la fenêtre de contexte

- Claude ne voit que ce qui est **dans la session** : vos messages, les fichiers lus, les sorties de commandes
- Sa mémoire de travail est grande mais **finie**
- Il ne sait rien de votre projet tant qu'il ne l'a pas lu
- Le `CLAUDE.md` est chargé à chaque session

<!-- Image : un collègue très rapide et très patient, enfermé dans une pièce avec seulement ce que vous lui donnez. Montrer /context en direct. -->

---

# Garbage in → garbage out

- Un prompt vague = Claude devine
- Il devine **avec assurance** : la réponse a l'air bonne
- Chaque information utile réduit l'écart entre ce que vous vouliez et ce que vous obtenez

<!-- La qualité de la sortie suit la qualité de l'entrée. Ce n'est pas un défaut de Claude, c'est un défaut de briefing. -->

---

# Le prompt en 3 parties

1. **Contexte** — où on est, ce qui existe, ce qui compte
2. **Tâche** — ce qu'il faut faire, précisément
3. **Format et contraintes** — ce qu'on attend, ce qu'il ne faut pas faire, comment vérifier

<!-- Donnez à Claude le même briefing qu'à un nouveau collègue. Un nouveau collègue brillant, mais qui arrive ce matin. -->

---

# Bad → OK → Great

**Bad :** « Corrige la création d'auteur. »
→ Quel problème ? Où ? Comment savoir que c'est corrigé ?

**OK :** « On peut créer deux auteurs avec le même nom. Empêche-le. »
→ La tâche est claire, mais pas la vérification.

**Great :** « `POST /api/authors` avec `{ "name": "Jane Austen" }` crée un second auteur de ce nom (`backend/src/authors/authors.service.ts`). Attendu : 409, comme pour un ISBN en double dans `BooksService.create`. Écris d'abord le test qui échoue, puis corrige. Ne touche à rien d'autre. »

<!-- Rôle, tâche, format, contraintes. Le Great dit où, quoi, comment vérifier et ce qu'il ne faut pas faire. -->

---

# Few-shot : montrer un exemple

- Plutôt que décrire le style voulu, **montrez-le**
- « Écris le test comme `books.service.spec.ts` »
- « Même structure que `AuthorsController` »
- Un exemple du repo vaut un paragraphe d'explication

<!-- Zero-shot = demander directement. Few-shot = montrer un ou deux exemples. Dans un repo, les exemples sont déjà là : il suffit de les nommer. -->

---

# Penser en étapes, pas en une seule demande

| Demande unique          | Approche en étapes                                                |
| ----------------------- | ----------------------------------------------------------------- |
| « Ajoute la recherche » | 1. propose l'API 2. écris les tests 3. implémente 4. branche l'UI |
| « Refactor ce module »  | 1. liste les problèmes 2. propose un ordre 3. une étape à la fois |

<!-- Un bon manager ne donne pas un classeur de 200 pages en disant « trouve la réponse ». Il donne les trois bonnes pages, un brief clair, et vérifie à chaque étape. -->

---

# La boucle de base

**lire → proposer → modifier → vérifier**

- Lire : Claude explore le code concerné
- Proposer : il dit ce qu'il va faire
- Modifier : il édite
- Vérifier : il lance les tests **et vous montre la sortie**

<!-- Si l'étape « vérifier » manque, la tâche n'est pas finie. C'est pour ça que le CLAUDE.md du repo dit : lancer npm test et npm run lint avant de dire que c'est fini. -->

---

# Le mode plan

- `Shift+Tab` jusqu'à « plan mode » : Claude lit et propose, **sans rien modifier**
- **Quand :** plusieurs fichiers, un choix de conception, un code que vous ne connaissez pas
- **Quand pas :** une ligne à changer, une faute de frappe
- Relisez le plan : c'est le moment le moins cher pour corriger

<!-- Corriger un plan coûte une phrase. Corriger du code déjà écrit coûte une session. -->

---

# `/clear`, `/compact`, `/context`

- `/context` — combien de contexte est utilisé, et par quoi
- `/clear` — repartir de zéro (le `CLAUDE.md` est rechargé)
- `/compact` — résumer la session pour libérer de la place

<!-- Démo : /context au début d'une session, puis après avoir lu 10 fichiers. -->

---

# Une tâche par session

- Nouvelle tâche → `/clear`
- On ne mélange pas un bug et une feature
- On ne garde pas une session « au cas où »
- Une session courte et ciblée bat une longue session « qui connaît tout »

---

# Le momentum d'une session : la confiance qui monte

- Au début : Claude lit, vérifie, demande
- Chaque succès le rend plus sûr de lui
- Il vérifie moins, suppose plus, enchaîne
- Ça ressemble à de l'efficacité

<!-- C'est le piège : la session qui va le plus vite est souvent celle qui commence à dériver. -->

---

# … et les repères qui s'effacent

- Les contraintes du début
- La correction que vous lui avez faite il y a 20 messages
- Le périmètre de la tâche
- Le plan

**Aucune alerte :** la qualité baisse en silence.

<!-- Plus le contexte grandit, moins les premiers messages pèsent. Et à un certain seuil, Claude compacte automatiquement : le résumé perd des détails. -->

---

# Les signes qu'une session dérape

- Il redemande ce que vous avez déjà dit
- Il ignore une contrainte posée au début
- Ses réponses deviennent plus génériques
- Il dit « ça passe » sans montrer la sortie des tests
- Il modifie des fichiers hors du périmètre

---

# Les parades

- Une tâche par session
- Le plan (ou la spec) comme **ancre** qu'on fait relire
- La contrainte la plus importante **à la fin** du message
- `/compact` avec un résumé explicite, ou repartir propre avec ce résumé
- Exiger les preuves : la sortie des tests, pas « c'est bon »
- Relire à chaque étape, pas à la fin

<!-- Demander : « Résume ce qu'on a décidé jusqu'ici », coller ce résumé dans une nouvelle session. -->

---

# Quand ne pas utiliser Claude Code

- Vous ne savez pas ce que vous voulez : réfléchissez d'abord (ou brainstormez avec lui, sans coder)
- Le changement est plus court que le prompt
- Vous ne pouvez pas vérifier le résultat
- Données sensibles en jeu

---

# Démo : un fix dans Vortex

1. Mauvais prompt : on regarde ce qu'il fait
2. `/clear`
3. Bon prompt en trois parties, en mode plan
4. Test qui échoue → correctif → test qui passe
5. `/context` à la fin

---

# Pratique guidée

```bash
git clone https://github.com/Vortex-Fiction/claude-code-formation-01-pair-programming.git
cd claude-code-formation-01-pair-programming
npm install
npm run back      # terminal 1
npm run front     # terminal 2
claude            # terminal 3
```

On fait ensemble l'exercice 1 : `exercices/01-prompts.md`

---

# Exercices à faire chez soi

- `exercices/02-bug-en-mode-plan.md` — un bug, test d'abord, en mode plan
- `exercices/03-amelioration.md` — backend + frontend en une session courte

Gardez une réussite à partager en ouverture de la phase 2.

---

# La suite : Phase 2 — Le projet qui pilote Claude

- `CLAUDE.md` : hiérarchie, une règle par ligne
- `README.md` vs `CLAUDE.md`
- Documentation en anglais simplifié (STE), lint de la doc
- `settings.json` : permissions, hooks
- MCP : ce que ça coûte en contexte
