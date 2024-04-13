import { Link } from '@inertiajs/react';

const Logo = () => {
    return (
        <Link href='/' className='flex gap-2 text-lg font-bold'>
            <img src='/assets/logo.svg' width={20} />
            PrimeDriveLux
        </Link>
    );
}

export default Logo;