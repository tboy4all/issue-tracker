import { Button } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='red'>
      Delete Issue
      {/* <Link href={`/issues/${issueId}/edit`}> Delete Issue</Link> */}
    </Button>
  )
}

export default DeleteIssueButton
