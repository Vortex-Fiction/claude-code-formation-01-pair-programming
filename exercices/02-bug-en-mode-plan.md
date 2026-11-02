# Exercice 2 — Corriger un bug en mode plan

**Objectif :** faire la boucle complète lire → proposer → modifier → vérifier, avec un test écrit avant le correctif.

## Le bug

Un emprunt déjà rendu peut être rendu une seconde fois. La date de retour est écrasée.

**Attendu :** le second retour répond `409 Conflict` et la première date de retour est conservée.

Pour le reproduire :

```bash
curl -X POST http://localhost:3000/api/loans -H "Content-Type: application/json" -d '{"bookId":1,"borrower":"Ada"}'
curl -X POST http://localhost:3000/api/loans/1/return
curl -X POST http://localhost:3000/api/loans/1/return
```

Sur Windows (PowerShell) :

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/loans -ContentType 'application/json' -Body '{"bookId":1,"borrower":"Ada"}'
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/loans/1/return
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/loans/1/return
```

Le deuxième retour répond `201` et change `returnedAt` : c'est le bug.

## Consignes

1. Passez en mode plan (`Shift+Tab` jusqu'à « plan mode »).
2. Écrivez un prompt en trois parties. Demandez un plan, pas du code.
3. Relisez le plan. Corrigez-le s'il ne commence pas par un test.
4. Quittez le mode plan et laissez Claude :
   1. écrire le test qui reproduit le bug ;
   2. lancer `npm test` et montrer qu'il **échoue** ;
   3. corriger ;
   4. lancer `npm test` et montrer qu'il **passe** ;
   5. lancer `npm run lint`.
5. Faites un commit `fix(backend): …`.

## Réussi si

- Un test du second retour existe dans `backend/src/loans/loans.service.spec.ts`.
- `npm test` et `npm run lint` sont verts.
- Vous avez vu le test échouer avant le correctif.
- Le correctif ne touche que ce qui est nécessaire.
