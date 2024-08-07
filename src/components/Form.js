"use client"
import { useState } from 'react';
import {ExternalLink} from "lucide-react"
import Loader from './Loader';
import Link from 'next/link';
import LinearBuffer from './LinearBuffer';
import FaciInfo from './FaciInfo';
import Image from 'next/image';
import "../app/globals.css";

const Form = () => {
    const [formData, setFormData] = useState({ url: '' });
    const [arcadePoints, setArcadePoints] = useState(null);
    const [totalPoints, setTotalPoints] = useState(null);
    const [milestoneData, setMilestoneData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [listOfBadges, setListOfBadges] = useState(null);
    const [badgeValText, setBadgeValText] = useState("All Badges");
    const [badgeValPoint, setBadgeValPoint] = useState(0);
    const [status, setStatus] = useState("Waiting for a valid input!");
    const [responseTime, setResponseTime] = useState(null);
    const [showProgressBar, setShowProgressBar] = useState(false);

    const handleChange = (e) => {
        setStatus("Waiting for a valid input...");
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (validateURL(value))
            setStatus("URL validated, calculate now.")
    };

    const validateURL = (url) => {
        const prefix = 'https://www.cloudskillsboost.google/public_profiles/';
        return url.startsWith(prefix);
    };

    const handleBadgeChange = (e) => {
        const badgeVal = e.target.value;
        if (badgeVal === "allBadges") {
            setListOfBadges(result.badges);
            setBadgeValText("All Badges");
            setBadgeValPoint(totalPoints);
        } else if (badgeVal === "specialBadges") {
            setListOfBadges(result.special);
            setBadgeValText("Special Badges");
            setBadgeValPoint(result.special.length);
        } else if (badgeVal === "levelBadges") {
            setListOfBadges(result.level);
            setBadgeValText("Level Badges");
            setBadgeValPoint(result.level.length);
        } else if (badgeVal === "triviaBadges") {
            setListOfBadges(result.trivia);
            setBadgeValText("Trivia Badges");
            setBadgeValPoint(result.trivia.length);
        } else if (badgeVal === "monsoonBadges") {
            setListOfBadges(result.monsoon);
            setBadgeValText("Monsoon Badges");
            setBadgeValPoint(result.monsoon.length);
        } else if (badgeVal === "skillBadges") {
            setListOfBadges(result.skill);
            setBadgeValText("Skill Badges");
            setBadgeValPoint(result.skill.length / 2);
        } else if (badgeVal === "digiLeaderBadges") {
            setListOfBadges(result.digital);
            setBadgeValText("Digital Leader Badges");
            setBadgeValPoint(result.digital.length === 6 ? 5 : 0);
        }
    };

    const savelog = async (logData) => {
        try {
            const response = await fetch('/api/submit-log', {
                method: 'POST',
                body: JSON.stringify(logData),
            });

            if (response.ok) {
                console.log('Log successfully submitted');
            } else {
                console.error('Log submission error');
            }
        } catch (error) {
            console.error('Log submission error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setArcadePoints(null);
        setResult(null);
        setStatus("Milestones Loading..");
        setError(null);

        try {
            if (!validateURL(formData.url)) {
                setError("Wrong URL");
                setTimeout(() => {
                    setError(null);
                    setStatus("Waiting for a valid Input!!!");
                }, 2000);
                return;
            }
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: formData.url }),
            });

            if (!response.ok) {
                throw new Error("Error from the Server");
            }

            const data = await response.json();
            console.log(data);
            setShowProgressBar(true);
            setArcadePoints(data.points ? data.points : "0");
            setMilestoneData(data.milestone);
            setTotalPoints(data.totalPoints);
            setBadgeValPoint(data.totalPoints);
            setListOfBadges(data.badges);
            setResponseTime((data.resTime / 1000).toFixed(2));
            setTimeout(() => {
                setShowProgressBar(false);
                setResult(data);
            }, 2000);
            setLoading(false);

            // save the log
            await savelog({
                "public_profile_url": formData.url,
                "arcade_points": data.points,
                "response_time": data.resTime,
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Image
                className="absolute w-full top-0 left-0 z-[1]"
                src="https://res.cloudinary.com/djoebsejh/image/upload/v1721131421/nwtojjwtzniome9r5jt1.svg"
                alt="Background"
                width={100}
                height={30}
            />
            {/* <Image
                className="absolute bottom-0 z-1 w-full z-[0]"
                src="https://res.cloudinary.com/djoebsejh/image/upload/v1721132768/re68ribffzls2bjx4khn.svg"
                alt="Background End"
                width={100}
                height={50}
            /> */}
            <div className=' container w-80 lg:w-[1000px] md:w-[97%] mt-8 mb-8 p-4 bg-blue-200 dark:bg-gray-800 shadow-md rounded flex flex-col  md:flex-row justify-center items-center gap-6 z-[9]'>

                <form onSubmit={handleSubmit} className=" w-full md:w-[60%] p-4 ">
                    <div className="mb-4">
                        <input
                            type="text"
                            id="url"
                            name="url"
                            placeholder='Paste Public-Profile-URL here'
                            value={formData.url}
                            onChange={handleChange}
                            className="w-full text-center px-3 py-2 bg-blue-100 dark:bg-[#101823] border border-blue-500 dark:border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button type="submit" className="flex justify-center items-center w-full text-gray-100 dark:text-black dark:bg-green-400 font-bold text-xl bg-blue-600  py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-green-500">
                        {loading ? <Loader /> : "Calculate"}
                    </button>
                    {arcadePoints ? (
                        <div className="mt-4 p-4 bg-blue-100 dark:bg-gray-900 rounded text-center">
                            <h2 className="text-lg text-center font-bold mb-2 text-green-800 dark:text-green-400">Arcade Points: {arcadePoints}</h2>
                            {milestoneData && <h2 className="text-lg text-center font-bold mb-2 text-green-800 dark:text-green-400">{milestoneData} Milestone</h2>}
                        </div>
                    ) : (
                        <div className="mt-4 p-4 bg-blue-100 dark:bg-gray-900 rounded text-center">
                            <h2 className={`text-base text-center mb-2 ${error ? "text-red-500" : ""}`}>{error ? error : status}</h2>
                        </div>
                    )}
                </form>

                <div className='w-full md:w-[50%] dark:text-white z-[9]'>
                    <div className='p-2 font-bold text-center underline'>Note:</div>
                    <div className='p-2 text-center'>Arcade Points shown here don&apos;t include any <strong>Bonus Points</strong> of the <strong>Google Cloud Facilitator Program 2024</strong>.</div>
                    <div className='p-2 text-center'><Link href={"https://chat.whatsapp.com/JBOoJTNLcSVIspf9zZyFlU"} target="_blank"><strong className='flex flex-row text-center items-center justify-center gap-2'>WhatsApp Community <ExternalLink className="h-5 w-5"/> </strong></Link></div>
                    <div className='p-2 text-green-800 dark:text-green-300 text-center'>Last Updated: <strong>7th August, 2024</strong></div>
                </div>
            </div>
            {showProgressBar && <section className='container z-[9]'><LinearBuffer /></section>}

            {result && <FaciInfo faciData={result.faciCounts} />}

            {result && <section className='container z-[9]'>
                <h1 className='p-2 font-bold text-center text-lg md:text-xl'>All Badge Details</h1>
                <select name="badges" id="badges" className='mt-4 mb-4 w-full rounded-md md:min-w-[700px] bg-blue-200 dark:bg-gray-800 dark:text-white p-4 text-xl font-bold outline-none cursor-pointer' onChange={handleBadgeChange} defaultValue="allBadges">
                    <option className='rounded-lg bg-blue-100 dark:bg-slate-900 p-2' type="button" value="allBadges">All Badges</option>
                    <option className='rounded-lg bg-blue-100 dark:bg-slate-900 p-2' type="button" value="levelBadges">Level Badges</option>
                    <option className='rounded-lg bg-blue-100 dark:bg-slate-900 p-2' type="button" value="triviaBadges">Trivia Badges</option>
                    <option className='rounded-lg bg-blue-100 dark:bg-slate-900 p-2' type="button" value="specialBadges">Special Badges</option>
                    <option className='rounded-lg bg-blue-100 dark:bg-slate-900 p-2' type="button" value="monsoonBadges">Monsoon Challenge Badges</option>
                    <option className='rounded-lg bg-blue-100 dark:bg-slate-900 p-2' type="button" value="digiLeaderBadges">Digital Leader Badges</option>
                    <option className='rounded-lg bg-blue-100 dark:bg-slate-900 p-2' type="button" value="skillBadges">Skill Badges</option>
                </select>
                <table className='border-collapse w-full px-2 rounded-md mb-4'>
                    <tbody>
                        <tr className='border border-blue-500 dark:border-gray-200'>
                            <th className='text-center p-2 text-bold text-xl bg-blue-200 dark:bg-slate-600 border-r border-blue-600 dark:border-gray-400'>Title</th>
                            <th className='hidden lg:block text-center p-2 text-bold text-xl bg-blue-200 dark:bg-slate-600 border-r border-blue-600 dark:border-gray-400'>Date Earned</th>
                            <th className='text-center p-2 text-bold text-xl bg-blue-200 dark:bg-slate-600'>Arcade Point</th>
                        </tr>
                        {listOfBadges.map((badge) => {
                            return <tr key={badge.title} className=' border border-blue-600 dark:border-gray-400 even:bg-blue-200 dark:even:bg-gray-700 odd:bg-blue-100 dark:odd:bg-gray-800'>
                                <td className='text-left p-2 border-r border-blue-600 dark:border-gray-400'>
                                    <Link href={badge.badgeURL} target='_blank'>{badge.title}</Link>
                                </td>
                                <td className='hidden lg:block text-center p-2 border-r border-blue-600 dark:border-gray-400'>{badge.dateEarned}</td>
                                <td className='text-center text-bold p-2'>{badge.points}</td>
                            </tr>
                        })}
                        <tr className=' border border-gray-200'>
                            <th className='text-center p-2 text-bold text-xl bg-blue-200 dark:bg-slate-600 border-r lg:border-0 border-blue-600 dark:border-gray-400'>{`Total Points Earned from ${badgeValText}`}</th>
                            <th className='hidden lg:block text-center p-2 text-bold text-xl bg-blue-200 dark:bg-slate-600 border-r border-blue-600 dark:border-gray-400'>-</th>
                            <th className='text-center p-2 text-bold text-xl bg-blue-200 dark:bg-slate-600'>{badgeValPoint}</th>
                        </tr>
                    </tbody>
                </table>
                {responseTime && <h1 className='text-right text-sm text-gray-500 dark:text-gray-300 mb-4 mx-2'>{`~ Response Time: ${responseTime} seconds`}</h1>}
            </section>}
        </>
    );
};

export default Form;
