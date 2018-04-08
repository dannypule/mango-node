import parseError from 'parse-error'

const toPromise = promise => {
  return promise
    .then(data => {
      return { err: null, data }
    })
    .catch(err => {
      return { err: parseError(err) }
    })
}

const TE = (errMessage, log) => {
  // TE stands for Throw Error
  if (log === true) {
    console.error(errMessage)
  }

  throw new Error(errMessage)
}

const success = (res, data, code) => {
  // Success Web Response
  let sendData = { ok: true }

  if (typeof data === 'object') {
    sendData = Object.assign(data, sendData) // merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code

  return res.json(sendData)
}

const error = (res, err, code) => {
  // Error Web Response
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    err = err.message
  }

  if (typeof code !== 'undefined') res.statusCode = code
  return res.json({ ok: false, error: err })
}

// This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', parseError(error))
})

const utils = {
  toPromise,
  TE,
  success,
  error,
}

export default utils
