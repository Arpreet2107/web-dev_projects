"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";


// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: unknown; // Allow other properties
}

type AuthResult =
  | { success: true; message?: string }
  | { success: false; message: string };

// Set session cookie
export async function setSessionCookie(idToken: string): Promise<void> {
  const cookieStore = await cookies();

  try {
    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000, // milliseconds
    });

    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  } catch (error: unknown) {
    console.error("Error setting session cookie:", error);
    throw new Error("Failed to set session cookie."); // Re-throw to be caught in caller
  }
}

export async function signUp(params: SignUpParams): Promise<AuthResult> {
  const { uid, name, email } = params;

  try {
    // Get the user (ensures the user exists).
    await auth.getUser(uid);

    // Save user to db.
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return { success: true, message: "Account created successfully." };
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Handle Firebase specific errors.
    if (error instanceof Error && 'code' in error && error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams): Promise<AuthResult> {
  const { idToken } = params;

  try {
    await setSessionCookie(idToken);
    return { success: true, message: "Signed in successfully." };
    } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error signing in:", error.message);
    } else {
      console.error("Error signing in:", error);
    }
    console.error("Error signing in:", error);
    return { success: false, message: "Failed to sign in. Please try again." };
  }
}

// Sign out user by clearing the session cookie
export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    const userData = userRecord.data();
    if (!userData) {
        return null;
    }

    return {
      id: userRecord.id,
      ...userData,
    } as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}