# Exercice 3 — Une petite amélioration de bout en bout

**Objectif :** livrer une amélioration backend + frontend dans une seule session courte, sans perdre le fil.

## La demande

`GET /api/books?available=true` ne renvoie que les livres disponibles. Une case à cocher « Disponibles seulement » dans la page Books applique ce filtre.

## Consignes

1. Nouvelle session (`/clear`).
2. Prompt en trois parties, en mode plan.
3. Test backend du filtre d'abord, vu en échec, puis le code.
4. La case à cocher ensuite.
5. Vérifiez dans le navigateur.
6. Surveillez `/context` à la fin : combien de contexte avez-vous consommé ?
7. Un commit `feat(…): …`.

## Réussi si

- Un test backend couvre `available=true` et l'absence du paramètre.
- La case fonctionne dans l'UI.
- `npm test` et `npm run lint` sont verts.
- Claude n'a rien modifié d'autre que ce qui était demandé.
