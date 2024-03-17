/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="svelte" />
/// <reference types="vite/client" />

/** The info about the new update */
interface Update {
  /** The update version */
  version: string
  /** The update file name */
  name: string
  /** The update URL */
  url: string
}

interface Window {
  api: {
    /**
     * Send a request to the server to diff two dates
     * @param date1 a date formatted as `yyyy-MM-dd` to diff
     * @param date2 a date formatted as `yyyy-MM-dd` to diff
     */
    sendDatesToServer: (date1: string, date2: string) => Promise<DateDiffServerResponse>
    /**
     * Check if there are updates
     * @returns a `Promise` that resolves to the name of the file
     * if there are updates, otherwise resolves to an empty string
     */
    checkUpdates: () => Promise<Update | undefined>
    /**
     * Send a request to the server to proceed with the app update
     * @param the update to install
     */
    proceedWithUpdate: (update: Update) => void
  }
}

/** The output result sent from server */
interface DateDiffServerResponse {
  /** Error, if any */
  error: Error | undefined
  /** The diff between the dates sent to the server */
  result: number
}
