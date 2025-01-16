import { NavMenuButton } from './NavMenuButton'
import { NavMenuSearchInput } from './NavMenuSearchInput'
import { NavCartButton } from './NavCartButton'

export const NavMenu = () => {
  return (
    <nav className='navbar'>
        <div className="navbar__container">
            <NavMenuButton/>

            <NavMenuSearchInput/>

            <NavCartButton/>

        </div>
    </nav>
  )
}
