/* global require process Buffer */
const SMTPServer = require('smtp-server').SMTPServer
const AWS = require('aws-sdk')

const port = process.env.PORT || 25
const host = process.env.HOST || '127.0.0.1'

const SES = new AWS.SES()
const server = new SMTPServer({
  authOptional: true,

  async onData(stream, session, callback) {
    try {
      var params = {
        Destinations: session.envelope.rcptTo.map(x => x.address),
        FromArn: process.env.FROM_ARN,
        RawMessage: {
          Data: await readStream(stream)
        }
      }
      console.log({ message: 'Sending email', Destinations: params.Destinations })
      await SES.sendRawEmail(params).promise()
      callback(null, 'Message sent')
    } catch (e) {
      console.log({ message: 'Failed to send email', error: e })
      callback(e)
    }
  }
})

server.listen(port, host, () => console.log({ message: 'Server listening', host, port }))

function readStream(stream) {
  return new Promise(resolve => {
    var bufs = [];
    stream.on('data', buf => bufs.push(buf))
    stream.on('end', () => resolve(Buffer.concat(bufs)))
  })
}
