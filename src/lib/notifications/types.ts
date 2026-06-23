export type LeadData = {
  name: string
  contact: string
  project: string
  budget?: string
}

export type ChatTranscriptMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type ChatTranscript = {
  sessionId: string
  locale: 'en' | 'sv'
  startedAt: string
  messages: ChatTranscriptMessage[]
}
