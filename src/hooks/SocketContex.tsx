import { createContext, useContext, useEffect, useState } from 'react'
import { type Socket, io } from 'socket.io-client'

import { getLocalStorage } from '../utils/Auth'
import { BASE_SOCKET_URL } from '../configs'

const SocketContext = createContext<Socket|null>(null)

export const useSocket = () => useContext(SocketContext)

interface SocketProviderProps {
  children: JSX.Element
}

export default function SocketProvider (props: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect((): any => {
    const token = getLocalStorage("token")
    if (token) {
      const newSocket = io(BASE_SOCKET_URL , {
        withCredentials: true,
        extraHeaders: {
                  "Authorization": "Bearer " + token 
              }
      })
      newSocket.on('connect', () => {
        console.log('Connected to the server!');
      })
  
      setSocket(newSocket)
  
      return () => newSocket.disconnect()
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}
