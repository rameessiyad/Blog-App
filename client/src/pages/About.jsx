import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Mern Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p className="">
              Mern Blog is a blog created to share my thoughts about the thoughts and ideas in the web development, software engineering and programming languages fields. I hope you enjoy reading the blogs
            </p>
            <p className="">
              On this blog, you will find weekly articles on topics such as web development, software engineering and programming languages. you can learn a lot using this blog
            </p>
            <p className="">
              We encourage you to leave comments on our posts and engage with other readers. You can like other people's comments. We believe that a community of learners can help each other grow and improve
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About