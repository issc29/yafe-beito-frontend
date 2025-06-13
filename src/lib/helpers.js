import { format, isFuture } from "date-fns";

export function concatClassNames(...args) {
  return args.filter(Boolean).join(" ");
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt);
}

export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(publishedAt, "yyyy/MM")}/${slug.current || slug}/`;
}

export function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

// Define the menu order and create a lookup map for efficient sorting.
// This is done once when the module is loaded, not on every sort comparison.
const PREDEFINED_MENU_ORDER = [
  "tora", "ketubim", "nebi'im", "talmud", "harambam", "tefilla",
  "personalities", "law", "holidays", "hebrew grammar / diqduq",
  "jewish history", "jewish thought", "yehuda halevi / kuzari",
  "matte dan", "sephardic history", "misc", "other"
];

const menuOrderLookup = PREDEFINED_MENU_ORDER.reduce((acc, item, index) => {
  acc[item] = index;
  return acc;
}, {});

export const sortHierarchicalMenu = (a, b) => {
  const aName = a.name ? a.name.toLocaleLowerCase() : "";
  const bName = b.name ? b.name.toLocaleLowerCase() : "";

  const aIndex = menuOrderLookup[aName];
  const bIndex = menuOrderLookup[bName];

  const aIsInMenu = aIndex !== undefined;
  const bIsInMenu = bIndex !== undefined;

  if (aIsInMenu && bIsInMenu) {
    // Both items are in the predefined menu order. Sort by their index.
    return aIndex - bIndex;
  } else if (aIsInMenu) {
    // Item 'a' is in the menu, item 'b' is not. 'a' comes first.
    return -1;
  } else if (bIsInMenu) {
    // Item 'b' is in the menu, item 'a' is not. 'b' comes first.
    return 1;
  } else {
    // Neither item is in the predefined menu. Sort them alphabetically.
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  }
};