import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function About() {
    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center w-full bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl md:text-3xl text-black dark:text-orange-400 text-center p-4 font-semibold">Milestones & Prizes</h2>
                <Image 
                    src="/milestone.jpeg" 
                    alt="milestone" 
                    height={1000} 
                    width={1000} 
                    className="w-full object-contain"
                />
                <h2 className="text-xl md:text-3xl text-black dark:text-orange-400 text-center p-4 font-semibold">How to Calculate Points</h2>
                <Image 
                    src="/Points.jpeg" 
                    alt="milestone" 
                    height={1000} 
                    width={1000} 
                    className="w-full object-contain"
                />
            </main>
            <Footer />
        </>
    );
}
