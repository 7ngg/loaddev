'use server';

import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import { SignUpSchemaType, SignInSchemaType } from './schemas';

const prisma = new PrismaClient();

export async function registerUser(data: SignUpSchemaType): Promise<{ error?: string }> {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        return { error: 'Email already registered' };
      }
      return { error: 'Username already taken' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
    });

    return {};
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Failed to create account. Please try again later.' };
  }
}

export async function authenticateUser(data: SignInSchemaType): Promise<{ error?: string, user?: { id: string, email: string, username: string } }> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user || !user.password) {
      return { error: 'Invalid credentials' };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return { error: 'Invalid credentials' };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { error: 'Authentication failed. Please try again later.' };
  }
} 