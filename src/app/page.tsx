'use client'

import Image from 'next/image'
import Link from 'next/link'
import x from '../styles/app.module.css'
import y from '../styles/hoang.module.css'
import BasicExample from '@/components/app.table'
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
  const fetcher = (url: string) => fetch(url)
  .then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher
  );

  console.log({data, error, isLoading});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('http://localhost:8000/blogs');
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //   fetchData();
  // }, []);

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
      <BasicExample />
    </div>
  )
}
