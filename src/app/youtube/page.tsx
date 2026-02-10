'use client'

import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function Youtube() {
    const router = useRouter();

    const handleBtn = () => {
        router.push('/');
    }

    return (
        <div>
            Youtube page

            <Button variant="success" onClick={handleBtn}>Back home</Button>
            <div>
                <button onClick={ () => handleBtn()}>Back home</button>
            </div>
        </div>
    )
}