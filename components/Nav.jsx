import React from 'react'
import Image from 'next/image'
export default function Nav() {
  return (
    <div className='w-full flex text-white bg-zinc-700 absolute m-0 p-5 left-0'>
        <Image
            src="/icon.png"
            width={35}
            height={35}
            alt=" "
            className='mr-5'
        />
        <p className='text-2xl font-bold'>Luan yurrr</p>
    </div>
  )
}
