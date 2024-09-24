import React from 'react';
import Card from './Card';
import BacklogIcon from './assets/Backlog.svg';
import DoneIcon from './assets/Done.svg';
import InProgressIcon from './assets/in-progress.svg';
import TodoIcon from './assets/To-do.svg';
import CancelledIcon from './assets/Cancelled.svg';
import UrgentIcon from './assets/SVG - Urgent Priority colour.svg';
import HighIcon from './assets/Img - High Priority.svg';
import MediumIcon from './assets/Img - Medium Priority.svg';
import LowIcon from './assets/Img - Low Priority.svg';
import NoPriorityIcon from './assets/No-priority.svg';
import addIcon from './assets/add.svg';
import dotsIcon from './assets/3 dot menu.svg';

function Column({ title, tickets, users, groupBy }) {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'backlog': return BacklogIcon;
      case 'done': return DoneIcon;
      case 'in progress': return InProgressIcon;
      case 'canceled': return CancelledIcon;
      case 'todo': return TodoIcon;
      default: return null;
    }
  };

  // Function to get the highest priority of tickets
  const getHighestPriority = (tickets) => {
    return tickets.reduce((highest, ticket) => {
      return ticket.priority > highest ? ticket.priority : highest;
    }, -1);
  };

  // Get the highest priority for this column
  const highestPriority = getHighestPriority(tickets);

  // Function to get the priority label and icon
  const getPriorityLabelAndIcon = (priority) => {
    switch (priority) {
      case 4: return { label: 'Urgent', icon: UrgentIcon };
      case 3: return { label: 'High', icon: HighIcon };
      case 2: return { label: 'Medium', icon: MediumIcon };
      case 1: return { label: 'Low', icon: LowIcon };
      case 0: return { label: 'No Priority', icon: NoPriorityIcon };
      default: return { label: '', icon: null };
    }
  };

  const { label, icon } = getPriorityLabelAndIcon(highestPriority);

  return (
    <div className="column">
      {/* Show title based on the grouping */}
      {groupBy === 'status' && (
        
          <h3>
            <img src={getStatusIcon(title)} alt={`${title} Icon`} />
            <span>{title} {tickets.length}</span>
            <img src={addIcon} />
          <img src={dotsIcon} />
          </h3>
          

       
      )}

      {/* Show priority and card count if grouping by priority */}
      {groupBy === 'priority' && label && (
        <div className="priority-header">
          <img src={icon} alt={label} className="priority-icon" />
          <span>{label} {tickets.length}</span> {/* Display count here */}
          <img src={addIcon} />
          <img src={dotsIcon} />
        </div>
      )}

      <div className={`card-container ${groupBy === 'user' ? 'horizontal-layout' : ''}`}>
        {tickets.map(ticket => {
          const user = users.find(user => user.id === ticket.userId);
          const userName = user ? user.name : 'Unknown User';
          return (
            <Card key={ticket.id} ticket={ticket} userName={userName} userId={user.id} />
          );
        })}
      </div>
    </div>
  );
}

export default Column;
