import Link from 'next/link'
import React from 'react'

function Banner() {
    return (
        <div className='mt-5'>
            <span className='font-mono'>Made With <span className='text-red-500'>&#10084;</span> by <Link href='https://github.com/GaneshSrambikal'>@GaneshSrambikal</Link></span>
        </div>
    )
}

export default Banner