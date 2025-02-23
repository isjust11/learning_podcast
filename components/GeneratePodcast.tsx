import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction } from 'convex/react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid'
import { useUploadFiles } from '@xixixao/uploadstuff/react'

const useGeneratePodcast = ({
  setAudio, voiceType,voicePrompt, setAudioStorageId
}: GeneratePodcastProps) => {
  // logic to generate podcast
  const [isGenerating, setIsGenerating] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const {startUpload} = useUploadFiles(generateUploadUrl)
  const getPodcastAudio = useAction(api.openai.generateAudioAction)

  const getAudioUrl = useMutation(api.podcast.getUrl);
  const generatePodcast = async () => {
    setIsGenerating(true)
    setAudio('')
    if(!voicePrompt) {
      //todo: show error message
      return setIsGenerating(false)
    }
    try{
      const response = await getPodcastAudio({input: voicePrompt, voice: voiceType})
      
      const blob = new Blob([response], {type: 'audio/mpeg'})
      const fileName =`podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, {type: 'audio/mpeg'})
      // const audioStorageId = await storage.upload(fileName, file)
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl(storageId)
      setAudio(audioUrl);
      setIsGenerating(false);
      //todo: show success message
      
    }catch(error){
      console.log('Error generating podcast', error)
    }finally{
      setIsGenerating(false)
    }
  }
  return {
    isGenerating,
    generatePodcast
  }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props)
  return (
    <div>
      <div className='flex flex-col gap-2.5'>
        <Label className='text-16 font-bold text-white-1'>AI prompt to generate podcast</Label>
        <Textarea
          className='input-class focus-visible:ring-orange-1'
          placeholder='Write a short description about the podcast'
          value={props.voicePrompt}
          rows={5}
          onChange={(e: any) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className='mt-5 w-full max-w-[200px]'>
        <Button type="submit" className="text-16 font-bold text-white-1 bg-orange-1">
          {isGenerating ? (<><Loader className="w-4 h-4 mr-2 animate-spin" /> 'Generating...'</>) : ('Generate Podcast')}
        </Button>
      </div>
      {
        props.audio && (
          <div className='mt-5'>
            <audio src={props.audio} controls autoPlay className='mt-5' onLoadedData={(e) => props.setAudioDuration(e.currentTarget.duration)} />
          </div>
        )
      }
    </div>
  )
}

export default GeneratePodcast