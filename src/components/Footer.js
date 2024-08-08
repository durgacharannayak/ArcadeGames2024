import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-200 dark:bg-gray-700 text-gray-800 dark:text-white z-[10]">
            <hr />
            <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between p-4">
                <div className="my-2 flex justify-center items-center">
                    <Link href='https://in.linkedin.com/in/durgacharan-nayak' target='_blank'><FaLinkedin size={30} className='mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white' /></Link>
                    <Link href='https://www.youtube.com/@durgacharannayak3058' target='_blank'><FaYoutube size={30} className='mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white' /></Link>
                    <Link href='https://chat.whatsapp.com/JBOoJTNLcSVIspf9zZyFlU' target='_blank'><FaWhatsapp size={30} className='mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white' /></Link>
                    <Link href='https://instagram.com/durgacharannayak_' target='_blank'><FaInstagram size={30} className='mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white' /></Link>
                    <Link href='https://x.com/DurgacharanNa12' target='_blank'><FaTwitter size={30} className='mx-2 text-gray-900 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white' /></Link>
                </div>
                <p className="text-[1rem] lg:text-xl my-2 text-gray-800 dark:text-gray-300 text-center">&copy; Developed for <strong><Link href="https://go.cloudskillsboost.google/arcade" target='_blank'>Arcade 2024 Phase-II (July - Dec)</Link></strong> by <Link href="http://www.youtube.com/@durgacharannayak3058" target='_blank'><strong>Technocrats❤️</strong></Link></p>
            </div>
        </footer>
    )
}

export default Footer