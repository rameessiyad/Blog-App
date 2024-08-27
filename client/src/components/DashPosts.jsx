import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState({})
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts)
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableHead>
            {userPosts.map((post, index) => (
              <TableBody className='divide-y' key={index}>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link className=' font-medium text-teal-500' to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {
            showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7'
              >
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p>You have no posts yet</p>
      )
      }
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500'>Are you sure you want to delete this post ?</h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeletePost} >Yes, Im sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div >
  )
}

export default DashPosts