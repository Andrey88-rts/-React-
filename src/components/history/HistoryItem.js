import React from 'react';

export default function HistoryItem({ transaction }) {
  return (
    <li
      className={`history__item history__item-${transaction.bool ? "plus" : "minus"}`}>{transaction.description}
      <span className="history__money">{transaction.amount} ₽</span>
      <button className="history__delete">x</button>
    </li>


  )
};

