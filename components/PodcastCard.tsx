import React from 'react'
import Image from 'next/image'
const PodcastCard = ({ id, title, description, imgURL }: { id: number, title: string, description: string, imgURL: string }) => {
  return (
    <div className='cursor-pointer'>
      <figure className='flex flex-col gap-4'>
        <Image src={imgURL} 
        alt={title} className='aspect-square h-fit w-full 2xl:size-[200px]'
        width={174}
        height={174}
        />
        <div className='flex flex-col gap-2'>
          <h1 className='text-16 truncate font-bold text-white-1'>{title}</h1>
          <h2 className='text-12 truncate font-normal text-white-1'>{description}</h2>
        </div>
      </figure>

    </div>
  )
}

export default PodcastCard