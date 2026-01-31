(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__fa5b56cb._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/xata.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "XataClient": (()=>XataClient),
    "getXataClient": (()=>getXataClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xata$2e$io$2f$client$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xata.io/client/dist/index.mjs [middleware-edge] (ecmascript)");
;
const DatabaseClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xata$2e$io$2f$client$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["buildClient"])();
const defaultOptions = {
    databaseURL: "https://Arpreet-Mahala-s-workspace-sm4oj2.eu-central-1.xata.sh/db/arp-SnapCast:main",
    apiKey: process.env.XATA_API_KEY,
    branch: "main"
};
class XataClient extends DatabaseClient {
    constructor(options){
        super({
            ...defaultOptions,
            ...options
        });
    }
}
let instance = undefined;
const getXataClient = ()=>{
    if (instance) return instance;
    instance = new XataClient();
    return instance;
};
}}),
"[project]/drizzle/db.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$xata$2d$http$2f$driver$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/xata-http/driver.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$xata$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/xata.ts [middleware-edge] (ecmascript)");
;
;
const xata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$xata$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getXataClient"])();
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$xata$2d$http$2f$driver$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["drizzle"])(xata);
}}),
"[project]/drizzle/schema.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "account": (()=>account),
    "schema": (()=>schema),
    "session": (()=>session),
    "user": (()=>user),
    "verification": (()=>verification),
    "videos": (()=>videos)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/uuid.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [middleware-edge] (ecmascript)");
;
const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])("user", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("email").notNull().unique(),
    emailVerified: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["boolean"])("email_verified").notNull(),
    image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("image"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull()
});
const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])("session", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("expires_at").notNull(),
    token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("token").notNull().unique(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull(),
    ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("ip_address"),
    userAgent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("user_agent"),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("user_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    })
});
const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])("account", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    accountId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("account_id").notNull(),
    providerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("provider_id").notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("user_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    }),
    accessToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("access_token"),
    refreshToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("refresh_token"),
    idToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("id_token"),
    accessTokenExpiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("access_token_expires_at"),
    refreshTokenExpiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("refresh_token_expires_at"),
    scope: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("scope"),
    password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("password"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull()
});
const verification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])("verification", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    identifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("identifier").notNull(),
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("value").notNull(),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("expires_at").notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("created_at"),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("updated_at")
});
const videos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])("videos", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["uuid"])("id").primaryKey().defaultRandom().unique(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("title").notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    videoUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("video_url").notNull(),
    videoId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("video_id").notNull(),
    thumbnailUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("thumbnail_url").notNull(),
    visibility: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("visibility").$type().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["text"])("user_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    }),
    views: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["integer"])("views").notNull().default(0),
    duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["integer"])("duration"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
});
const schema = {
    user,
    session,
    account,
    verification
};
}}),
"[project]/lib/auth.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "auth": (()=>auth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/drizzle/db.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$schema$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/drizzle/schema.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/index.mjs [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/index.mjs [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$adapters$2f$drizzle$2d$adapter$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/adapters/drizzle-adapter/index.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$integrations$2f$next$2d$js$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/integrations/next-js.mjs [middleware-edge] (ecmascript)");
;
;
;
;
;
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["betterAuth"])({
    database: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$adapters$2f$drizzle$2d$adapter$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["drizzleAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"], {
        provider: "pg",
        schema: __TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$schema$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["schema"]
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    },
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$integrations$2f$next$2d$js$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["nextCookies"])()
    ],
    baseURL: ("TURBOPACK compile-time value", "http://localhost:3000")
});
}}),
"[project]/constants/index.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BUNNY": (()=>BUNNY),
    "DEFAULT_RECORDING_CONFIG": (()=>DEFAULT_RECORDING_CONFIG),
    "DEFAULT_VIDEO_CONFIG": (()=>DEFAULT_VIDEO_CONFIG),
    "ICONS": (()=>ICONS),
    "MAX_THUMBNAIL_SIZE": (()=>MAX_THUMBNAIL_SIZE),
    "MAX_VIDEO_SIZE": (()=>MAX_VIDEO_SIZE),
    "emojis": (()=>emojis),
    "filterOptions": (()=>filterOptions),
    "infos": (()=>infos),
    "initialVideoState": (()=>initialVideoState),
    "visibilities": (()=>visibilities)
});
const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;
const BUNNY = {
    STREAM_BASE_URL: "https://video.bunnycdn.com/library",
    STORAGE_BASE_URL: "storage.bunnycdn.com/arpsnapcast",
    CDN_URL: "https://arp-snap-cast.b-cdn.net",
    EMBED_URL: "https://iframe.mediadelivery.net/embed",
    TRANSCRIPT_URL: "vz-8e236ac9-5ee.b-cdn.net"
};
const emojis = [
    "😂",
    "😍",
    "👍"
];
const filterOptions = [
    "Most Viewed",
    "Most Recent",
    "Oldest First",
    "Least Viewed"
];
const visibilities = [
    "public",
    "private"
];
const ICONS = {
    record: "/assets/icons/record.svg",
    close: "/assets/icons/close.svg",
    upload: "/assets/icons/upload.svg"
};
const initialVideoState = {
    isLoaded: false,
    hasIncrementedView: false,
    isProcessing: true,
    processingProgress: 0
};
const infos = [
    "transcript",
    "metadata"
];
const DEFAULT_VIDEO_CONFIG = {
    width: {
        ideal: 1920
    },
    height: {
        ideal: 1080
    },
    frameRate: {
        ideal: 30
    }
};
const DEFAULT_RECORDING_CONFIG = {
    mimeType: "video/webm;codecs=vp9,opus",
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000
};
}}),
"[project]/lib/utils.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiFetch": (()=>apiFetch),
    "calculateRecordingDuration": (()=>calculateRecordingDuration),
    "cleanupRecording": (()=>cleanupRecording),
    "cn": (()=>cn),
    "createAudioMixer": (()=>createAudioMixer),
    "createIframeLink": (()=>createIframeLink),
    "createRecordingBlob": (()=>createRecordingBlob),
    "daysAgo": (()=>daysAgo),
    "doesTitleMatch": (()=>doesTitleMatch),
    "generatePagination": (()=>generatePagination),
    "getEnv": (()=>getEnv),
    "getMediaStreams": (()=>getMediaStreams),
    "getOrderByClause": (()=>getOrderByClause),
    "getVideoDuration": (()=>getVideoDuration),
    "parseTranscript": (()=>parseTranscript),
    "setupMediaRecorder": (()=>setupMediaRecorder),
    "setupRecording": (()=>setupRecording),
    "updateURLParams": (()=>updateURLParams),
    "withErrorHandling": (()=>withErrorHandling)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$schema$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/drizzle/schema.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/index.ts [middleware-edge] (ecmascript)");
;
;
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const updateURLParams = (currentParams, updates, basePath = "/")=>{
    const params = new URLSearchParams(currentParams.toString());
    // Process each parameter update
    Object.entries(updates).forEach(([name, value])=>{
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
    });
    return `${basePath}?${params.toString()}`;
};
const getEnv = (key)=>{
    const value = process.env[key];
    if (!value) throw new Error(`Missing required env: ${key}`);
    return value;
};
const apiFetch = async (url, options)=>{
    const { method = "GET", headers = {}, body, expectJson = true, bunnyType } = options;
    const key = getEnv(bunnyType === "stream" ? "BUNNY_STREAM_ACCESS_KEY" : "BUNNY_STORAGE_ACCESS_KEY");
    const requestHeaders = {
        ...headers,
        AccessKey: key,
        ...bunnyType === "stream" && {
            accept: "application/json",
            ...body && {
                "content-type": "application/json"
            }
        }
    };
    const requestOptions = {
        method,
        headers: requestHeaders,
        ...body && {
            body: JSON.stringify(body)
        }
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        throw new Error(`API error ${response.text()}`);
    }
    if (method === "DELETE" || !expectJson) {
        return true;
    }
    return await response.json();
};
const withErrorHandling = (fn)=>{
    return async (...args)=>{
        try {
            const result = await fn(...args);
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            return errorMessage;
        }
    };
};
const getOrderByClause = (filter)=>{
    switch(filter){
        case "Most Viewed":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$schema$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["videos"].views} DESC`;
        case "Least Viewed":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$schema$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["videos"].views} ASC`;
        case "Oldest First":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$schema$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["videos"].createdAt} ASC`;
        case "Most Recent":
        default:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$drizzle$2f$schema$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["videos"].createdAt} DESC`;
    }
};
const generatePagination = (currentPage, totalPages)=>{
    if (totalPages <= 7) {
        return Array.from({
            length: totalPages
        }, (_, i)=>i + 1);
    }
    if (currentPage <= 3) {
        return [
            1,
            2,
            3,
            4,
            5,
            "...",
            totalPages
        ];
    }
    if (currentPage >= totalPages - 2) {
        return [
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
        ];
    }
    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
    ];
};
const getMediaStreams = async (withMic)=>{
    const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DEFAULT_VIDEO_CONFIG"],
        audio: true
    });
    const hasDisplayAudio = displayStream.getAudioTracks().length > 0;
    let micStream = null;
    if (withMic) {
        micStream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
        micStream.getAudioTracks().forEach((track)=>track.enabled = true);
    }
    return {
        displayStream,
        micStream,
        hasDisplayAudio
    };
};
const createAudioMixer = (ctx, displayStream, micStream, hasDisplayAudio)=>{
    if (!hasDisplayAudio && !micStream) return null;
    const destination = ctx.createMediaStreamDestination();
    const mix = (stream, gainValue)=>{
        const source = ctx.createMediaStreamSource(stream);
        const gain = ctx.createGain();
        gain.gain.value = gainValue;
        source.connect(gain).connect(destination);
    };
    if (hasDisplayAudio) mix(displayStream, 0.7);
    if (micStream) mix(micStream, 1.5);
    return destination;
};
const setupMediaRecorder = (stream)=>{
    try {
        return new MediaRecorder(stream, __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DEFAULT_RECORDING_CONFIG"]);
    } catch  {
        return new MediaRecorder(stream);
    }
};
const getVideoDuration = (url)=>new Promise((resolve)=>{
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = ()=>{
            const duration = isFinite(video.duration) && video.duration > 0 ? Math.round(video.duration) : null;
            URL.revokeObjectURL(video.src);
            resolve(duration);
        };
        video.onerror = ()=>{
            URL.revokeObjectURL(video.src);
            resolve(null);
        };
        video.src = url;
    });
const setupRecording = (stream, handlers)=>{
    const recorder = new MediaRecorder(stream, __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DEFAULT_RECORDING_CONFIG"]);
    recorder.ondataavailable = handlers.onDataAvailable;
    recorder.onstop = handlers.onStop;
    return recorder;
};
const cleanupRecording = (recorder, stream, originalStreams = [])=>{
    if (recorder?.state !== "inactive") {
        recorder?.stop();
    }
    stream?.getTracks().forEach((track)=>track.stop());
    originalStreams.forEach((s)=>s.getTracks().forEach((track)=>track.stop()));
};
const createRecordingBlob = (chunks)=>{
    const blob = new Blob(chunks, {
        type: "video/webm"
    });
    const url = URL.createObjectURL(blob);
    return {
        blob,
        url
    };
};
const calculateRecordingDuration = (startTime)=>startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
function parseTranscript(transcript) {
    const lines = transcript.replace(/^WEBVTT\s*/, "").split("\n");
    const result = [];
    let tempText = [];
    let startTime = null;
    for (const line of lines){
        const trimmedLine = line.trim();
        const timeMatch = trimmedLine.match(/(\d{2}:\d{2}:\d{2})\.\d{3}\s-->\s(\d{2}:\d{2}:\d{2})\.\d{3}/);
        if (timeMatch) {
            if (tempText.length > 0 && startTime) {
                result.push({
                    time: startTime,
                    text: tempText.join(" ")
                });
                tempText = [];
            }
            startTime = timeMatch[1] ?? null;
        } else if (trimmedLine) {
            tempText.push(trimmedLine);
        }
        if (tempText.length >= 3 && startTime) {
            result.push({
                time: startTime,
                text: tempText.join(" ")
            });
            tempText = [];
            startTime = null;
        }
    }
    if (tempText.length > 0 && startTime) {
        result.push({
            time: startTime,
            text: tempText.join(" ")
        });
    }
    return result;
}
function daysAgo(inputDate) {
    const input = new Date(inputDate);
    const now = new Date();
    const diffTime = now.getTime() - input.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "1 day ago";
    } else {
        return `${diffDays} days ago`;
    }
}
const createIframeLink = (videoId)=>`https://iframe.mediadelivery.net/embed/421422/${videoId}?autoplay=true&preload=true`;
const doesTitleMatch = (videos, searchQuery)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ilike"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sql"]`REPLACE(REPLACE(REPLACE(LOWER(${videos.title}), '-', ''), '.', ''), ' ', '')`, `%${searchQuery.replace(/[-. ]/g, "").toLowerCase()}%`);
}}),
"[project]/lib/arcjet.ts [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@arcjet/next/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@arcjet/next/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [middleware-edge] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
// Create a base Arcjet instance for use by each handler
const aj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEnv"])("ARCJET_API_KEY"),
    rules: []
});
const __TURBOPACK__default__export__ = aj;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/arcjet.ts [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@arcjet/next/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/arcjet.ts [middleware-edge] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/headers.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/lib/arcjet.ts [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/arcjet.ts [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@arcjet/next/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arcjet$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/arcjet/index.js [middleware-edge] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arcjet$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arcjet$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
async function middleware(request) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["headers"])()
    });
    if (!session) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/sign-in", request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const validate = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$arcjet$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].withRule((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arcjet$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shield"])({
    mode: "LIVE"
})).withRule((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arcjet$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectBot"])({
    mode: "LIVE",
    allow: [
        "CATEGORY:SEARCH_ENGINE",
        "G00G1E_CRAWLER"
    ]
}));
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$arcjet$2f$next$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createMiddleware"])(validate);
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"
    ]
}; // ⨯ [TypeError: Body is unusable: Body has already been read]
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__fa5b56cb._.js.map