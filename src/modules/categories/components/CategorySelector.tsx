"use client"
import { Button } from '@nextui-org/react';
import { Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface Props {
    categories: Category[];
}

export const CategorySelector = ({ categories }: Props) => {

    const router = useRouter();
    const categoryParam = useSearchParams().get('category');

    return (
        <section className='pt-8 container'>
            <ul className='flex gap-4'>
                <Button
                    as='li'
                    onPress={() => router.push(`/admin/home`)}
                    variant={!categoryParam?'solid':'ghost'}
                >
                    Todos
                </Button>

                {
                    categories.map(category => (
                        <Button
                            key={category.id}
                            as='li'
                            variant={categoryParam === category.slug? 'solid': 'ghost'}
                            color='primary'
                            onPress={() => router.push(`/admin/home?category=${category.slug}`)}
                        >
                            {category.name}
                        </Button>
                    ))
                }

            </ul>
        </section>
    )
}
