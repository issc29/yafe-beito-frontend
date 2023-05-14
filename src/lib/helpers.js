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

  var menu = ["tora", "ketubim", "talmud", "harambam", "law", 
             "tefilla", "holidays", "jewish history",
             "sephardic history", "misc"]
  if (a.name.toLocaleLowerCase() == "tora") {return -1}

  if (a.name.toLocaleLowerCase() == "ketubim") {
    return (menu.includes(b.name.toLocaleLowerCase(), 1)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "talmud") {
    return (menu.includes(b.name.toLocaleLowerCase(), 2)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "harambam") {
    return (menu.includes(b.name.toLocaleLowerCase(), 3)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "law") {
    return (menu.includes(b.name.toLocaleLowerCase(), 4)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "tefilla") {
    return (menu.includes(b.name.toLocaleLowerCase(), 5)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "holidays") {
    return (menu.includes(b.name.toLocaleLowerCase(), 6)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "jewish history") {
    return (menu.includes(b.name.toLocaleLowerCase(), 8)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "sephardic history") {
    return (menu.includes(b.name.toLocaleLowerCase(), 9)) ? -1 : 1
  }
  if (a.name.toLocaleLowerCase() == "misc") {
    return (menu.includes(b.name.toLocaleLowerCase(), 10)) ? -1 : 1
  }

// 1 sort a after b, e.g. [b, a]
// -1 sort a before b, e.g. [a, b]
  return  -1;
};