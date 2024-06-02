import { db } from '@/db';
import { users, accounts, InsertAccount } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const loginUser = async (username: string) => {
  // check if user is sign up with oauth
  const user = await db
    .select()
    .from(users)
    .where(
      or(eq(users.username, username.trim()), eq(users.email, username.trim())),
    );

  return user;
};


export const savePassword = async (
  isChangePassword: boolean,
  email: string,
  password: string,
  oldPassword?: string,
) => {
  if (isChangePassword) {
    // have to check old password
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      return {
        success: false,
        message: 'User not found.',
      };
    }

    const isValid = await bcrypt.compare(oldPassword!, user[0].password!);

    if (!isValid) {
      return {
        success: false,
        message: 'Old password is wrong.',
      };
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email))
    .returning();

  if (user.length > 0) {
    return {
      success: true,
      message: 'Password updated successfully',
    };
  } else {
    return {
      success: false,
      message: 'Failed to update password',
    };
  }
};