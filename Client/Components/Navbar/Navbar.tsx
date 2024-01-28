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



  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

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

  const ListItem = ({ href, text, onClick }: Links) => {
    return href ? (
      <Link href={href} passHref>
        <li className="cursor-pointer" onClick={onClick}>
          {text}
        </li>
      </Link>
    ) : (
      <li className="cursor-pointer" onClick={onClick}>
        {text}
      </li>
    );
  };


  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 transition">
      <ul className="text-center p-10">
        {links.map((link) => (
          <ListItem key={link.id} href={link.href} text={link.text} onClick={link.onClick} />
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
          {links.map((link) => (
            <ListItem key={link.id} href={link.href} text={link.text} onClick={link.onClick} />
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
      <section>

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