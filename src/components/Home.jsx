import React from 'react';
import Stats from '../pages/Stats';
import LanguageCategorySection from '../pages/LanguageCategorySection';
import { FaHome, FaLaptop, FaBolt, FaUsers } from "react-icons/fa";
import { FaPhoneAlt, FaRunning, FaShieldAlt, FaThumbsUp } from "react-icons/fa";
const Home = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-3 w-11/12 mx-auto bg-blue-100 p-4 rounded-lg'>
                        <div>
                            <img
                                src="https://i.ibb.co/Q71NNQ2K/Looking-for-a-tutor.jpg"
                                className="w-full h-full rounded-lg" />
                        </div>
                        <div className='py-20'>
                            <h1 className='font-bold text-3xl mb-4'>Tutor Matching &
                                <span className='text-blue-500'> Learning Platform.</span></h1>
                            <p className='mb-4'>Hire a conversant tutor to make your children's learning fun, comprehensive & easier. Make education exciting! Connect with a skilled tutor who makes complex topics simple and fun for your kids. Empower your child with personalized tutoring that builds confidence, curiosity, and a love for learning.</p>
                            <div className="overflow-hidden whitespace-nowrap">
                                <p className="animate-marquee text-xl font-bold">
                                    Very faster get your home master
                                </p>


                                <style>
                                    {`
                            @keyframes marquee {
                                0%   { transform: translateX(100%); }
                                100% { transform: translateX(-100%); }
                            }

                            .animate-marquee {
                                display: inline-block;
                                animation: marquee 8s linear infinite;
                            }
                            `}
                                </style>
                            </div>

                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-3 w-11/12 mx-auto bg-blue-100 p-4 rounded-lg'>
                        <div>
                            <img
                                src="https://i.ibb.co/7JxLf2sR/images-10.jpg"
                                className="w-full rounded-lg" />
                        </div>
                        <div className='py-20'>
                            <h1 className='font-bold text-3xl mb-4'>Tutor Matching &
                                <span className='text-blue-500'> Learning Platform.</span></h1>
                            <p className='mb-4'>Hire a conversant tutor to make your children's learning fun, comprehensive & easier. Make education exciting! Connect with a skilled tutor who makes complex topics simple and fun for your kids. Empower your child with personalized tutoring that builds confidence, curiosity, and a love for learning.</p>
                            <div className="overflow-hidden whitespace-nowrap">
                                <p className="animate-marquee text-xl font-bold">
                                    Very faster get your home master
                                </p>


                                <style>
                                    {`
                            @keyframes marquee {
                                0%   { transform: translateX(100%); }
                                100% { transform: translateX(-100%); }
                            }

                            .animate-marquee {
                                display: inline-block;
                                animation: marquee 8s linear infinite;
                            }
                            `}
                                </style>
                            </div>

                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-3 w-11/12 mx-auto bg-blue-100 p-4 rounded-lg'>
                        <div>
                            <img
                                src="https://i.ibb.co/SwpFJmkq/When-to-Get-a-Math-Tutor-for-Your-Child.jpg"
                                className="w-full h-full rounded-lg" />
                        </div>
                        <div className='py-20'>
                            <h1 className='font-bold text-3xl mb-4'>Tutor Matching &
                                <span className='text-blue-500'> Learning Platform.</span></h1>
                            <p className='mb-4'>Hire a conversant tutor to make your children's learning fun, comprehensive & easier. Make education exciting! Connect with a skilled tutor who makes complex topics simple and fun for your kids. Empower your child with personalized tutoring that builds confidence, curiosity, and a love for learning.</p>
                            <div className="overflow-hidden whitespace-nowrap">
                                <p className="animate-marquee text-xl font-bold">
                                    Very faster get your home master
                                </p>


                                <style>
                                    {`
                            @keyframes marquee {
                                0%   { transform: translateX(100%); }
                                100% { transform: translateX(-100%); }
                            }

                            .animate-marquee {
                                display: inline-block;
                                animation: marquee 8s linear infinite;
                            }
                            `}
                                </style>
                            </div>

                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-3 w-11/12 mx-auto bg-blue-100 p-4 rounded-lg'>
                        <div>
                            <img
                                src="https://i.ibb.co/qYX31JSV/images-9.jpg"
                                className="w-full h-full rounded-lg" />
                        </div>
                        <div className='py-20'>
                            <h1 className='font-bold text-3xl mb-4'>Tutor Matching &
                                <span className='text-blue-500'> Learning Platform.</span></h1>
                            <p className='mb-4'>Hire a conversant tutor to make your children's learning fun, comprehensive & easier. Make education exciting! Connect with a skilled tutor who makes complex topics simple and fun for your kids. Empower your child with personalized tutoring that builds confidence, curiosity, and a love for learning.</p>
                            <div className="overflow-hidden whitespace-nowrap">
                                <p className="animate-marquee text-xl font-bold">
                                    Very faster get your home master
                                </p>


                                <style>
                                    {`
                            @keyframes marquee {
                                0%   { transform: translateX(100%); }
                                100% { transform: translateX(-100%); }
                            }

                            .animate-marquee {
                                display: inline-block;
                                animation: marquee 8s linear infinite;
                            }
                            `}
                                </style>
                            </div>

                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-3xl mt-4 text-center'>Our Statistics</h1>
                <Stats></Stats>
            </div>
            <div>
                <LanguageCategorySection></LanguageCategorySection>
            </div>
            <section className="py-12 px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Tutoring <span className="text-green-500">Method</span>
                </h2>

                <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Top Left: Home Tutoring */}
                    <div className="text-center">
                        <div className="inline-block p-4 bg-green-100 rounded-full mb-2">
                            <FaHome className="text-green-500 text-2xl" />
                        </div>
                        <h3 className="font-semibold text-lg">Home Tutoring</h3>
                        <p className="text-sm">Personalized learning at home</p>
                    </div>

                    {/* Center Image - Hidden on Mobile */}
                    <div className="hidden md:flex col-span-1 justify-center items-center relative top-36">
                        <div className="rounded-full border-4 border-green-300 p-2 relative">
                            <div className="rounded-full border-2 border-dashed border-gray-300 p-1">
                                <img
                                    src="https://images.pexels.com/photos/6238058/pexels-photo-6238058.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt="Tutoring Method"
                                    className="w-64 h-64 object-cover rounded-full"
                                />
                            </div>
                            {/* Optional Plus Icons */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                                +
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                                +
                            </div>
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                                +
                            </div>
                            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                                +
                            </div>
                        </div>
                    </div>

                    {/* Top Right: Online Tutoring */}
                    <div className="text-center">
                        <div className="inline-block p-4 bg-green-100 rounded-full mb-2">
                            <FaLaptop className="text-green-500 text-2xl" />
                        </div>
                        <h3 className="font-semibold text-lg">Online Tutoring</h3>
                        <p className="text-sm">Flexible learning from anywhere</p>
                    </div>

                    {/* Bottom Left: Crash Program */}
                    <div className="text-center mt-12">
                        <div className="inline-block p-4 bg-green-100 rounded-full mb-2">
                            <FaBolt className="text-green-500 text-2xl" />
                        </div>
                        <h3 className="font-semibold text-lg">Crash Program</h3>
                        <p className="text-sm">Fast-track your exam prep</p>
                    </div>

                    {/* Spacer */}
                    <div></div>

                    {/* Bottom Right: Batch Tutoring */}
                    <div className="text-center mt-12">
                        <div className="inline-block p-4 bg-green-100 rounded-full mb-2">
                            <FaUsers className="text-green-500 text-2xl" />
                        </div>
                        <h3 className="font-semibold text-lg">Batch Tutoring</h3>
                        <p className="text-sm">Group learning, better results</p>
                    </div>
                </div>
            </section>
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    {/* Left Content */}
                    <div>
                        <p className="text-green-600 font-semibold mb-2">--WHY CHOOSE US</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            We intend to expand <span className="text-green-500">Excellent</span> education.
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center text-center">
                                <div className="bg-green-500 text-white p-3 rounded-full mb-3">
                                    <FaPhoneAlt size={20} />
                                </div>
                                <h4 className="text-lg font-semibold">24/7 Live Support</h4>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center text-center">
                                <div className="bg-green-500 text-white p-3 rounded-full mb-3">
                                    <FaRunning size={20} />
                                </div>
                                <h4 className="text-lg font-semibold">Fast Responsive</h4>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center text-center">
                                <div className="bg-green-500 text-white p-3 rounded-full mb-3">
                                    <FaShieldAlt size={20} />
                                </div>
                                <h4 className="text-lg font-semibold">Safe Community</h4>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center text-center">
                                <div className="bg-green-500 text-white p-3 rounded-full mb-3">
                                    <FaThumbsUp size={20} />
                                </div>
                                <h4 className="text-lg font-semibold">Better Than Others</h4>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full flex justify-center items-center">
                        <img
                            src="https://i.ibb.co/LzBQf0CH/651ee555d2f39ddc14f6b834-customer-service-channels-types-team.png"
                            alt="Support Team"
                            className="rounded-xl mt-20 shadow-lg w-full max-w-md"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;