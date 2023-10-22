import React from "react";

export const PortableTextCustomizations = {
  block: {
    normal: ({children}) => <p className="my-2">{children}</p>,
  },
  marks: {
    strong: ({children}) => <strong className="font-bold">{children}</strong>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc ml-6 my-2">{children}</ul>,
  },
  listItem: {
    bullet: ({children}) => <li className="">{children}</li>,
  },
}