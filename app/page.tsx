import Pagination from './components/Pagination'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'

import { PrismaClient } from '@prisma/client'
import React from 'react'

const prisma = new PrismaClient()

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  })
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  })
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  })

  return <IssueChart open={open} inProgress={inProgress} closed={closed} />
}
