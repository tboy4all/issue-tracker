import { Flex, Grid } from '@radix-ui/themes'
import Pagination from './components/Pagination'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'

import { PrismaClient } from '@prisma/client'
import React from 'react'
import { Metadata } from 'next'

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

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>

      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
}
