import { useEffect, useState } from 'react'

const useReactHash = () => {
  const [hash, setHash] = useState(window.location.hash)
  const listenToHash = () => {
    const winHash = window.location.hash
    setHash(winHash)
  }
  useEffect(() => {
    window.addEventListener('hashchange', listenToHash)
    return () => {
      window.removeEventListener('hashchange', listenToHash)
    }
  }, [])
  return hash
}

export default useReactHash
