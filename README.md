# El Mohandes Management

Professional management platform for El Mohandes. The first module is Costing.

## Costing v1
- Ingredient master data
- Multiple purchase packages per ingredient
- Package normalization (kg/g/L/ml/piece)
- Product costing
- Direct/manual cost lines for seasoning, mixed vegetables, incidental inputs, etc.
- Selling price, total cost and Food Cost %
- RTL responsive administrative UI

## Development
```bash
npm install
npm run dev
```

## Important
The current first commit uses browser storage only to make the UI immediately testable. Before production data entry, connect the persistence layer to a hosted database (Supabase/Postgres) so data is shared and backed up.
