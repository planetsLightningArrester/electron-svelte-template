import path from 'path'
import { Print, color } from 'printaeu'
import { app, type BrowserWindow, ipcMain } from 'electron'
import { type Update, getUpdates, installUpdate } from './update'
import { DateDiffServerResponse } from './types'

const logDir = app.getPath('logs')

/** Logs an info */
const info = Print.create()
info.preAppend(`[${color.green}SERV${color.reset}] [${color.cyan}INFO${color.reset}] `)
info.logToFile(path.join(logDir, 'app.log'))
/** Logs a warning */
const warn = Print.create()
warn.preAppend(`[${color.green}SERV${color.reset}] [${color.yellow}WARN${color.reset}] `)
warn.logToFile(path.join(logDir, 'app.log'))
/** Logs an error */
const err = Print.create()
err.preAppend(`[${color.green}SERV${color.reset}] [${color.red}ERROR${color.reset}] `)
err.logToFile(path.join(logDir, 'app.log'))

// ? NOTE: Unfortunately, Error messages extended from `Error` will be stripped out once sent by IPC
// ? Issue: https://github.com/electron/electron/issues/24427
// ? Docs: https://github.com/electron/electron/blob/main/docs/api/ipc-renderer.md#ipcrendererinvokechannel-args
// ? "[...] However, the Error object in the renderer process will not be the same as the one thrown in the main process."
class BasicError {
  /** The error message */
  message: string
  /** The name of the error */
  name = 'BasicError'
  constructor(message: string) {
    this.message = message
  }
}

/**
 * Starts an IPC server to communicate with the client. The
 * context bridge defining the IPC is declared inside `preload.ts`
 * @param win an Electron `BrowserWindow`
 */
export async function server(win: BrowserWindow): Promise<void> {
  // Listen to process notes requests
  ipcMain.on('diff-result', async (_, ...args) => {
    const date1Str: string | undefined = args[0]
    const date2Str: string | undefined = args[1]

    if (typeof date1Str === 'undefined' || typeof date1Str !== 'string') {
      const dateError = new BasicError(`First date '${date1Str}' is invalid`)
      err.log(dateError.message)
      win.webContents.send('diff-result', new DateDiffServerResponse(dateError, NaN))
      return
    }
    if (typeof date2Str === 'undefined' || typeof date2Str !== 'string') {
      const dateError = new BasicError(`Second date '${date2Str}' is invalid`)
      err.log(dateError.message)
      win.webContents.send('diff-result', new DateDiffServerResponse(dateError, NaN))
      return
    }

    info.log(`Got dates ${date1Str} and ${date2Str}`)
    const date1 = new Date(date1Str)
    const date2 = new Date(date2Str)
    const msPerDay = 1000 * 60 * 60 * 24
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
    const result = Math.floor((utc2 - utc1) / msPerDay)
    info.log(`Diff is ${result} days`)

    win.webContents.send('diff-result', new DateDiffServerResponse(undefined, result))
  })

  // Listen to check updates requests
  ipcMain.on('check-updates', async () => {
    win.webContents.send('update-results', await getUpdates())
  })

  // Listen to install updates requests
  ipcMain.on('proceed-with-update', async (_, ...args) => {
    try {
      const update: Update = args[0]

      await installUpdate(update)
    } catch (error: unknown) {
      err.log('Error on proceeding with the update')
      if (error instanceof Error) err.log(error.message)
      else err.log(error)
    }
  })
}
