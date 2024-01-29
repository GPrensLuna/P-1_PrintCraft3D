/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setLoginUser } from '@/redux/features/LogInSlice';
import { setSearchValue } from '@/redux/features/SearchSlice';
import { Links } from "@/Ts/Links";
import Logo_PrintCraft3D from '@/img/Logo_PrintCraft3D.webp';
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();
  const [searchValueLocal, setSearchValueLocal] = useState("");
  const { data: session } = useSession();

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

  const isAdmin = session?.user?.roll === 'Admin';

  const links = [
    { id: 1, href: "/", text: "🏠 Home" },
    { id: 2, href: "/ShoppingCart", text: "🛒 Cart" },
    ...(isAdmin ? [
      { id: 3, href: "/Admin/UserList", text: "📋 User List" },
      { id: 4, href: "/Admin/ProductList", text: "📦 Product List" }
    ] : []),
    ...(!session
      ? [{ id: 5, href: "/LoginUp", text: "🦸 LoginUp" }]
      : [{ id: 6, href: "/Profile", text: `🦸 ${session.user.name}` },
      { id: 7, href: "", text: "🚪Logout", onClick: () => signOut() }])
  ];

  const ListItem = ({ href, text, onClick, isActive }: Links) => {
    const baseStyle = "cursor-pointer flex items-center justify-center py-2 lg:py-5";
    const activeStyle = isActive ? "border-b-2 border-blue-500" : "";

    return href ? (
      <Link href={href} passHref>
        <li className={`${baseStyle} ${activeStyle} hover:text-blue-300 focus:text-blue-400`} onClick={onClick}>
          {text}
        </li>
      </Link>
    ) : (
      <li className={`${baseStyle} ${activeStyle} hover:text-blue-300 focus:text-blue-400`} onClick={onClick}>
        {text}
      </li>
    );
  };

  const mobileMenu = (
    <div className={`lg:hidden ${click ? 'block' : 'hidden'} z-20 absolute top-14 w-full left-0 right-0 transition bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 shadow-lg rounded-b-xl`}>
      <ul className="text-center space-y-4 py-8">
        {links.map((link) => (
          <ListItem key={link.id} href={link.href} text={link.text} onClick={link.onClick} className={''} isActive={false} />
        ))}
      </ul>
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 h-14 lg:h-16 flex justify-between items-center z-50 text-white px-4 lg:px-20">
      <Link href="/" className="flex items-center">
        <Image src={Logo_PrintCraft3D} alt="Logo_PrintCraft3D" width={50} height={50} />
        <span className="text-2xl lg:text-3xl font-bold ml-2">PrintCraft3D</span>
      </Link>
      <section className="hidden lg:flex flex-1 items-center justify-end">
        <ul className="flex gap-4 lg:gap-6 items-center">
          {links.map((link) => (
            <ListItem key={link.id} href={link.href} text={link.text} onClick={link.onClick} className={''} isActive={false} />
          ))}
          <li>
            <input
              type="search"
              className="w-36 lg:w-48 border-b-2 border-white bg-transparent text-white placeholder-gray-300 px-2 py-1 focus:outline-none"
              placeholder="Search"
              value={searchValueLocal}
              onChange={handleSearchChange}
            />
          </li>
        </ul>
      </section>
      <div className="lg:hidden block">{click && mobileMenu}</div>
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