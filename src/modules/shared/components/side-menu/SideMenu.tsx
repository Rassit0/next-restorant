//snipet rafc
"use client"
import React from 'react'
import { SideMenuList } from './SideMenuList'
import { useUIStore } from '../../stores/ui.store'
import { Button } from '@nextui-org/react'
import { Cancel01Icon } from 'hugeicons-react'
import { closeSession } from '@/modules/auth'

export const SideMenu = () => {

    const { isOpenMenu, handleMenuOpen } = useUIStore();

    return (
        <nav className={isOpenMenu ? 'sidemenu sidemenu-show' : 'sidemenu'}>
            {/* LOGO */}
            <div className='pt-8 mb-6'>
                <h3 className='font-bold text-2xl'>
                    Next <span className='text-primary'>POS</span>
                </h3>
            </div>

            {/* MENU */}
            <SideMenuList />

            {/* CLOSE BUTTON RESPONSIVE */}
            <Button
                className='flex md:hidden mx-auto'
                variant='light'
                isIconOnly
                radius='full'
                startContent={<Cancel01Icon />}
                onPress={handleMenuOpen}
            />


            {/* CLOSE SESION */}
            <Button
                fullWidth
                onPress={async () => { await closeSession() }}
                color='danger'
                variant='light'
                className='mt-auto'
            >
                Cerrar Sesión
            </Button>
        </nav>
    )
}
