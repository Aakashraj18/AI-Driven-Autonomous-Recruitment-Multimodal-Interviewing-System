import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import config from "../config/env";

/**
 * Initializes the Socket.io server for real-time interview communication.
 *
 * Events (to be implemented in Step 6):
 * - `interview:start`    — Client begins an interview session
 * - `interview:answer`   — Client sends a transcribed answer
 * - `interview:evaluate` — Server evaluates the answer and streams feedback
 * - `interview:end`      — Client or server ends the session
 */
export const initializeSocketServer = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: config.clientUrl,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });

    // TODO: Implement interview event handlers in Step 6
  });

  console.log("🔌 Socket.io server initialized");
  return io;
};
