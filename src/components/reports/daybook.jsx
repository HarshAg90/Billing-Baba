import { useEffect, useState } from "react";
import Dropdown from "../dropdown";
import SortableTable from "../Tables";

export default function Daybook({ data, setData }) {
  const [daybook, setDaybook] = useState();
  const [day, setDay] = useState();
  useEffect(() => {
    const db = [];
    data?.sales?.map((sale, index) =>
      db.push({ ...sale, type: "sale", moneyIn: sale.total })
    );
    data?.purchase?.map((purchase, index) =>
      db.push({ ...purchase, type: "purchase", moneyOut: purchase.total })
    );

    data?.expense?.map(
      (expense, index) =>
        db.push({ ...expense, type: "expense", moneyOut: expense.total })
      //   setDaybook([
      //     ...daybook,
      //     { ...expense, type: "expense", moneyOut: expense.total },
      //   ])
    );
    setDaybook(db);
  }, [data]);
  const columns = [
    { key: "invoice_date", label: "Invoice Date" },
    { key: "invoice_number", label: "Invoice Number" },
    { key: "type", label: "Type" },
    { key: "moneyIn", label: "Money In" },
    { key: "moneyOut", label: "Money Out" },
    { key: "DropDown", label: "-" },
  ];
  const sendingArray = data?.Transactions?.filter((element, index) =>
    day ? new Date(element.invoice_date) === new Date(day) : true
  ).map((ele) => {
    return {
      ...ele,
      invoice_date: new Date(ele.invoice_date).toLocaleDateString(),
      moneyIn:
        ele.type === "sale" ||
        ele.type === "Opening Balance" ||
        ele.type === "Payment-In" ||
        ele.type === "Sale order" ||
        ele.transactionType === "Sale Estimation" ||
        ele.type === "Delivery chalan"
          ? ele.total
          : "",
      moneyOut:
        ele.type === "purchase" ||
        ele.type === "expense" ||
        ele.type === "Credit Note"
          ? ele.total
          : "",
      menuItem: [
        { label: "print" },
        { label: "forward" },
        { label: "generate Invoice" },
        { label: "recieve payment" },
        { label: "View/Edit" },
        { label: "cancel" },
        { label: "Delete" },
        { label: "Duplicate" },
        { label: "Print" },
      ],
    };
  });

  return (
    <div id="saleInvoice">
      <div className="title odd">
        <div className="t">
          <div className="l">
            <input type="date" onChange={(e) => setDay(e.target.value)} />
            <button onClick={() => setDay()}>Reset</button>
          </div>
          <div className="r">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
              </svg>
              Graphs
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>
              Print
            </button>
          </div>
        </div>
      </div>
      {daybook && (
        <div className="">
          <div className="flex justify-between p-4 rounded-md bg-gray-100 items-center">
            <h1>TRANSACTIONS</h1>
            <div className="flex gap-2">
              <div className="flex border border-gray-700 rounded-full px-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <input type="" className="bg-transparent" />
              </div>
            </div>
          </div>
          {/* <div className="content">
          <div className="t">
            <h1>TRANSACTIONS</h1>
            <div className="search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <input type="" />
            </div>
          </div>
          <div className="cl">
            <p>Name</p>
            <p>Ref No.</p>
            <p>TYPE</p>
            <p>MONEY IN</p>
            <p>MONEY OUT</p>
            <p>PRINT/SHARE</p>
          </div>
          {day
            ? daybook
                ?.filter((element, index) => {
                  return element.invoice_date === day;
                })
                .map((transaction, index) => (
                  <div className="cl" key={index}>
                    <p className="">{transaction.invoice_date}</p>
                    <p className="grey">{transaction.invoice_number}</p>
                    <p className="grey">{transaction.type}</p>
                    <p className="grey">{transaction.moneyIn}</p>
                    <p className="grey">{transaction.moneyOut}</p>
                    <p className="grey">-</p>
                  </div>
                ))
            : daybook?.map((transaction, index) => (
                <div className="cl" key={index}>
                  <p className="">{transaction.invoice_date}</p>
                  <p className="grey">{transaction.invoice_number}</p>
                  <p className="grey">{transaction.type}</p>
                  <p className="grey">{transaction.moneyIn}</p>
                  <p className="grey">{transaction.moneyOut}</p>
                  <p className="grey">-</p>
                </div>
              ))} */}

          <SortableTable data={sendingArray} columns={columns} />
        </div>
      )}
    </div>
  );
}
