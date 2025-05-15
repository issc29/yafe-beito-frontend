/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, navigate } from "gatsby";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
import Dropdown from "./dropdown";

const aboutLinks = [
  {"name":"The Hakham", "link":"/about/hakham"},
  {"name":"Yafe Be'ito", "link":"/about/yafe-beito"},
  {"name":"Class Library", "link":"/about/classes"}
]

const navigation = [
  { type: 'link', name: 'Home', current: false, href: '/'},
  { type: 'dropdown', name: 'About', current: false, options: aboutLinks},
  { type: 'link', name: 'Classes', current: false, href: '/classes'},
  { type: 'link', name: 'Donate', current: false, href: '/donate'},
  { type: 'link', name: 'Contact', current: false, href: '/contact'},
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
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-dark-blue hover:text-white hover:bg-dark-blue focus:outline-none ring-2 ring-inset  ring-dark-blue">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-44 w-auto cursor-pointer"
                    src={imageUrlFor(buildImageObj(logo))
                      .width(170)
                      .height(170)
                      .url()}
                    title="Yafe Beito"
                    onClick={() => {
                      navigate("/")
                    }}
                  />
                  <img
                    className="hidden lg:block h-44 w-auto cursor-pointer"
                    src={imageUrlFor(buildImageObj(logo))
                      .width(170)
                      .height(170)
                      .url()}
                      title="Yafe Beito"
                      onClick={() => {
                        navigate("/")
                      }}
                  />
                </div>
                <div className="hidden sm:block sm:ml-6 mt-6 ">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (

                      (item.type == "dropdown") 
                      ?
                      <Dropdown name={item.name} options={item.options} key={item.name}/>
                      : 
                      <div className="w-28" key={item.href}>
                        <Link to={item.href} className={classNames(
                          item.current ? 'bg-white/50 text-site-grey' : ' bg-dark-blue text-white no-underline text-xl hover:bg-white/50 hover:text-dark-blue',
                          'w-28 h-11 px-4 py-2 rounded-md  text-center font-medium w-full inline-block'
                        )}
                        aria-current={item.current ? 'page' : undefined}>{item.name}</Link>
                     </div>
                    ))}
                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 ">
              {navigation.map((item) => (
                //PUT HERE: IF item
                (item.type == "dropdown") 
                ?
                item.options.map((option) => {
                  const name = item.name + " " + option.name
                  const link = option.link

                  return (
                    <Disclosure.Button
                      key={name}
                      as="a"
                      href={link}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'bg-dark-blue text-white no-underline text-xl hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                  >
                      {name}
                  </Disclosure.Button>
                  )
                })
                : 
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'bg-dark-blue text-white no-underline text-xl hover:bg-gray-700 hover:text-white',
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
