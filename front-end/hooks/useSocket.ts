"use client"

import { ChatMessages } from "@/types"
import { useEffect, useRef, useState } from "react"

interface SocketType {
    connected: boolean;
    messages: ChatMessages[];
    sendMessage: (message: ChatMessages) => void;
}

export default function useSocket(url: string): SocketType | void {
    const [connected, setConnected] = useState<boolean>(false)
    const [messages, setMessages] = useState<ChatMessages[]>([])
    const socketRef = useRef<WebSocket | null>(null)

    const env = process.env.NODE_ENV
    const devUrl = process.env.NEXT_PUBLIC_WS_DEV_URL

    if (env && env === "development" && devUrl) url = devUrl

    if (url === "") {
        console.log("socket url missing")
        return;
    }
    useEffect(()=> {
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = ()=> {
            console.log("connected")
            setConnected(true)
        }
        socket.onclose = () => {
            console.log("connection closed")
            setConnected(false)
        }
        socket.onerror = (error: Event) => {
            console.error(error)
        }
        socket.onmessage = (event: MessageEvent) => {
            const message: ChatMessages = JSON.parse(event.data)
            setMessages((prev)=> [...prev, message])
        }
        return ()=> {
            socket.close()
        }
    },[url])

    const sendMessage = (message: ChatMessages) => {
        if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN 
        ) {
            socketRef.current.send(JSON.stringify(message))
        }
    }
    
    return {
        connected,
        messages,
        sendMessage
    }

}