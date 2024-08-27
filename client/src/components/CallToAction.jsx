import React from 'react'
import { Button } from 'flowbite-react'

const CallToAction = () => {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center text-center">
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>Want to learn more about Javascript?</h2>
                <p className='text-gray-500 my-2'>Checkout these resourses with javascript projects</p>
                <Button gradientDuoTone='purpleToPink'>
                    <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferror'>100 Javascript projects</a>
                </Button>
            </div>
            <div className="p-7">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShd7rqYDVmv8tDkFPNP2UQrzzANkLB8DUYpVf_IazK8g&s" alt="" />
            </div>
        </div>
    )
}

export default CallToAction