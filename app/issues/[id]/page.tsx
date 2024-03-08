import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { PrismaClient } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

const prisma = new PrismaClient()

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== 'number') notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!issue) return notFound()

  return (
    <Grid columns={{ initial: '1', sm: '2' }} gap='5'>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap='3' my='2'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAT.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt='4'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}> Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
