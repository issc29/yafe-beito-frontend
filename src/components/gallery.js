import { ProGallery } from 'pro-gallery';
import 'pro-gallery/dist/statics/main.css';
import React from 'react';
import { graphql, StaticQuery } from "gatsby";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";

const query = graphql`
query  {
        site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
         gallery {
            images {
              crop {
                _key
                _type
                bottom
                left
                right
                top
              }
              hotspot {
                _key
                _type
                height
                x
                y
                width
              }
              asset {
                _id
                altText
              }
              alt
            }
          }
              }	
      }
`;

export default function Gallery() {



  // The options of the gallery (from the playground current state)
  const options = {
    galleryLayout: 4,
    isAutoSlideshow: true,
    autoSlideshowInterval: 5,
    slideshowLoop: true,


  };

  // The size of the gallery container. The images will fit themselves in it
  const container = {
    width: 800,
    height: 400
  };

  // The eventsListener will notify you anytime something has happened in the gallery.
  const eventsListener = (eventName, eventData) => console.log({eventName, eventData}); 

  // The scrollingElement is usually the window, if you are scrolling inside another element, suplly it here
  //const scrollingElement = window;
  return (
        <StaticQuery
          query={query}
          render={data => {
            if (!data.site) {
              throw new Error(
                'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
              );
            }
            var items2 = [];
            for(var image of data.site.gallery.images) {
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
                eventsListener={eventsListener}
              />
            );
          }}
        />
      );
}