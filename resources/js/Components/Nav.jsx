import NavLink from './NavLink';

const Nav = ({ auth }) => {
    return (
        <nav className="items-center hidden xl:flex gap-x-8">
            <NavLink href={route('home')} active={route().current('home')}>
                Home
            </NavLink>
            <NavLink href={route('rent.page')} active={route().current('rent.page')}>
                Rent
            </NavLink>
            <NavLink >
                History
            </NavLink>
            {auth && auth.role === 'DRIVER' && (
                <NavLink>
                    Job List
                </NavLink>
            )}
        </nav>
    );
}

export default Nav;