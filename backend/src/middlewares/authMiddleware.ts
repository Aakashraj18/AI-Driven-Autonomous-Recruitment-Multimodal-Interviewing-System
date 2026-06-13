import { clerkMiddleware, requireAuth } from "@clerk/express";

/**
 * Clerk session middleware — attaches auth context to every request.
 * Apply this globally in the Express app setup.
 */
export const clerkSessionMiddleware = clerkMiddleware();

/**
 * Route-level guard — rejects unauthenticated requests with a 401.
 * Apply this to any route or router that requires a signed-in user.
 */
export const requireAuthentication = requireAuth();
