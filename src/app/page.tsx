'use client'

import AppTable from '@/components/app.table'
import { Toolbar, Box } from '@mui/material'
import useSWR from 'swr'

export default function Home() {
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <>
      <Toolbar />

      <Box sx={{ px: 3, py: 2 }}>
        <AppTable blogs={data} />
      </Box>
    </>
  )
}
