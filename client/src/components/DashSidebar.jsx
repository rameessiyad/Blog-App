import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUser, HiOutlineUsers, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
import { } from 'react-redux'
import { FaComment } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

const DashSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)

    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search])

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    {
                        currentUser.isAdmin && (
                            <Link to='/dashboard?tab=dashboard'>
                                <Sidebar.Item
                                    active={tab === 'dashboard' || !tab}
                                    icon={MdDashboard}
                                    as='div'
                                >
                                    Dashboard
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={currentUser.isAdmin ? "Admin" : "User"}
                            labelColor='dark'
                            className='cursor-pointer'
                            as='div'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        currentUser.isAdmin && (
                            <Link to='/dashboard?tab=posts'>
                                <Sidebar.Item
                                    active={tab === 'posts'}
                                    icon={HiDocumentText}
                                    as='div'
                                >
                                    Posts
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentUser.isAdmin && (
                            <Link to='/dashboard?tab=users'>
                                <Sidebar.Item
                                    active={tab === 'users'}
                                    icon={HiOutlineUsers}
                                    as='div'
                                >
                                    Users
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentUser.isAdmin && (
                            <Link to='/dashboard?tab=comments'>
                                <Sidebar.Item
                                    active={tab === 'comments'}
                                    icon={FaComment}
                                    as='div'
                                >
                                    Comments
                                </Sidebar.Item>
                            </Link>
                        )
                    }


                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout} >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar