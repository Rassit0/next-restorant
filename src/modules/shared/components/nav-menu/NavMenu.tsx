"use client"
import { NavMenuButton } from './NavMenuButton'
import { NavMenuSearchInput } from './NavMenuSearchInput'
import { NavCartButton } from './NavCartButton'
import { User } from '@nextui-org/react'
import { User as IUser } from 'next-auth'

interface Props {
  user: IUser;
}

export const NavMenu = ({ user }: Props) => {
  return (
    <nav className='navbar'>
      <div className="navbar__container">
        <NavMenuButton />

        <NavMenuSearchInput />

        <div className='flex items-center gap-4'>
          <NavCartButton />

          <User
            name={user.name}
            description={user.email}
            avatarProps={{
              src: user.image!,
              alt: user.name!
            }}
          />
        </div>

      </div>
    </nav>
  )
}
