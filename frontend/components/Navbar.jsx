"use client"
import React,{useContext} from 'react'
import {BellIcon, UserIcon, UserCircleIcon, LifebuoyIcon, PowerIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import { Navbar, Menu, MenuList, Button, MenuHandler, Typography, MenuItem } from '@material-tailwind/react'
import { AuthContext } from '@/context/AuthProvider'


export default function NavBar() {
  return (
    <div className="sticky bg-white top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 shadow-md">
      <div className="flex flex-row gap-5 justify-end items-center p-3">
          <BellIcon className="h-6 w-6 text-gray-400" />
          <ProfileMenu />
      </div>
    </div>
  )
}


 
  // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
   
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {user, logout} = useContext(AuthContext);
    const closeMenu = () => setIsMenuOpen(false);
   
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <UserIcon className="h-6 w-6 text-gray-400" />
            <Typography color="inherit" className='hidden md:block text-sm font-semibold tracking-tight'>
              {user.fullname}
            </Typography>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label} onClick={isLastItem? logout: closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}>
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal" color={isLastItem ? "red" : "inherit"}>
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }