import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const DropdownSort = props => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:bg-white/50 hover:text-dark-blue bg-dark-blue text-white no-underline text-xl rounded-md" >
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 rounded-md">
            {props.name}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 my-auto "
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
              {props.options.map((option) => (
                <Menu.Item>
                {({ active }) => (
                  <button onClick={props.setSort(option.sort)} className={`${
                    active ? 'bg-dark-blue text-white' : 'text-dark-blue'
                  } group flex rounded-md items-center w-full px-2 py-2 text-lg`}>{option.name}</button>
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

export default DropdownSort;