"use client"

import { ChatMessages } from "@/types"
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react"

export interface SocketType {
    connected: boolean;
    messages: ChatMessages[];
    sendMessage: (message: ChatMessages) => void;
}

export default function useSocket(url: string, userId: string): SocketType {
    const [connected, setConnected] = useState<boolean>(false)
    const [messages, setMessages] = useState<ChatMessages[]>([])
    const socketRef = useRef<WebSocket | null>(null)

    useEffect(()=> {
        const socket = new WebSocket(`${url}?userId=${userId}`);
        socketRef.current = socket;

        socket.onopen = ()=> {
            console.log("connected")
            setConnected(true)
        }
        socket.onclose = () => {
            console.log("connection closed")
            setConnected(false)
        }
        socket.onerror = (err: Event) => {
            console.log(err)
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
            setMessages((prev) => [...prev, message])
            socketRef.current.send(JSON.stringify(message))
        }
    }
    
    return {
        connected,
        messages,
        sendMessage
    }

}