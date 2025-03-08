import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'
import { Input } from './ui/input'
import Image from 'next/image'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useMutation } from 'convex/react'
interface GenerateThumbnailProps {
  setImage: (image: string) => void
  setImageStorageId: (id: string | null) => void
  image: string
  imagePrompt: string
  setImagePrompt: (prompt: string) => void
}

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const imageRef = useRef<HTMLInputElement>(null)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.podcast.getUrl);
  const generateThumbnail = async () => {
    setIsImageLoading(true)
    // const response = await getPodcastAudio({input: imagePrompt, voice: voiceType})
  }

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true)
    setImage('')

    try {
      const file = new File([blob], fileName, { type: 'image/png' })
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setImageStorageId(storageId);
      const imageUrl = await getImageUrl({ storageId })
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.log(error)
      toast.error('Error uploading image')
    } finally {
      setIsImageLoading(false)
    }
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0];
    if (!file) {
      toast.error('No file selected')
      return
    }
    try {
      const blob = await file.arrayBuffer()
        .then((blob: any) => new Blob([blob], { type: 'image/png' }));
      handleImage(blob, file.name)
    } catch (error) {
      console.log(error)
      toast.error('Error uploading image')
    } finally {
      setIsImageLoading(false)
    }
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
                {isImageLoading ? (<><Loader className="w-4 h-4 mr-2 animate-spin" /> Generating...</>) : ('Generate Podcast')}
              </Button>
            </div>
          </div>
        ) : (
          <div >
            <div className="image_div" onClick={() => imageRef.current?.click()}>
              <Input type='file' className='hidden' ref={imageRef} onChange={(e: any) => uploadImage(e)} />
              {

                !isImageLoading ? (
                  <Image src='icons/upload-image.svg' alt='thumbnail' width={40} height={40} />
                ) : (
                  <div className='text-16 flex-center font-medium text-white-1'>
                    Upload image
                    <Loader size={20} className='ml-2 animate-spin' />
                  </div>
                )
              }
              <div className="flex flex-col items-center gap-1">
                <h2 className='text-16 font-medium text-white-1'>Click to upload image</h2>
                <p className='text-14 text-white-2'>SVG, PNG, JPG, or GIF (max. 10MB)</p>
              </div>

            </div>
            <div className="image_container mt-4">
              {
                image && (
                  <div className='flex-center full-width'>
                    <Image src={image} alt='thumbnail' width={180} height={140} />
                  </div>
                )
              }
            </div>
          </div>
        )

      }
    </>
  )
}

export default GenerateThumbnail