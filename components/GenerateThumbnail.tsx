import React, { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'

interface GenerateThumbnailProps {
  setImage: (image: string) => void
  setImageStorageId: (id: string | null) => void
  image: string
  imagePrompt: string
  setImagePrompt: (prompt: string) => void
}

const GenerateThumbnail = ({setImage, setImageStorageId, image, imagePrompt, setImagePrompt}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateThumbnail = async () => {
    setIsGenerating(true)
    // const response = await getPodcastAudio({input: imagePrompt, voice: voiceType})
  }
  return (
    <>
      <div className='generate_thumbnail'>
        <Button
          type='button'
          variant={'plain'}
          className={cn('', {
            'bg-black-6': isAiThumbnail
          })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type='button'
          variant={'plain'}
          className={cn('', {
            'bg-black-6': !isAiThumbnail
          })}
        >
          Upload custom image
        </Button>
      </div>
      {
        isAiThumbnail ? (
          <div>
            <div className='flex flex-col gap-2.5'>
              <Label className='text-16 font-bold text-white-1'>AI prompt to generate podcast</Label>
              <Textarea
                className='input-class focus-visible:ring-orange-1'
                placeholder='Write a short description about the podcast'
                value={imagePrompt}
                rows={5}
                onChange={(e: any) => setImagePrompt(e.target.value)}
              />
            </div>
            <div className='mt-5 w-full max-w-[200px]'>
              <Button type="submit" className="text-16 font-bold text-white-1 bg-orange-1" onClick={generateThumbnail}>
                {isGenerating ? (<><Loader className="w-4 h-4 mr-2 animate-spin" /> Generating...</>) : ('Generate Podcast')}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Label className='text-16 font-bold text-white-1'>Upload custom image</Label>
            <Input type='file' accept='image/*' onChange={(e: any) => setImage(e.target.files[0])} />
          </div>
        )
      }
    </>
  )
}

export default GenerateThumbnail