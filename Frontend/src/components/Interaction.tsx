import React from 'react'
import { HandThumbUpIcon, HandThumbDownIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'



export default function Interaction() {
  return (
    <div className='interaction-row flex flex-row justify-between w-3/5 py-6'>
        <div className='like-dislike-div flex gap-4'>
        <button className='like-btn bg-neutral-600 bg-opacity-30 flex items-center'>
            <HandThumbUpIcon className='h-6 inline'/>
            <span className='px-2'>&middot;</span>
            <span>
                2.3M
            </span>
        </button>
        <button className='dislike-btn bg-neutral-600 bg-opacity-30 flex items-center'>
        <HandThumbDownIcon className='h-6 inline'/>
            <span className='px-2'>&middot;</span>
            <span>
                20k
            </span>
        </button>
        </div>
        <button className='bg-neutral-600 bg-opacity-30 flex items-center gap-2'>
            <ChatBubbleOvalLeftIcon className='h-6'/>
            <span> 240k Comments</span>
        </button>
    </div>
  )
}
