import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import React from 'react'
import { Link } from 'gatsby'

export default function Dropdown({name, options}) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:bg-white/50" >
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-transparent rounded-md hover:bg-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {name}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-black-200 hover:text-black-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items open="false" className="absolute right-0 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {options.map((option) => (
                <Menu.Item>
                {({ active }) => (
                  <Link to={option.link} className={`${
                    active ? 'bg-violet-500 text-black' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>{option.name}</Link>
                )}
              </Menu.Item>
              ))
              }
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
