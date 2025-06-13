import { sortHierarchicalMenu } from '../../src/lib/helpers';

describe('sortHierarchicalMenu', () => {
  const tora = { name: 'Tora' };
  const ketubim = { name: 'Ketubim' };
  const nebiim = { name: "Nebi'im" };
  const talmud = { name: 'Talmud' };
  const harambam = { name: 'Harambam' };
  const misc = { name: 'Misc' };
  const other = { name: 'Other' };

  // Items not in the predefined list
  const apple = { name: 'Apple' };
  const zebra = { name: 'Zebra' };
  const banana = { name: 'Banana' };
  const unknown = { name: 'Unknown Category' };

  // Predefined order for reference (lowercase):
  // "tora", "ketubim", "nebi'im", "talmud", "harambam", ..., "misc", "other"

  it('should sort items all present in the predefined menu correctly', () => {
    const items = [talmud, tora, harambam, nebiim, ketubim];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([tora, ketubim, nebiim, talmud, harambam]);
  });

  it('should handle items with different casing correctly (case-insensitive)', () => {
    const items = [{ name: 'TALMUD' }, { name: 'tora' }, { name: 'harambam' }];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([{ name: 'tora' }, { name: 'TALMUD' }, { name: 'harambam' }]);
  });

  it('should sort items not in the predefined menu alphabetically', () => {
    const items = [zebra, apple, unknown, banana];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([apple, banana, unknown, zebra]);
  });

  it('should sort mixed items: predefined first, then alphabetical for others', () => {
    const items = [banana, talmud, apple, tora, zebra, harambam, unknown];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([
      tora,       // Predefined
      talmud,     // Predefined
      harambam,   // Predefined
      apple,      // Alphabetical
      banana,     // Alphabetical
      unknown,    // Alphabetical
      zebra       // Alphabetical
    ]);
  });

  it('should place predefined items before non-predefined items', () => {
    const items = [apple, tora];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([tora, apple]);

    const items2 = [tora, apple];
    items2.sort(sortHierarchicalMenu);
    expect(items2).toEqual([tora, apple]);
  });

  it('should correctly sort "misc" and "other" according to their defined order', () => {
    const items = [other, misc, tora];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([tora, misc, other]);

    const items2 = [misc, other];
    items2.sort(sortHierarchicalMenu);
    expect(items2).toEqual([misc, other]);
  });

  it('should handle an empty array input (sort does nothing)', () => {
    const items = [];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([]);
  });

  it('should handle items with identical names (stability check)', () => {
    const tora1 = { name: 'Tora', id: 1 };
    const tora2 = { name: 'Tora', id: 2 };
    const apple1 = { name: 'Apple', id: 1 };
    const apple2 = { name: 'Apple', id: 2 };

    // Test with items in predefined list
    let items = [tora2, tora1];
    items.sort(sortHierarchicalMenu);
    // JavaScript's sort is not guaranteed stable by default, but for items
    // that compare as equal (0), their order should be preserved.
    // Our function returns 0 for identical predefined items (aIndex - bIndex will be 0).
    expect(items).toEqual([tora2, tora1]);

    items = [tora1, tora2];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([tora1, tora2]);

    // Test with items not in predefined list
    items = [apple2, apple1];
    items.sort(sortHierarchicalMenu);
    // Our function returns 0 for identical non-predefined items.
    expect(items).toEqual([apple2, apple1]);

    items = [apple1, apple2];
    items.sort(sortHierarchicalMenu);
    expect(items).toEqual([apple1, apple2]);
  });

  it('should handle items with missing or null name properties (treated as empty strings)', () => {
    const itemWithNullName = { name: null, id: 1 };
    const itemWithMissingName = { id: 2 }; // name is undefined
    const itemWithEmptyName = { name: "", id: 3 };

    // All non-predefined, should sort alphabetically (empty strings first)
    // and then by stability or original order for equal ones.
    // "" vs "" is 0.
    // "" vs "apple" is -1.
    const items = [apple, itemWithNullName, itemWithMissingName, itemWithEmptyName];
    items.sort(sortHierarchicalMenu);

    // Expected: empty/null/undefined names first (as they become ""), then 'apple'.
    // The relative order of items that all convert to "" for name is preserved.
    expect(items).toEqual([itemWithNullName, itemWithMissingName, itemWithEmptyName, apple]);

    const items2 = [itemWithEmptyName, itemWithMissingName, apple, itemWithNullName];
    items2.sort(sortHierarchicalMenu);
    expect(items2).toEqual([itemWithEmptyName, itemWithMissingName, itemWithNullName, apple]);
  });

  it('should handle a mix of predefined, non-predefined, and "emptyish" named items', () => {
    const itemWithNullName = { name: null, id: 1 }; // Becomes ""
    const items = [misc, apple, itemWithNullName, tora];
    items.sort(sortHierarchicalMenu);
    // Expected: tora, misc (predefined), then "" (from null), then apple
    expect(items).toEqual([tora, misc, itemWithNullName, apple]);
  });
});
