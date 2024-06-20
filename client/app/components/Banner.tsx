import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Github from '../../assets/github-logo.png'
function Banner() {
    return (
        <div className='mt-5 text-center flex justify-center items-center'>
            <span className='font-mono'>Made With
                <span className='text-red-500 text-xl mr-1 ml-1 relative top-1'> &#10084;</span> by
                <Image
                    src={Github}
                    alt='Github Logo'
                    width={15}
                    height={5}
                    className='inline mr-2 ml-2'
                />
                <Link href='https://github.com/GaneshSrambikal'>@GaneshSrambikal</Link></span>
        </div>
    )
}

export default Banner