import {useLocation} from 'react-router-dom'
import ViewDetail from '../../components/Book/ViewDetail';
import { useState, useEffect  } from 'react';
import { fetchBookById } from '../../services/api';

const BookPage = () => {

  


    
    // console.log(dataBook);

    return (
        <>
            <ViewDetail
            // dataBook = {dataBook}
            />
        </>
    )
}

export default BookPage;