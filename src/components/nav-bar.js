import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from "./navigation/Logo";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileMenu from "./navigation/MobileMenu";

const aboutLinks = [
  {"name":"The Hakham", "link":"/about/hakham"},
  {"name":"Yafe Be'ito", "link":"/about/yafe-beito"},
  {"name":"Class Library", "link":"/about/classes"}
];

const navigation = [
  { type: 'link', name: 'Home', current: false, href: '/'},
  { type: 'dropdown', name: 'About', current: false, options: aboutLinks},
  { type: 'link', name: 'Classes', current: false, href: '/classes'},
  { type: 'link', name: 'Donate', current: false, href: '/donate'},
  { type: 'link', name: 'Contact', current: false, href: '/contact'},
];

export default function NavBar({ logo }) {
  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-44">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-dark-blue hover:text-white hover:bg-dark-blue focus:outline-none ring-2 ring-inset ring-dark-blue">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Logo logo={logo} />
                <DesktopNavigation navigation={navigation} />
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <MobileMenu navigation={navigation} />
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
