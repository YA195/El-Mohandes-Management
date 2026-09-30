const measures = { 'كجم': ['جرام', 1000], 'جرام': ['جرام', 1], 'لتر': ['مل', 1000], 'مل': ['مل', 1], 'قطعة': ['قطعة', 1] };
export function migrateIngredient(item) {
  if (item.unit && item.pricePerUnit !== undefined) return item;
  const pack = item.packages?.[0];
  const measure = measures[pack?.measure];
  const count = Number(pack?.innerCount ?? 1);
  const quantity = count * Number(pack?.innerQty) * (measure?.[1] ?? 0);
  const valid = quantity > 0 && Number.isFinite(quantity) && pack?.price !== '' && pack?.price != null && Number.isFinite(Number(pack.price)) && Number(pack.price) >= 0;
  return { ...item, unit: measure?.[0] || measures[item.base]?.[0] || 'جرام', pricePerUnit: valid ? Number(pack.price) / quantity : '', migrationNeedsReview: !valid };
}
export function lineCost(line, items) {
  if (line.type !== 'ingredient') return Number(line.cost) || 0;
  const ingredient = items.find(item => item.id === line.ingredientId);
  return (Number(line.qty) || 0) * (Number(ingredient?.pricePerUnit) || 0);
}
export function recalculateRecipes(recipes, items) {
  return recipes.map(recipe => ({ ...recipe, lines: (recipe.lines || []).map(line => ({ ...line, cost: lineCost(line, items) })) }));
}
