// import { Button } from '@radix-ui/themes'
// import Link from 'next/link'

import Pagination from './components/Pagination'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <>
      {/* <div>Home page</div> */}
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  )
}
