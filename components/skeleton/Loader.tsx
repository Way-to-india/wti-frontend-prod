import React from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type LoaderProps = {
    className?: string;
    iconClassName?: string;
    size?: number;
    color?: string;
}

const Loader = ({
    className,
    iconClassName,
    size = 24,
    color = '#ff8b02'
}: LoaderProps) => {
    return (
        <div className={cn('flex animate-spin items-center justify-center', className)}>
            <LoaderCircle
                className={cn('animate-spin', iconClassName)}
                size={size}
                color={color}
            />
        </div>
    )
}

export default Loader