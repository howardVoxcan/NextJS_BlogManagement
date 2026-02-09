import Image from 'next/image'
import Link from 'next/link'
import x from '../styles/app.module.css'
import y from '../styles/hoang.module.css'
import BasicExample from '@/components/app.table'

export default function Home() {
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
