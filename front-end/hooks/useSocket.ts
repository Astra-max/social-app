"use client"

import { useEffect, useRef, useState } from "react"

export default function useSocket() {
    const [connected, setConnected] = useState<boolean>(false)
    const socketRef = useRef<WebSocket | null>(null)

    const env = process.env.NODE_ENV
    const devUrl = process.env.WS_DEV_URL
    let url = ""
    if (env && env === "development" && devUrl) url = devUrl

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
    })
}