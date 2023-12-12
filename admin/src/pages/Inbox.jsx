import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import { useDispatch, useSelector } from 'react-redux';
import { fetch, reset } from '../features/mail/mailSlice';
import FullLoader from '../components/FullLoader';
import { Accordion } from 'flowbite-react';
import { toast } from 'react-toastify';
import Breadcrumb from '../components/Breadcrumb';
import moment from 'moment';

const Inbox = () => {
  const [mails, setMails] = useState([])
  const dispatch = useDispatch();
  const { data, isFullLoading, isError, isSuccess, message } = useSelector((state) => state.mail)

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && data && data != null) {
      if(Array.isArray(data)){
        setMails([...data].reverse())  //or a slice call data.slice().reverse()
      }
    }

    dispatch(reset())
  }, [data, isError, isSuccess, message, dispatch])

  useEffect(() => {
    dispatch(fetch())
  }, []);

  if (isFullLoading) {
    return <FullLoader />
  }

  return (
    <Main>
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb label={'Mail'} label2={'Inbox'} />
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Mail Inbox</h1>
      </div>
      <div className='lg:pt-4'>
      {mails.length > 0 && (
        <Accordion collapseAll>
        {mails.map((mail, i) => (
          <Accordion.Panel key={i}>
            <Accordion.Title>
              {moment(mail.updatedAt).format('ddd Do MMMM, YYYY. hh:mm') + ' - ' + mail.firstName + ' ' + mail.lastName + ' - ' + mail.subject}
            </Accordion.Title>
            <Accordion.Content>
              <div className="mb-2 text-gray-900 dark:text-white"> 
              <p> <span className='font-bold'>Email: </span> {mail.email}</p>
              <p> <span className='font-bold'>Phone No: </span>{mail.phoneNo}</p> <br />
              <p>{mail.message}</p>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
      )}     
      </div> 
        
    </Main>
  )
}

export default Inbox