// import React, { useState } from 'react';

// function MyForm() {
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setInputValue(e.target.elements.myInput.value);
//     console.log(inputValue);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" name="myInput" />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default MyForm;








// import React, { useState } from 'react';

// function MyForm() {
//   const [inputValue, setInputValue] = useState('');

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(inputValue);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={inputValue} onChange={handleChange} />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default MyForm;







import React, { useState } from 'react';

function MyForm() {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Validate if the input contains more than 5 words
    const letters = value.trim();
    console.log(letters);
    if (letters.length > 5) {
      setErrorMessage('');
    } else {
      setErrorMessage('Input must be more than 5 words.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage) {
      console.log('Form has errors.');
    } else {
      console.log('Form submitted with input:', inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" disabled={!!errorMessage}>Submit</button>
    </form>
  );
}

export default MyForm;