# El Mohandes Management

## Costing
- Inline ingredient grid: product name, unit (gram/ml/piece), price per unit.
- Automatic blank row, Enter navigation, filtering that preserves all draft rows.
- Recipe cost uses quantity × current ingredient price, plus direct cost lines.
- Ingredients and recipes persist through the existing Cloudflare Worker/D1 endpoint `/api/management/state`.

## Migration
Legacy first-package prices are divided by innerCount × innerQty × measurement factor (kg/L = 1000). Ingredient IDs and legacy package metadata are retained. Existing recipe quantities already used these base units and remain unchanged. Missing or invalid package amounts leave a blank price requiring review. Migration loads in memory and is persisted on save; repeat loads do not convert migrated records again. Browser data is imported only when the API reports uninitialized state. Failed API loads do not allow overwriting remote data with fallback data.

## Development
Run `npm ci`, then `npm run dev`. Verify with `node --test lib/costing.test.mjs` and `npm run build`.
