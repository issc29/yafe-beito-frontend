import { format, isFuture } from "date-fns";

export function cn(...args) {
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

export const sortHierarchicalMenu = (a, b) => {

  var aValue = a.name.toLocaleLowerCase()
  var bValue = b.name.toLocaleLowerCase()

  var menu = ["tora", "ketubim", "nebi'im", "talmud", "harambam", "tefilla", "personalities", "law", 
              "holidays", "hebrew grammar / diqduq", "jewish history", "jewish thought", "yehuda halevi / kuzari",
             "matte dan", "sephardic history", "misc", "other"]
  if (menu.includes(aValue)) {
    var aLocation = menu.indexOf(aValue)
    return (menu.includes(bValue, aLocation)) ? -1 : 1
  }

// 1 sort a after b, e.g. [b, a]
// -1 sort a before b, e.g. [a, b]
  return  -1;
};