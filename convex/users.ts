import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
export const createUser = internalMutation({
    args: {
        email: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("users", args);
    }
})