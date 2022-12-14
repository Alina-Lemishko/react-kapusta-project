import React from 'react';
import moment from 'moment';
import { MODES } from 'utils/transactionConstants';
import Loader from 'components/Loader';
import Sprite from '../../images/sprite.svg';
import s from './TransactionsTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations } from 'redux/auth/auth-operations';
import {
  getExpenseTransactions,
  getIncomeTransactions,
  getIsSendingExpense,
  getIsSendingIncome,
  isDeleting,
  isGettingExpense,
  isGettingIncome,
} from 'redux/auth/auth-selectors';
import addSpaceForAmount from 'utils/addSpaceForAmount';
import { transactionDateComparatorDesc } from 'utils/comparators';

const TransactionsTable = ({ mode }) => {
  const isDeletingTransaction = useSelector(isDeleting);
  const isIncomeLoading = useSelector(isGettingIncome);
  const isExpenseLoading = useSelector(isGettingExpense);
  const isSendingIncome = useSelector(getIsSendingIncome);
  const isSendingExpense = useSelector(getIsSendingExpense);

  const isLoading =
    isDeletingTransaction ||
    isIncomeLoading ||
    isExpenseLoading ||
    isSendingIncome ||
    isSendingExpense;

  const dispatch = useDispatch();

  const incomeTransactions = useSelector(getIncomeTransactions);
  const expenseTransactions = useSelector(getExpenseTransactions);
  const currentTransactions =
    mode === MODES.expenseMode ? expenseTransactions : incomeTransactions;

  const sortedTransactions = [...currentTransactions].sort(
    transactionDateComparatorDesc
  );

  const deleteTransaction = async (transactionId, mode) => {
    dispatch(authOperations.deleteTransaction({ transactionId, mode }));
  };

  return (
    <div>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr className={s.tableRow}>
            <th className={s.tableTitle}>Date</th>
            <th className={s.tableTitle}>Description</th>
            <th className={s.tableTitle}>Category</th>
            <th className={s.tableTitle}>Sum</th>
            <th className={s.lastTD}></th>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {isLoading ? (
            <tr>
              <td className={s.loader}>
                <Loader />
              </td>
            </tr>
          ) : sortedTransactions?.length > 0 ? (
            sortedTransactions.map(el => (
              <tr key={el._id} className={s.tableRow}>
                <td className={s.description}>
                  {moment(el.date).format('DD.MM.YYYY')}
                </td>
                <td className={s.description}>{el.description}</td>
                <td className={s.description}>{el.category}</td>
                {mode === MODES.expenseMode ? (
                  <td className={s.descriptionExpense}>
                    -{addSpaceForAmount(el.amount)} ??????.
                  </td>
                ) : (
                  <td className={s.descriptionIncome}>
                    {addSpaceForAmount(el.amount)} ??????.
                  </td>
                )}
                <td className={s.descriptionLast}>
                  <button
                    aria-label="Delete"
                    className={s.btnDelete}
                    onClick={() => deleteTransaction(el._id, mode)}
                  >
                    <svg className={s.calendarIcon} width={18} height={18}>
                      <use href={`${Sprite}#delete-icon`}></use>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className={s.tableRowMobile}>
              <td>
                <p className={s.message}>You can add your transactions</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={s.tableMobileWrap}>
        <table className={s.mobileTable}>
          <tbody className={s.tBody}>
            {isLoading ? (
              <tr>
                <td className={s.loader}>
                  <Loader />
                </td>
              </tr>
            ) : sortedTransactions?.length > 0 ? (
              sortedTransactions.map(el => (
                <tr key={el._id} className={s.tableRow}>
                  <td className={s.column}>
                    <span className={s.descriptionMobile}>
                      {el.description}
                    </span>
                    <span className={s.date}>{el.date}</span>
                  </td>
                  <td className={s.category}>{el.category}</td>
                  {mode === MODES.expenseMode ? (
                    <td className={s.descriptionExpense}>
                      - {addSpaceForAmount(el.amount)} ??????.
                    </td>
                  ) : (
                    <td className={s.descriptionIncome}>
                      {addSpaceForAmount(el.amount)} ??????.
                    </td>
                  )}
                  <td className={s.lastTD}>
                    <button
                      aria-label="Delete"
                      className={s.btnDelete}
                      onClick={() => deleteTransaction(el._id, mode)}
                    >
                      <svg className={s.calendarIcon} width={18} height={18}>
                        <use href={`${Sprite}#delete-icon`}></use>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className={s.message}>
                <td>
                  <p>You can add your transactions</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
