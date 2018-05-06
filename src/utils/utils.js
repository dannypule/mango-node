import parseError from 'parse-error'

// //////////////////////////////
// convert to promise
// //////////////////////////////
const toPromise = promise => {
  return promise
    .then(data => {
      return { err: null, data }
    })
    .catch(err => {
      return { err: parseError(err) }
    })
}

// //////////////////////////////
// TE stands for Throw Error
// //////////////////////////////
const TE = (errMessage, log) => {
  if (log === true) {
    console.error(errMessage)
  }

  throw new Error(errMessage)
}

// //////////////////////////////
// success web response
// //////////////////////////////
const success = (res, data, code) => {
  let sendData = { ok: true }

  if (typeof data === 'object') {
    sendData = { ...data, ...sendData } // merge the objects
  }

  res.statusCode = code || 200

  return res.json(sendData)
}

// //////////////////////////////
// fail web response
// //////////////////////////////
const fail = (res, data, code) => {
  let sendData = { ok: false }

  if (typeof data === 'object') {
    sendData = { ...data, ...sendData } // merge the objects
  }

  res.statusCode = code || 200

  return res.json(sendData)
}

// //////////////////////////////
// error web response
// //////////////////////////////
const error = (res, err, code) => {
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    err = err.message
  }

  res.statusCode = code || 400

  return res.json({ ok: false, error: err })
}

// //////////////////////////////
// This is here to handle all the uncaught promise rejections
// //////////////////////////////
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', parseError(error))
})

const utils = {
  toPromise,
  TE,
  success,
  fail,
  error,
}

export default utils
