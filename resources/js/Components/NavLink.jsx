import { Link } from '@inertiajs/react';
import {motion} from "framer-motion"

export default function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'relative hover:text-primary transition-all capitalize'
            }
        >
            {active && (
                <motion.span initial={{ y: '-100%' }} animate={{ y:0 }} transition={{ type: 'tween'}}  layoutId='underline' className='absolute top-full left-0 h-[3px] bg-primary w-full' />
            )}
            {children}
        </Link>
    );
}
