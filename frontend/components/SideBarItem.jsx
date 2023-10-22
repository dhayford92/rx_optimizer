"use client"
import React from 'react'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// SideBar Item
const SideBarItem = ({icon, text, href, path}) => {
    const router = useRouter();
    const newPath = useSelectedLayoutSegments();
 

    return (
        <ListItem 
            onClick={() => router.push(href)}
            className={`${newPath === path && 'focus:bg-primary'} text-white`}
            selected={newPath === href}
            ripple='light'
            hoverClassName='bg-[#03989E]'
        >
           {icon && <ListItemPrefix>
                {icon}
            </ListItemPrefix>}
            {text}
        </ListItem> 
    );
}


export const SelectSideItem = ({icon, text, href, path, listSide}) => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const newPath = useSelectedLayoutSegments();

    const handlerClick = () => {
        if (newPath === path) {
            router.push(href);
        } else {
            setOpen((prev) => !prev);
        }
    }

    return (
        <Accordion open={open || newPath === path}
            icon={<ChevronDownIcon trokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open || newPath === path ? "rotate-180" : ""}`}/>
        }>
            <ListItem onClick={() => handlerClick()} className="p-0 text-white focus:bg-primary" selected={newPath === path}>
                <AccordionHeader className="border-b-0 p-3 text-white">
                    <ListItemPrefix>
                        {icon}
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">
                        {text}
                    </Typography>
                </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-dark-secondary">
            <List className="pl-6">
                {listSide.map((item, index) => (
                    <SideBarItem key={index} {...item}/>
                ))}
            </List>
            </AccordionBody>
        </Accordion>
    )
}


export default SideBarItem;