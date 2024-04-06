import React, { lazy, Suspense } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactLoading from "react-loading";
import 'bootstrap/dist/css/bootstrap.min.css';

const Tables = lazy(() => wait(500).then(()=> import('./Components/Tables')));

function App() {
  const handleToast = () => {
    toast.success('Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce, 
    });
    toast.warning('Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce, 
    });
    toast.error('Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce, 
    });
  }
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
       <BrowserRouter>
        <Suspense fallback={ 
        <div className="flex justify-center items-center h-screen">
          <ReactLoading type="spinningBubbles" color="#0000FF" />
        </div>
        }>
          <Routes>   
              <Route path='/' element={<Tables/>}/>        
          </Routes>
        </Suspense>
      </BrowserRouter>
      
    </>   
  );
}

export default App;



function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
