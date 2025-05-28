import { navOptions } from "@/settings/nav-options"
import React from 'react'
import { Link } from "react-scroll";

interface Props {
    handleToggle: Function
}

export const MenuResponsive = ({ handleToggle }: Props) => {
    return (
        <div className="w-100 h-100 bg-white" style={{
            position: "fixed",
            top: 0,
            left: 0,
            padding: "40px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            {navOptions.map((opt) => {
                const { title, ...options } = opt
                return (
                    <Link
                        {...options}
                        key={opt.to}
                        onClick={() => handleToggle()}
                        className="nav-item-responsive"
                    >
                        {title}
                    </Link>
                )
            })}
        </div>
    )
}
