/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginUser } from '@/redux/features/LogInSlice';
import { RootState } from '@/redux/store';
import { setSearchValue } from '@/redux/features/SearchSlice';
import { Links } from "@/Ts/Links";
import Logo_PrintCraft3D from '@/img/Logo_PrintCraft3D.webp';
import { UserState } from '@/Ts/Login'

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();
  const [searchValueLocal, setSearchValueLocal] = useState("");

  const logInData = useSelector((state: RootState) => state.logIn as UserState);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(setLoginUser(userData));
    }
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValueLocal(newValue);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(setSearchValue(searchValueLocal));
    }, 100);

    return () => clearTimeout(timerId);
  }, [searchValueLocal, dispatch]);

  const links = [
    { href: "/", text: "🏠 Home" },
    { href: "/ShoppingCart", text: "🛒 Cart " },
    { href: "/LoginUp", text: "🦸 LoginUp" },
    { href: "/Profile", text: logInData?.firstName ? `🦸 ${logInData.firstName}` : "🦸 Profile" },
    { href: "/Admin/UserList", text: "📋 User List" },
    { href: "/Admin/ProductList", text: "📦 Product List" },
  ];

  const ListItem = ({ href, text }: Links) => (
    <Link href={href} passHref>
      <li className="border-b w-40 h-10 border-slate-800 hover:bg-sky-900 hover:rounded flex justify-center items-center cursor-pointer">
        {text}
      </li>
    </Link>
  );

  const ListNav = ({ href, text }: Links) => (
    <Link href={href} passHref>
      <li className="my-4 py-4 border-b border-slate.800 hover:bg-sky-800 hover:rounded cursor-pointer">
        {text}
      </li>
    </Link>
  );


  const content = (
    <div className="lg:hidden z-50 block absolute top-16 w-full left-0 right-0 transition bg-gradient-to-r from-blue-950 via-sky-800 to-sky-600">
      <ul className="text-center text-x1 p-10">
        {links.map((link) => (
          <ListNav key={link.href} href={link.href} text={link.text} />
        ))}
      </ul>
    </div>
  );

  return (
    <nav
      className="bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4"
      style={{ minWidth: "450px" }}
    >
      <section className="flex items-center flex-1 ">
        <Link href="/">
          <div className="flex justify-center items-center">
            <Image src={Logo_PrintCraft3D} alt="Logo_PrintCraft3D" width={60} height={60} />
            <span className="text-3xl  font-bold">PrintCraft3D</span>
          </div>
        </Link>
      </section>
      <section className="lg:flex hidden flex-1 items-center justify-end font-normal">
        <ul className="flex gap-6 text-[16px]">
          {links.map((links) => (
            <ListItem key={links.href} href={links.href} text={links.text} />
          ))}
          <input
            type="search"
            className="relative m-0 block w-48 min-w-0 flex-auto border  border-b-1 border-l-0 border-r-0 border-t-0 rounded-md bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-50 "
            id="search"
            placeholder="Search"
            value={searchValueLocal}
            onChange={handleSearchChange}
          />
        </ul>
      </section>
      <div className="lg:hidden block">{click && content}</div>
      <button className="block lg:hidden transition" onClick={handleClick}>
        {click ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 40 60"
            fill="red"
          >
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 40 60"
          >
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        )}
      </button>
    </nav>
  );
};
