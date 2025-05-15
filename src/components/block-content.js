import React from "react";
import { PortableText } from "@portabletext/react";
import { Figure } from "./figure";

const components = {
  types: {
    figure: Figure
  }
};

const BlockContent = ({ blocks }) => <PortableText value={blocks} components={components} />;

export default BlockContent;
