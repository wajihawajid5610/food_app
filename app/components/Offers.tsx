import Image from 'next/image'
import CountDown from './CountDown'


const Offers = () => {
  return (
    <div className="bg-black text-white h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh] ">
      
      <div className='flex-1 flex flex-col justify-center items-center text-center gap-8 p-4'>
        <h1 className='text-5xl font-bold md:text-6xl'>Delicious Burger & French Fry </h1>
        <p className='xl:text-xl'>Progressively simply effctive e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <CountDown/>
        <button className='bg-red-500 rounded-md py-3 px-6'>Order Now</button>
      </div>
      <div className='relative flex-1 w-full md:h-full'>
        <Image src="/offerProduct.png" alt='' fill className='object-contain'/>
      </div>
    </div>
  )
}

export default Offers
