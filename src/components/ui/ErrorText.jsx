import React from 'react';

function ErrorText({ children }) {
  return (
    <h1 className='text-red-400'>{children}</h1>
  )
}

export default ErrorText;