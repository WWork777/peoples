'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { RxCross2, RxPlus } from 'react-icons/rx'
import './accordion.css'

export const Accordion = ({ className, items }) => {
	const [activeIndex, setActiveIndex] = useState(null)

	const onTitleClick = index => {
		setActiveIndex(index === activeIndex ? null : index)
	}

	return (
		<div className={cn('accordion', className)}>
			{items.map((item, index) => (
				<div
					key={item.query + index}
					className='accordion-item hover:scale-[101%] border border-gray-300 transition-all '
				>
					<div
						className={`accordion-title text-xl xs:text-2xl lg:text-xl flex justify-between  ${
							index === activeIndex ? 'active' : ''
						}`}
						onClick={() => onTitleClick(index)}
					>
						{item.query}
						<span className='chevron'>
							{index === activeIndex ? (
								<RxCross2 color='var(--accent-color1)' size={32} />
							) : (
								<RxPlus color='var(--accent-color2)' size={35} />
							)}
						</span>
					</div>
					<div
						className={`accordion-content leading-5 ${
							index === activeIndex ? 'open' : ''
						}`}
					>
						<ul className='list-disc pl-[3%]'>
							<li
								key={item.query}
								className='accordion-service hover:scale-[102%]  hover:rounded-md transition-all'
							>
								{item.response}
							</li>
						</ul>
					</div>
				</div>
			))}
		</div>
	)
}
