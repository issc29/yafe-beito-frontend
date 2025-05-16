import React from "react";
import { navigate } from "gatsby";
import { imageUrlFor } from "../../lib/image-url";
import { buildImageObj } from "../../lib/helpers";

export default function Logo({ logo }) {
  return (
    <div className="flex-shrink-0 flex items-center">
      <img
        className="block lg:hidden h-44 w-auto cursor-pointer"
        src={imageUrlFor(buildImageObj(logo))
          .width(170)
          .height(170)
          .url()}
        title="Yafe Beito"
        onClick={() => navigate("/")}
      />
      <img
        className="hidden lg:block h-44 w-auto cursor-pointer"
        src={imageUrlFor(buildImageObj(logo))
          .width(170)
          .height(170)
          .url()}
        title="Yafe Beito"
        onClick={() => navigate("/")}
      />
    </div>
  );
} 