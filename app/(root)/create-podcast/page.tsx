"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader, Loader2 } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})

const voiceCategories = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values)
}


const CreatePodcast = () => {
  const [voiceType, setVoiceType] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePrompt, setImagePrompt] = useState('')
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [voicePrompt, setVoicePrompt] = useState<string>('')
  const [audioDuration, setAudioDuration] = useState(0)
  const [thumbnail, setThumbnail] = useState<string>('')


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })
  return (
    <section className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex flex-col w-full">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Podcast Title</FormLabel>
                  <FormControl>
                    <Input className="input-class focus-visible:ring-orange-1" placeholder="Title of your podcast" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">Select AI Voice</Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className={cn("text-16 w-full border-none bg-black-1 text-gray-1")}>
                  <SelectValue placeholder="Select a voice"
                    className="placeholder:text-gray-1"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none font-bold text-white-1 bg-black-1 focus-visible:ring-offset-orange-1">
                  {voiceCategories.map((voice, index) => (
                    <SelectItem key={index} value={voice}>{voice}</SelectItem>
                  ))}
                </SelectContent>
                {
                  voiceType && (
                    <audio src={`/voices/${voiceType}.mp3`} autoPlay className="hidden" />
                  )
                }
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Podcast Description</FormLabel>

                  <FormControl>
                    <Textarea className="input-class focus-visible:ring-orange-1" placeholder="Write a short description about the podcast" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />

                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast 
            setAudioStorageId={setAudioStorageId}
            setAudio={setAudioUrl}
            voiceType={voiceType}
            audio={audioUrl}
            voicePrompt ={voicePrompt}
            setVoicePrompt={setVoicePrompt}
            setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail />

            <div className="mt-10 w-full">
              <Button type="submit" className="text-16 font-extrabold transition-all duration-300 text-white-1 bg-orange-1 w-full hover:bg-black-1">
                {isSubmitting ? (<><Loader className="w-4 h-4 mr-2 animate-spin" /> 'Generating...'</>) : ('Submit & Publish Podcast')}
              </Button>
            </div>
          </div>
        </form>

      </Form>


    </section>
  )
}

export default CreatePodcast