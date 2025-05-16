import React from "react";
import { DisclosureButton } from '@headlessui/react';
import { concatClassNames } from "../../lib/helpers";

export default function MobileMenu({ navigation }) {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      {navigation.map((item) => (
        item.type === "dropdown" 
          ? item.options.map((option) => {
              const name = item.name + " " + option.name;
              const link = option.link;

              return (
                <DisclosureButton
                  key={name}
                  as="a"
                  href={link}
                  className={concatClassNames(
                    item.current ? 'bg-gray-900 text-white' : 'bg-dark-blue text-white no-underline text-xl hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {name}
                </DisclosureButton>
              );
            })
          : (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={concatClassNames(
                item.current ? 'bg-gray-900 text-white' : 'bg-dark-blue text-white no-underline text-xl hover:bg-gray-700 hover:text-white',
                'block px-3 py-2 rounded-md text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </DisclosureButton>
          )
      ))}
    </div>
  );
} 