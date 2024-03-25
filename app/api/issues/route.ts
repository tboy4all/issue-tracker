// import prisma from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { patchIssueSchema } from '../../validationSchemas'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const validation = patchIssueSchema.safeParse(body)

  if (!validation.success) {
    // return NextResponse.json(validation.error.errors, { status: 400 })
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(newIssue, { status: 201 })
}
