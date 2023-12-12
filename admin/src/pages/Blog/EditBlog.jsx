import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../assets/css/quill.css";
import { fetchOne, reset, update } from '../../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PostTags, QuillFormats, toolbar } from '../../data/data';
import ButtonLoader from '../../components/ButtonLoader';
import Main from '../../components/Main';
import Breadcrumb from '../../components/Breadcrumb';
import FullLoader from '../../components/FullLoader';
import { FaArrowLeft } from 'react-icons/fa';
// import { Buffer } from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer; 

const EditBlog = () => {
  let params = useParams();
  const [id] = useState(params.id);
  const dispatch = useDispatch();
  const values = { title: '', excerpt: '', tags: [], category: '' }
  const [description, setDescription] = useState('')
  const [formData, setFormData] = useState(values);
  const [image, setImage] = useState('');
  const [imageBool, setImageBool] = useState(false);
  const allTags = PostTags;
  const formats = QuillFormats;
  const modules = { toolbar }

  const { title, excerpt, tags, category } = formData;

  const onChange = (e, i) => {
    const values = [...formData.tags];
    if (e.target.name === 'tags') {
      if (e.target.checked == true) {
        values.push(e.target.value);
      } else if (e.target.checked == false) {
        values.splice(values.indexOf(e.target.value), 1);
      }
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: values,
      }))

    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const { data, response, isLoading, isFullLoading, isError, isSuccess, message } = useSelector((state) => state.post)

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && data) { // data      
      toast.success(message);
      setFormData(data);
    }

    if (isSuccess && response) {
      const { title, excerpt, tags, category } = response;
      setFormData({ title, excerpt, tags, category });
      setDescription(response.description)
      setImage(response.image.url);
    }

    dispatch(reset())
  }, [data, response, isError, isSuccess, message, dispatch])

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {      
      setImage(reader.result);
      setImageBool(true);
    }
  }

  const isBase64 = value => {
    const pattern =  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/
    const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/  
    //const hasNumber = new RegExp(pattern).test(value);    
   const val = pattern.exec(value);
    return val
};

  const validateImage = (img) => {   
    const check = Buffer.from(img, 'base64').toString('base64') 
    const bool = check === img ? true : false;
    return check;
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = { title, excerpt, tags, category, description, image: imageBool ? image : '' }
    if (data.description.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      toast.error('Description cannot be empty');
    } else {
      const param = { data, id }
      dispatch(update(param));
    }

  }

  const checkTag = (tag) => {
    const find = formData.tags.find((t) => t === tag);
    return find ? true : false;
  }

  useEffect(() => {
    //document.getElementById("the_body").classList.add('hold-transition, login-page');
  //   if (document.querySelector(".test").classList.contains('block')) {
  //     document.querySelector(".test").classList.add('john');
  //  }

    dispatch(fetchOne(id));
  }, []);

  if (isFullLoading) {
    return <FullLoader />
  }

  return (
      <Main>
            <div className="mb-4 col-span-full xl:mb-2">
              <Breadcrumb label={'Blogs'} label2={'Edit Blog'}/>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Edit Blog</h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center mb-4 sm:mb-0"></div>
              <Link to={'/blogs'} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                <span>&larr; Go back</span> 
              </Link>
            </div>
            <form>
              <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                <div className="col-span-2">
                  <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Add a new blog</h3>

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="sm:col-span-2">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
                        <input type="text" value={title} onChange={onChange} name="title" id="title" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="excerpt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Excerpt</label>
                        <textarea value={excerpt} onChange={onChange} id="excerpt" name='excerpt' rows="4" className="block p-2.5 w-full text-sm text-gray-900  
                          rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type excerpt here">
                        </textarea>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <ReactQuill className="add-new-post__editor mb-1" formats={formats} theme="snow" modules={modules} placeholder={'Type description here'} value={description} onChange={setDescription} />
                      </div>
                    </div>
                    <button type="submit" onClick={onSubmit} disabled={isLoading}
                      className={`${isLoading ? "cursor-not-allowed bg-blue-400 opacity-25" : ""} inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800`}>
                      <ButtonLoader isLoading={isLoading} text='Publish' loadingText='Updating' />
                    </button>

                  </div>
                </div>

                <div className="col-span-full xl:col-auto">
                  <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Categories</h3>
                    <div className="mb-4">
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                      <select id="category" onChange={onChange} value={category} name="category" className=" border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option key={0} value={""}>{'Select Category'}</option>
                        {allTags.map((tag, i) => (
                          <option key={i + 1} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                  <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Tags</h3>
                    {allTags.map((tag, i) => (
                      <div className="flex items-start mb-4" key={i}>
                        <div className="flex items-center h-5">
                          <input id="tags" type="checkbox" checked={checkTag(tag)} onChange={(e) => { onChange(e, i) }} name={'tags'} value={tag} className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300 
                            dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="tags" className="font-light text-gray-500 dark:text-gray-300">{tag}</label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Image</h3>
                    <div className=" mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Upload Post Image</label>
                      <input type="file" onChange={handleImage} name="image" accept="image/*" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
                                            dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" required />
                      {image ? (<>
                        <img className="img-fluid my-4" src={image} alt="Post image" />
                      </>
                      ) : (
                        <small className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="img_help">
                          Dimension: 640 * 360
                        </small>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </form>
      </Main>
  )

}

export default EditBlog