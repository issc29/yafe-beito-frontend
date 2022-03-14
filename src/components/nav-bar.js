/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
import { Link } from "gatsby";

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'About', href: '#', current: false },
  { name: 'Classes', href: '#', current: false },
  { name: 'Blog', href: '#', current: false },
  { name: 'Bookshop', href: '#', current: false },
  { name: 'Donate', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({logo}) {
  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-44">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-44 w-auto"
                    src={imageUrlFor(buildImageObj(logo))
                      .width(170)
                      .height(170)
                      .url()}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-44 w-auto"
                    src={imageUrlFor(buildImageObj(logo))
                      .width(170)
                      .height(170)
                      .url()}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to="/" className={classNames(
                        item.current ? 'bg-white/50 text-site-grey' : 'text-site-grey hover:bg-white/50 hover:text-site-grey',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}>{item.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
