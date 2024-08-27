import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserFailure, deleteuserStart, deleteUserSuccess, signoutSuccess } from '../redux/user/userSlice'

const DashProfile = () => {

    const { currentUser, error, loading } = useSelector((state) => state.user);

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    const filePickerRef = useRef();

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])

    const uploadImage = async () => {
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image, (File must be less than 3MB)'
                );
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL })
                })
            }
        )
    };

    const hanldeChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No changes made");
            return;
        }

        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));

            } else {
                dispatch(updateSuccess(data))
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }

    const handleDeleteUser = async () => {
        setShowModal(false)

        try {
            dispatch(deleteuserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message))
            } else {
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

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
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadingProgress && (
                        <CircularProgressbar value={imageFileUploadingProgress || 0}
                            text={`${imageFileUploadingProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`,
                                },
                            }}
                        />
                    )}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
                        ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}
                    />
                </div>
                {imageFileUploadError && (
                    <Alert color='failure'>{imageFileUploadError}</Alert>
                )}
                <TextInput type='text' id='username' placeholder='Username'
                    defaultValue={currentUser.username} onChange={hanldeChange} />

                <TextInput type='email' id='email' placeholder='Email'
                    defaultValue={currentUser.email} onChange={hanldeChange} />

                <TextInput type='password' id='username' placeholder='Password' onChange={hanldeChange} />

                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                    disabled={loading}
                >
                    Update
                </Button>

                {currentUser.isAdmin && (
                    <Link to={'/create-post'}>
                        <Button
                            type='button'
                            gradientDuoTone='purpleToPink'
                            className='w-full'
                            disabled={loading}
                        >
                            Create a post
                        </Button>
                    </Link>
                )}

            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
                <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
            </div>

            {updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )}

            {error && (
                <Alert color='failure' className='mt-5'>
                    {error}
                </Alert>
            )}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <AiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500'>Are you sure you want to delete this account ?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color='failure' onClick={handleDeleteUser} >Yes, Im sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>


    )
}

export default DashProfile