import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Header from "@/components/Header";
import "./globals.css"

export default function Home() {
  return (
    <>
      <Header />
      <main className="  flex min-h-[90vh] md:min-h-[92vh] flex-col items-center justify-center bg-lightBg dark:bg-[#090816] text-black dark:text-darkText">
        <h1 className=" text-center text-xl md:text-2xl font-bold mt-6 w-[90%] z-[9] dark:text-white">Arcade Points Calculator - by Technocrats❤️</h1>
        <Form />
        <div className="hero w-full z-[0] top-[50%] overflow-x-hidden"></div>
      </main>
      <Footer />
    </>
  );
}
