import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import { SignInSchemaType, SignUpSchemaType } from '@/app/auth/schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function registerUser(data: SignUpSchemaType) {
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
        throw new AuthenticationError('Email already registered');
      }
      throw new AuthenticationError('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
    });

    return { id: user.id, email: user.email, username: user.username };
  } catch (error: unknown) {
    // If it's already an AuthenticationError, rethrow it
    if (error instanceof AuthenticationError) {
      throw error;
    }
    
    // Log the actual error for debugging
    console.error('Registration error:', error);
    
    // If it's a Prisma error, provide more specific message
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new AuthenticationError('Username or email already exists');
        default:
          throw new AuthenticationError(`Database error: ${error.code}`);
      }
    }
    
    // For any other error, throw a wrapped error
    throw new AuthenticationError('Registration failed: An unexpected error occurred');
  }
}

export async function authenticateUser(data: SignInSchemaType) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user || !user.password) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    return { id: user.id, email: user.email, username: user.username };
  } catch (error: unknown) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    console.error('Authentication error:', error);
    throw new AuthenticationError('Authentication failed: An unexpected error occurred');
  }
} 