"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Home, ArrowRightCircle, Link2, MessageCircle, Youtube } from 'lucide-react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="bg-blue-200 dark:bg-[#090816] sticky top-0 z-10 shadow-md shadow-blue-100 dark:shadow-gray-900 w-full">
            <div className="container mx-auto flex h-16 items-center justify-between px-2 md:px-4">
                <div className='flex items-center justify-center gap-2 md:gap-5 text-left text-md md:text-2xl font-semibold'>
                    <Link href='/' className='rounded-full'>
                        <Image src='/logo1.jpeg' alt='GCP' width={60} height={60} className='rounded-xl '/>
                    </Link>
                    <div className="hidden md:flex items-center gap-2 md:gap-5">
                        <Link href={"https://go.cloudskillsboost.google/arcade"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 hover:border-b-4 border-orange-400">
                            <ArrowRightCircle className="mr-1" /> Arcade
                        </Link>
                        <Link href="/about" target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 hover:border-b-4 border-orange-400">
                            {/* <ArrowRightCircle className="mr-1" />  */}
                            About
                        </Link>

                        <Link href={"https://www.linkedin.com/in/durgacharan-nayak"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 gap-2" onClick={toggleMenu}>
                            <Image src="/linkedin.png" alt="linkedin" width={30} height={30} />
                        </Link>
                        <Link href={"https://chat.whatsapp.com/JBOoJTNLcSVIspf9zZyFlU"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 gap-2 hover:border-b-4 border-orange-400">
                            <Image src="/whatsapp.png" alt="whatsapp" width={25} height={25} />
                        </Link>
                        <Link href={"https://www.youtube.com/@durgacharannayak3058"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 gap-2 hover:border-b-4 border-orange-400">
                            <Image src="/youtube.png" alt="youtube" width={30} height={30} />
                        </Link>

                    </div>
                </div>
                <div className="ml-2 flex items-center space-x-4">
                    <ThemeToggle />
                    <button className="md:hidden" onClick={toggleMenu}>
                        {menuOpen ? <X className="w-6 h-6 text-lightText dark:text-darkText" /> : <Menu className="w-6 h-6 text-lightText dark:text-darkText" />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center bg-blue-200 dark:bg-[#090816] px-2 py-4">

                    <Link href={"https://go.cloudskillsboost.google/arcade"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 gap-2" onClick={toggleMenu}>
                        <ArrowRightCircle className="mr-1" /> Arcade
                    </Link>
                    <Link href="/about" target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 hover:border-b-4 border-orange-400">
                            <ArrowRightCircle className="mr-1" /> About
                        </Link>
                    <Link href={"https://www.linkedin.com/in/durgacharan-nayak"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 gap-2" onClick={toggleMenu}>
                        <Image src="/linkedin.png" alt="linkedin" width={30} height={30} /> Connect
                    </Link>
                    <Link href={"https://chat.whatsapp.com/JBOoJTNLcSVIspf9zZyFlU"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 gap-2 hover:border-b-4 border-orange-400">
                        <Image src="/whatsapp.png" alt="whatsapp" width={25} height={25} />WhatsApp
                    </Link> 

                    <Link href={"https://www.youtube.com/@durgacharannayak3058"} target="_blank" className="flex items-center text-lightText dark:text-darkText py-2 gap-2" onClick={toggleMenu}>
                        <Image src="/youtube.png" alt="youtube" width={30} height={30} /> Subscribe
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
