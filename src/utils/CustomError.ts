type TErrorMessageProps = { ec: number; msg: string }

export default class CustomError extends Error {
  ec: number

  msg: string

  constructor(props: TErrorMessageProps) {
    const { ec, msg } = props
    super(msg)
    this.ec = ec
    this.msg = msg
  }
}
