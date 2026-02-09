'use client'

import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const Facebook = () => {
    const router = useRouter();

    const handleBtn = () => {
        router.push('/');
    }

    return (
        <div>
            Facebook page

            <Button variant="success" onClick={handleBtn}>Back home</Button>
            <div>
                <button onClick={ () => handleBtn()}>Back home</button>
            </div>
        </div>
    )
}

export default Facebook;