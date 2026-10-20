// Maps Better Auth's models and fields to the tables in db/migrations/0001_auth.sql.

export const AUTH_USER = {
  modelName: "users",
  fields: {
    emailVerified: "email_verified",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  // Only the handle goes through Better Auth (sign-up and the session); the API owns the other profile columns.
  additionalFields: {
    handle: { type: "string", required: false },
  },
} as const;

export const AUTH_SESSION = {
  modelName: "sessions",
  fields: {
    userId: "user_id",
    expiresAt: "expires_at",
    ipAddress: "ip_address",
    userAgent: "user_agent",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
} as const;

export const AUTH_ACCOUNT = {
  modelName: "accounts",
  fields: {
    userId: "user_id",
    accountId: "account_id",
    providerId: "provider_id",
    accessToken: "access_token",
    refreshToken: "refresh_token",
    idToken: "id_token",
    accessTokenExpiresAt: "access_token_expires_at",
    refreshTokenExpiresAt: "refresh_token_expires_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
} as const;

export const AUTH_VERIFICATION = {
  modelName: "verifications",
  fields: {
    expiresAt: "expires_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
} as const;

export const AUTH_RATE_LIMIT_TABLE = {
  modelName: "rate_limits",
  fields: { lastRequest: "last_request" },
} as const;

// Better Auth endpoints the app doesn't use; profile changes go through PATCH /api/me instead.
export const DISABLED_AUTH_PATHS = [
  "/update-user",
  "/change-email",
  "/delete-user",
];

// Codes thrown by the sign-up hook; the form shows them under the matching field.
export const SIGN_UP_ERROR_CODES = {
  invalidName: "INVALID_NAME",
  invalidHandle: "INVALID_HANDLE",
  handleTaken: "HANDLE_TAKEN",
} as const;
