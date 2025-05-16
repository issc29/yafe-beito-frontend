import React from "react";
import BlockContent from "./block-content";
import { useFeaturedNews } from "../hooks/use-featured-news";

export default function FeaturedNews() {
  const site = useFeaturedNews();

  return (
    <div className={`text-center text-dark-blue  ${(site["displayLatestNews"]) ? '': 'hidden'}`}>
      <hr className="border-2 border-dark-blue mx-auto w-1/2 mb-4" />
      <div className="text-center text-5xl">Latest News</div>
      <BlockContent blocks={site["_rawLatestNews"]} />
    </div>
  );
}