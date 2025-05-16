import React from "react";
import { navigate } from "gatsby";
import { useFeaturedClasses } from "../hooks/use-featured-classes";

export default function FeaturedClasses() {
  const featuredClasses = useFeaturedClasses();

  return (
    <div className="text-dark-blue my-10">
      <hr className="border-2 border-dark-blue mx-auto w-1/2 mb-4" />
      <div className="text-center text-5xl">FEATURED CLASSES:</div>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-5">
      {featuredClasses.map((featuredClass) => (
          <button 
            className="bg-dark-blue text-lg text-white hover:bg-white hover:text-dark-blue font-bold py-5 sm:py-2 px-4 w-full sm:w-60 h-auto sm:h-24 rounded-md"
            key={featuredClass.url}
            onClick={() => {
              navigate(featuredClass.url)
            }}
          >
            {featuredClass.title}
          </button>
      ))}
      </div>
    </div>
  );
}