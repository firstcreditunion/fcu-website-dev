interface IntercomSettings {
  app_id: string
  user_id?: string
  name?: string
  email?: string
  phone?: string
  created_at?: number
  user_hash?: string
  hide_default_launcher?: boolean
  custom_launcher_selector?: string
  alignment?: 'left' | 'right'
  horizontal_padding?: number
  vertical_padding?: number
  [key: string]: unknown
}

type IntercomCommand =
  | 'boot'
  | 'shutdown'
  | 'update'
  | 'hide'
  | 'show'
  | 'showMessages'
  | 'showNewMessage'
  | 'showArticle'
  | 'showSpace'
  | 'startChecklist'
  | 'trackEvent'
  | 'getVisitorId'
  | 'startTour'
  | 'startSurvey'
  | 'onHide'
  | 'onShow'
  | 'onUnreadCountChange'
  | 'onUserEmailSupplied'

interface IntercomStatic {
  (command: 'boot', settings: IntercomSettings): void
  (command: 'shutdown' | 'hide' | 'show' | 'showMessages' | 'update'): void
  (command: 'update', settings: Partial<IntercomSettings>): void
  (command: 'showNewMessage', prePopulatedContent?: string): void
  (command: 'showArticle', articleId: number): void
  (command: 'showSpace', spaceName: string): void
  (command: 'startChecklist', checklistId: number): void
  (command: 'trackEvent', eventName: string, metadata?: Record<string, unknown>): void
  (command: 'getVisitorId'): string
  (command: 'startTour', tourId: number): void
  (command: 'startSurvey', surveyId: number): void
  (command: 'onHide', callback: () => void): void
  (command: 'onShow', callback: () => void): void
  (command: 'onUnreadCountChange', callback: (count: number) => void): void
  (command: 'onUserEmailSupplied', callback: () => void): void
}

declare global {
  interface Window {
    Intercom: IntercomStatic
    intercomSettings?: IntercomSettings
  }
}

export type { IntercomSettings, IntercomCommand, IntercomStatic }
