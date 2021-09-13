import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import React from 'react'

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },

    {
        title: 'Create Dog',
        path: '/dogs',
        icon: <AiIcons.AiOutlinePlus/>, 
        cName: 'nav-text'
    },

    {
        title: 'Landing Page',
        path: '/',
        icon: <AiIcons.AiOutlineRollback/>, 
        cName: 'nav-text'
    }
]