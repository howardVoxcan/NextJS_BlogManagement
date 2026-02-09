import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="facebook">Facebook Page</Link>
        </li>

        <li>
          <Link href="admin">Admin Page</Link>
        </li>
      </ul>
    </div>
  )
}
