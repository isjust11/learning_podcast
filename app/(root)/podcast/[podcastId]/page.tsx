import React from 'react'

const PodcastDetails = ({params}: {params: {podcastId: string}}) => {
  return (
    <div className='text-white-1'>
        <h1 className='text-white-1 text-20 font-bold'>PodcastDetails for {params.podcastId}</h1>
        <p className='text-white-1 text-14 font-medium'>
            Explore the latest podcasts and episodes from the world of learning.
        </p>
    </div>
  )
}

export default PodcastDetails