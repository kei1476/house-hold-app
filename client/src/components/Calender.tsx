import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import './calender.css'
import { Balance, CalenderEvent, Transaction } from '../types'
import { calculateDailyTransactions } from '../utils/calculateTransactions'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { theme } from '../theme/theme'
import { isSameMonth } from 'date-fns'

interface CalenderProps {
	today: string;
	currentDay: string;
	monthlyTransactions: Transaction[];
	setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
	setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
	setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
}

const Calender = ({today, currentDay, monthlyTransactions, setCurrentMonth, setCurrentDay, setSelectedTransaction}: CalenderProps) => {
	const dailyTransactions = calculateDailyTransactions(monthlyTransactions);

	const createCalenderEvent = (dailyTransactions: Record<string,Balance>): CalenderEvent[] => {
		const days = Object.keys(dailyTransactions);
		return days.map((day) => {
			const {income, expense, balance,} = dailyTransactions[day];
			return {
				start: day,
				income,
				expense, 
				balance
			}
		})
	}
	const events = createCalenderEvent(dailyTransactions);

	const backgroundEvent = {
		start: currentDay,
		display: "background",
		backgroundColor: theme.palette.incomeColor.light,
	};
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
		const currentMonth = dateSetInfo.view.currentStart;
		setCurrentMonth(currentMonth);

		const todayDate = new Date();
		if(isSameMonth(todayDate, currentMonth)) {
			setCurrentDay(today);
		}
	}
	const handleDateClick = (dateInfo: DateClickArg) => {
		setCurrentDay(dateInfo.dateStr)
		setSelectedTransaction(null);
	}

	return (
		<FullCalendar
			locale='ja'
			plugins={[dayGridPlugin, interactionPlugin]}
			initialView='dayGridMonth'
			events={[...events, backgroundEvent]}
			eventContent={renderEventContent}
			buttonText={{ 
				today: '今日',
			}}
			datesSet={handleDateSet}
			dateClick={handleDateClick}
		/>
	)
}

export default Calender