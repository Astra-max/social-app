interface Props {
    urlType: string;
    urlUsage?: string;
}

interface Config {
    sockectUrl?: string;
    baseUrl?: string;
}

export default function loadEnvFile(urlProperties: Props): Config {
    const config: Config = {}
    const env = process.env.NODE_ENV

    switch (urlProperties.urlType) {
        case "socket-url":
            switch (urlProperties.urlUsage) {
                case "chat":
                    if (
                        env && env === "development"
                    ) {
                        const dev = process.env.NEXT_PUBLIC_WS_DEV_CHAT_URL ?? "ws://localhost:8080/ws/chat"
                        config.sockectUrl = dev
                    }
                    break;
                case "group":
                    if (
                        env && env === "development"
                    ) {
                        const dev = process.env.NEXT_PUBLIC_WS_DEV_GROUP_URL ?? "ws://localhost:8080/ws/group"
                        config.sockectUrl = dev
                    }
                    break;
                case "notifications":
                    if (
                        env && env === "development"
                    ) {
                        const dev = process.env.NEXT_PUBLIC_WS_DEV_NOTIFICATION_URL ?? "ws://localhost:8080/ws/notifications"
                        config.sockectUrl = dev
                    }
                    break;
                default:
                    console.log("provide url usage type")
                    break;
            }
            break;
        case "baseUrl":
            if (
                env && env === "development"
            ) {
                const dev = process.env.NEXT_PUBLIC_DEV_BASE_URL ?? "http://localhost:8080"
                config.baseUrl = dev
            }
            break;
        default:
            console.log("missing url type [usage: socket-url] [usage: base-url]")
            break;
    }
    return config
}
