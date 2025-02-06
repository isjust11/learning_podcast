"use client";

import PodcastCard from '@/components/PodcastCard'
import { podcastData } from '@/constants'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react'

const Home = () => {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-9'>
        <h1 className='text-4xl font-bold text-white-1'>
          Trending Podcasts
        </h1>
        {tasks?.map(({ _id, text }) => <div key={_id} className='text-white-1 text-14 font-medium'>{text}</div>)}
        <div className="podcast_grid">
          {
            podcastData.map((podcast) => (
              <PodcastCard key={podcast.id} {...podcast} />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Home