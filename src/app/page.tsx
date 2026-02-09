'use client'

import Image from 'next/image'
import Link from 'next/link'
import x from '../styles/app.module.css'
import y from '../styles/hoang.module.css'
import AppTable from '@/components/app.table'
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
  const fetcher = (url: string) => fetch(url)
  .then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher
  );

  if (!data) return <div>Loading...</div>;

  console.log({data, error, isLoading});

  return (
    <div>
      {data?.length}
      <ul>
        <li className = {x.Facebook}>
          <Link href="facebook">Facebook Page</Link>
        </li>

        <li className= {y.Admin}>
          <Link href="admin">Admin Page</Link>
        </li>
      </ul>
      <AppTable blogs={data} />
    </div>
  )
}
