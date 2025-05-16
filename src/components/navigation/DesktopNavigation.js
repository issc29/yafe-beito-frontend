import React from "react";
import { Link } from "gatsby";
import NavigationDropdown from "../NavigationDropdown";
import { concatClassNames } from "../../lib/helpers";

export default function DesktopNavigation({ navigation }) {
  return (
    <div className="hidden sm:block sm:ml-6 mt-6">
      <div className="flex space-x-4">
        {navigation.map((item) => (
          item.type === "dropdown" 
            ? <NavigationDropdown name={item.name} options={item.options} key={item.name} />
            : (
              <div className="w-28" key={item.href}>
                <Link 
                  to={item.href} 
                  className={concatClassNames(
                    item.current ? 'bg-white/50 text-site-grey' : 'bg-dark-blue text-white no-underline text-xl hover:bg-white/50 hover:text-dark-blue',
                    'w-28 h-11 px-4 py-2 rounded-md text-center font-medium w-full inline-block'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </div>
            )
        ))}
      </div>
    </div>
  );
} 