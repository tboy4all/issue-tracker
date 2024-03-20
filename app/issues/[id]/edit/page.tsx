// import IssueForm from '../../_components/IssueForm'
import { PrismaClient } from '@prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

const prisma = new PrismaClient()

interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!issue) return notFound()

  return <IssueForm issue={issue} />
}

export default EditIssuePage
