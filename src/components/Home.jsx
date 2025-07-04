import React from 'react';
import Stats from '../pages/Stats';
import LanguageCategorySection from '../pages/LanguageCategorySection';


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
        </div>
    );
};

export default Home;