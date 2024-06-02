import React, { useState } from 'react';
import './dashboard.css';

function BookInfo({show, bookItem, onClose}) {

  if(!show){
    return null;
  }

  let thumbnail = bookItem.volumeInfo.imageLinks && bookItem.volumeInfo.imageLinks.smallThumbnail;
  
  return (
    <>
       <div id="overlay">
                <div id="overlay-inner">
                    <button id="close" onClick={onClose}><i class="fas fa-times"></i></button>
                    <div id="inner-box">
                        <img src={thumbnail} alt="book image" />
                        <div id="info">
                            <h3>{bookItem.volumeInfo.title}</h3>
                            <h4>{bookItem.volumeInfo.authors}</h4>
                            <h5>{bookItem.volumeInfo.publisher}<p>{bookItem.volumeInfo.publishedDate}</p></h5><br/>
                            <a href={bookItem.volumeInfo.previewLink} target='_blank'><button>More</button></a>
                        </div>
                    </div>
                    <h4 id="description">{bookItem.volumeInfo.description}</h4>
                </div>
            </div>
    </>
  )
}

export default BookInfo;