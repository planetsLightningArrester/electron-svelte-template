/** The output result to send to the client */
export class DateDiffServerResponse {
  /** Error, if any */
  error: Error | undefined
  /** The diff between the dates sent to the server */
  result: number

  constructor(error: Error | undefined, result: number) {
    this.error = error
    this.result = result
  }
}
