import { type Update } from './update'
import { ipcRenderer, contextBridge } from 'electron'
import { type DateDiffServerResponse } from './types'

window.addEventListener('DOMContentLoaded', () => {
  // Update the version in the Window
  for (const type of ['chrome', 'node', 'electron']) {
    const version = process.versions[type]
    if (typeof version !== 'undefined') {
      const element = document.getElementById(`${type}-version`)
      if (element !== null) element.innerText = version
    }
  }
})

/** Context bridge. Map the IPC communication between the client and the server */
contextBridge.exposeInMainWorld('api', {
  /**
   * Send a request to the server to diff dates
   * @param date1 the first date
   * @param date2 the second date
   */
  sendDatesToServer: async (date1: string, date2: string): Promise<DateDiffServerResponse> => {
    // TODO: type check if the incoming data is as expected
    ipcRenderer.send('diff-result', date1, date2)
    return await new Promise<DateDiffServerResponse>(resolve => {
      ipcRenderer.on('diff-result', (_, ...args) => {
        const processNotesResults: DateDiffServerResponse = args[0]
        resolve(processNotesResults)
      })
    })
  },
  /** Send a request to the server to proceed with the app update */
  checkUpdates: async (): Promise<Update | undefined> => {
    ipcRenderer.send('check-updates')
    return await new Promise<Update | undefined>(resolve => {
      ipcRenderer.on('update-results', (_, ...args) => {
        const update: Update | undefined = args[0]
        resolve(update)
      })
    })
  },
  /**
   * Send a request to the server to proceed with the app update
   * @param the update to install
   */
  proceedWithUpdate: (update: Update): void => {
    ipcRenderer.send('proceed-with-update', update)
  }
})
