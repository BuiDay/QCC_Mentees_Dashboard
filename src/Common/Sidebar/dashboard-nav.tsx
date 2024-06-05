import { cn } from '../../utils/utils'
import React from 'react'
import { Dispatch, SetStateAction } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from '../icons'

interface DashboardNavProps {
  items?: {
    title?:string,
    url?:string,
    icon?:string
  }[]
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const DashboardNav: React.FC<DashboardNavProps> = ({ items, setOpen }) => {
  const path = useLocation()
  console.log(path)
  if (!items?.length) {
    return null
  }

  return (
    <nav className='grid items-start gap-2'>
      {items.map((item, index) => {
        const Icon = Icons[item.icon]
        return (
          item.url && (
              <Link
                // to={item.disabled ? '/' : item.href}
                to={item.url}
                onClick={() => {
                  if (setOpen) setOpen(false)
                }}
                key={index}
              >
                <span
                  className={cn(
                    'group flex items-center rounded-[5px] px-3 py-2 text-sm font-medium hover:bg-white group',
                    path.pathname === item.url ? 'bg-white' : 'transparent',
                    // item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  <Icon className={cn('mr-2 h-4 w-4',path.pathname === item.url ? 'text-pink ' : 'text-white group-hover:text-pink')} />
                  <span className={cn('text-[16px]', path.pathname === item.url ? 'text-pink ' : 'text-white group-hover:text-pink')}>{item.title}</span>
                </span>
              </Link>
          )
        )
      })}
    </nav>
  )
}

export default DashboardNav
