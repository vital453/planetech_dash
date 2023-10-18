"use client";
import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Navbar,
  Collapse,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaUserCircle } from "react-icons/fa";
import { BsPower } from "react-icons/bs";
import Link from "next/link";
export default function Header({ title, user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const profileMenuItems = [
    // {
    //   label: "My Profile",
    //   icon: FaUserCircle,
    //   to: "/",
    // },
    // {
    //   label: "Edit Profile",
    //   icon: Cog6ToothIcon,
    // },
    // {
    //   label: "Inbox",
    //   icon: InboxArrowDownIcon,
    // },
    // {
    //   label: "Help",
    //   icon: LifebuoyIcon,
    // },
    {
      label: "Sign Out",
      icon: BsPower,
      to: "/api/auth/signout",
    },
  ];
  const userImage = user?.image ? (
    <Avatar
      variant="circular"
      size="sm"
      alt={user?.name ?? "Profile Pic"}
      className="border border-gray-900 p-0.5"
      src={user?.image}
    />
  ) : (
    <Avatar
      variant="circular"
      size="sm"
      alt="tania andrew"
      className="border border-gray-900 p-0.5 w-14 h-14"
      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    />
  );
  return (
    <div className="flex justify-between items-center pt-4 mb-4">
      <h2 className="font-bold">{title}</h2>
      <div>
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              {userImage}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            {profileMenuItems.map(({ label, icon, to }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <Link href={to} className="flex flex-col no-underline">
                  <MenuItem
                    key={label}
                    onClick={closeMenu}
                    className={`flex items-center gap-2 rounded ${
                      isLastItem
                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                        : ""
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${
                        isLastItem ? "text-red-500" : "text-neutralcolors"
                      }`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "black"}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                </Link>
              );
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color={"black"}
            >
              {user?.name}
            </Typography>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
