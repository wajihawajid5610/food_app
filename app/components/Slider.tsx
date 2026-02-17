"use client"
import Image from 'next/image'
import  { useEffect, useState } from 'react'

const Slider = () => {
    const data= [
        {
            id:1,
            title:"always fresh & always crispy & always hot",
            image: "/slide1.png",
        },
        {
            id:2,
            title: "we deliever your order wherever you are in NY",
            image: "/slide2.png",
        },
        {
            id:3,
            title: "the best pizza a share with your family",
            image: "/slide3.jpg",
        },
    ];

    const [currentSlide , setCurrentSlide] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentSlide((prev)=>(prev === data.length-1 ? 0 : prev+1));
        }, 3000);
        return()=> clearInterval(interval); 
    },[]);

  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50'>
 
            <div className='h-1/2 flex flex-col gap-8 flex-1 text-red-500 font-bold items-center justify-center lg:h-full lg:w-1/2'>
                    <h1 className='text-4xl text-center uppercase p-4 md:p-10 md:text-5xl xl:text-7xl'>
                        {data[currentSlide].title}
                    </h1>
                    <button className='text-white bg-red-500 py-4 mb-8 px-8'>Order now</button>
        </div>

        <div className='h-1/2 relative lg:h-full lg:w-1/2 flex-1'>
            <Image src={data[currentSlide].image} alt='slide1' fill className='object-cover'/>
        </div>

    </div>
  )
}

export default Slider
