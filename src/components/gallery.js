import { ProGallery } from 'pro-gallery';
import React from 'react';
import { useGallery } from "../hooks/use-gallery";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
require('pro-gallery/dist/statics/main.css');

export default function Gallery() {

  // The options of the gallery (from the playground current state)
  const options = {
    behaviourParams_gallery_horizontal_autoSlide_behaviour: "CONTINUOUS",
    behaviourParams_gallery_horizontal_autoSlide_interval: 5,
    behaviourParams_gallery_horizontal_loop: true,
    layoutParams_structure_galleryLayout: 4
  };

  // The size of the gallery container. The images will fit themselves in it
  const container = {
    width: 800,
    height: 400
  };

  // The eventsListener will notify you anytime something has happened in the gallery.
  const eventsListener = (eventName, eventData) => {};

  // The scrollingElement is usually the window, if you are scrolling inside another element, suplly it here
  //const scrollingElement = window;

  const gallery = useGallery();

  var items2 = [];
  for(var image of gallery.images) {
    const src = imageUrlFor(buildImageObj(image)).url()
    const id = image.asset["_id"]
    items2.push({
      itemId: id,
      mediaUrl: src
    })
  }

  return (
    <ProGallery
      items={items2}
      options={options}
      container={container}
      //eventsListener={eventsListener}
    />
  );
}
