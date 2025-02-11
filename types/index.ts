import { Id } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction } from "react";

export interface GeneratePodcastProps {
    voiceType: string;
    setAudio: Dispatch<SetStateAction<string>>;
    audio: string;
    setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    voicePrompt: string;
    setVoicePrompt: Dispatch<SetStateAction<string>>;
    setAudioDuration: Dispatch<SetStateAction<number>>;
  }