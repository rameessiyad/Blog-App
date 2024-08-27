import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'

const FooterComponent = () => {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link to='/'
                            className='self-center font-semibold dark:text-white text-lg sm:text-xl'
                        >
                            <span
                                className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'
                            >MERN</span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                    PULSAR BIKES
                                </Footer.Link>
                                <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                    MERN BLOG
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='follow us' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                    Linkedin
                                </Footer.Link>
                                <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                    Instagram
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='legal' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                    Privacy policy
                                </Footer.Link>
                                <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                    Terms & conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href='#' by='Mern blog' year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-5 mt-4 sm:justify-center">
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='#' icon={BsLinkedin} />
                        <Footer.Icon href='#' icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComponent