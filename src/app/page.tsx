'use client'

import Image from 'next/image'
import Link from 'next/link'
import x from '../styles/app.module.css'
import y from '../styles/hoang.module.css'
import BasicExample from '@/components/app.table'
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/blogs');
      const data = await res.json();
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div>
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
