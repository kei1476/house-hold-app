import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import './calender.css'
import { Balance, CalenderEvent, Transaction } from '../types'
import { calculateDailyTransactions } from '../utils/calculateTransactions'

interface CalenderProps {
	monthlyTransactions: Transaction[];
	setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Calender = ({monthlyTransactions, setCurrentMonth}: CalenderProps) => {
	const createCalenderEvent = (dailyTransactions: Record<string,Balance>): CalenderEvent[] => {
		const days = Object.keys(dailyTransactions);
		return days.map((day) => {
			const {income, expense, balance} = dailyTransactions[day];
			return {
				start: day,
				income,
				expense, 
				balance
			}
		})
	}

	const dailyTransactions = calculateDailyTransactions(monthlyTransactions);
	const events = createCalenderEvent(dailyTransactions);

	const renderEventContent = (eventInfo: EventContentArg) => {
		return (
			<div>
				<div className='money' id='event-income'>
					{eventInfo.event.extendedProps.income}
				</div>
				<div className='money' id='event-expense'>
					{eventInfo.event.extendedProps.expense}
				</div>
				<div className='money' id='event-balance'>
					{eventInfo.event.extendedProps.balance}
				</div>
			</div>
		)
	}

	const handleDateSet = (dateSetInfo: DatesSetArg) => {
		setCurrentMonth(dateSetInfo.view.currentStart);
	}

	return (
		<FullCalendar
			locale='ja'
			plugins={[dayGridPlugin]}
			initialView='dayGridMonth'
			events={events}
			eventContent={renderEventContent}
			buttonText={{ 
				today: '今日',
			}}
			datesSet={handleDateSet}
		/>
	)
}

export default Calender