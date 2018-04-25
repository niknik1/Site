export function host () {
  let rootPath

  if (NODE_ENV === 'production') {
    rootPath = 'http://restapi.fintegro.com'
  } else {
    rootPath = 'http://restschool.local'
  }

  return rootPath
}
