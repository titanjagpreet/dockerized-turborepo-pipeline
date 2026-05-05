import { WebSocketServer } from "ws"
import { prisma } from "@repo/prisma/client"

const port = Number(process.env.PORT ?? 3003);

const server = new WebSocketServer({
    port
});

server.on("connection", async (socket) => {
    try {
        await prisma.user.create({
            data: {
                username: Math.random().toString(),
                password: Math.random().toString()
            }
        });

        socket.send("hi there you are connnected to websocket server");
    } catch (error) {
        console.error("Failed to handle websocket connection", error);
        socket.close(1011, "Internal server error");
    }
})

server.on("listening", () => {
    console.log(`ws-server listening on port ${port}`);
})

server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Set PORT to another value or stop the existing process.`);
        process.exit(1);
    }

    throw error;
})
