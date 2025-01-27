import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSalesReturn({ data, setData, change, setChange }) {
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const [rows, setRows] = useState([
    {
      index: 1,
      item: "",
      qty: 1,
      unit: "",
      hsn: "",
      price_per_unit: "",
      discount: "",
      profit: 0,
      amount: "",
    },
  ]);

  const [indexCount, setIndexCount] = useState();
  const addRow = () => {
    setRows([
      ...rows,
      {
        index: indexCount,
        item: "",
        qty: 1,
        unit: "",
        price_per_unit: "",
        hsn: "",
        discount: "",
        profit: 0,
        amount: "",
      },
    ]);
    setIndexCount(indexCount + 1);
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  const handleInputChange = async (index, column, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      if (
        column === "qty" ||
        column === "price_per_unit" ||
        column === "profit" ||
        column === "discount"
        // column === "tax"
      ) {
        const qty = parseInt(newRows[index]["qty"]);
        const pricePerUnit = parseInt(newRows[index]["price_per_unit"]);
        const discount = parseInt(newRows[index]["discount"]);
        // const taxPercentage = parseInt(newRows[index]["tax"]);

        // console.log(qty);
        // console.log(pricePerUnit);
        // console.log(discount);
        // const tax = (pricePerUnit - discount) * (taxPercentage / 100);
        // console.log(tax);
        // Calculate amount
        // const amount = qty * (pricePerUnit - discount + tax);
        const amount = qty * (pricePerUnit - discount);
        newRows[index]["amount"] = amount;

        console.log(newRows[index]["profit_per_item"]);
        console.log(qty);
        console.log(newRows[index]["profit_per_item"] * qty);
        newRows[index]["profit"] = newRows[index]["profit_per_item"]
          ? newRows[index]["profit_per_item"] * qty
          : 0;

        // Update total amount
        const newTotalAmount = newRows.reduce(
          (total, row) => total + (row.amount || 0),
          0
        );

        const profit = newRows.reduce(
          (total, row) => total + (row.profit || 0),
          0
        );

        setTotalAmount(newTotalAmount);
        setProfit(profit);

        // Update total tax
        // const newTotalTax = newRows.reduce(
        //   (total, row) => total + (row.amount ? tax : 0),
        //   0
        // );
        // setTotalTax(newTotalTax);
      }
      newRows[index][column] = value;
      console.log(newRows);
      return newRows;
    });
  };

  const [Name, setName] = useState(); // Initial index count
  const [phone_no, setPhone_no] = useState(); // Initial index count
  function generateUniqueInvoiceNumber(data) {
    const existing = new Set(data.map((item) => item.invoice_number));
    let invoice;
    do {
      invoice = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    } while (existing.has(invoice));
    return invoice;
  }
  const [invoice_number, setInvoice_number] = useState(
    generateUniqueInvoiceNumber(data.Transactions)
  );
  const [invoice_date, setInvoice_date] = useState(""); // Initial index count
  const [due_date, setDue_date] = useState(""); // Initial index count
  const [state_of_supply, setState_of_supply] = useState({
    state: "",
    isDone: false,
  }); // Initial index count
  const [round_off, setRound_off] = useState(); // Initial index count
  const [paymentType, setpaymentType] = useState("credit"); // Initial index count
  const [Description, setDescription] = useState();
  const [paid, setPaid] = useState(0);

  const [Search, setSearch] = useState(); // Initial index count

  let uid = data.uid;
  let sendData = () => {
    const newData = {
      name: Name ? Name : "",
      phone_no: phone_no ? phone_no : "",
      invoice_number: invoice_number ? invoice_number : "",
      invoice_date: invoice_date ? invoice_date : "",
      date: due_date ? due_date : "",
      state_of_supply: state_of_supply.state ? state_of_supply.state : "",
      payment_type: paymentType ? paymentType : "",
      transactionType: "Credit Note",
      items: rows ? rows : "",
      round_off: round_off ? round_off : "",
      total: totalAmount ? totalAmount + totalTax : "",
      amount: totalAmount ? totalAmount + totalTax : "",
      profit: profit ? profit : "",
      total_tax: totalTax,
      description: Description ? Description : "",
      pending: totalAmount && paid ? totalAmount - paid : 0,
      paid: paid,
      type: "Credit Note",
    };

    let newDa = data;

    newDa.Transactions
      ? newDa.Transactions.push(newData)
      : (newDa.Transactions = [newData]);
    newDa.sales ? newDa.sales.push(newData) : (newDa.sales = [newData]);

    console.log(newDa);
    setData(newDa);
    setChange(!change);
    let intex = newDa.Transactions?.length - 1;
    Navigate("/sales-return-bill?index=" + intex);
  };

  let tax = [
    { value: 0, name: "IGST@0%" },
    { value: 0, name: "GST@0%" },
    { value: 0.5, name: "IGST@0.25%" },
    { value: 0.5, name: "GST@0.25%" },
    { value: 3, name: "IGST@3%" },
    { value: 3, name: "GST@3%" },
    { value: 5, name: "IGST@5%" },
    { value: 5, name: "GST@5%" },
    { value: 12, name: "IGST@12%" },
    { value: 18, name: "IGST@18%" },
    { value: 18, name: "GST@18%" },
    { value: 28, name: "IGST@28%" },
    { value: 28, name: "GST @28%" },
  ];
  if (!data.tax) setData({ ...data, tax: tax });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const today = new Date();
    setInvoice_date(formatDate(today));
  }, []);
  return (
    <div id="addsales">
      <div className="top">
        <div className="">
          <button onClick={() => Navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <h1>Sale Return</h1>
        </div>
        <div className="">
          <p>Credit</p>
          <div
            className={toggle ? "toggle" : "toggle opp"}
            onClick={() => {
              // setpaymentType(toggle ? "Cash" : "Credit");
              setpaymentType(toggle ? "cash" : "credit");
              setToggle(!toggle);
            }}
          >
            <div className="button"></div>
          </div>
          <p>Cash</p>
        </div>
      </div>
      <div className="body">
        <div className="ai1">
          <div className="le">
            <div className="l">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>

              <div className="search">
                <input
                  type="text"
                  name="name"
                  value={Name ? Name : Search?.party ? Search?.party : ""}
                  onChange={(e) => setSearch({ party: e.target.value })}
                  placeholder="Search by Name/Phone"
                  id=""
                />
                {Search?.party && (
                  <ul>
                    {data.parties
                      .filter((customer) =>
                        customer.partyName
                          .toLowerCase()
                          .includes(Search.party.toLowerCase())
                      )
                      .map((customer) => (
                        <li
                          key={customer.phone_no}
                          onClick={() => {
                            // i should probably add more than a name to improve future search filter
                            setName(customer.partyName);
                            setPhone_no(customer.phoneNo);
                            setSearch();
                          }}
                        >
                          {customer.partyName}
                        </li>
                      ))}
                    <li className="add" onClick={() => Navigate("/addParties")}>
                      Add Party +
                    </li>
                  </ul>
                )}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
            <div className="l">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              <input
                type="text"
                value={phone_no}
                onChange={(e) => setPhone_no(e.target.value)}
                name="phNo"
                placeholder="Phone Number"
                id=""
              />
            </div>
          </div>

          <div className="r">
            <div className="relative group flex items-center">
              <span>Invoice Number</span>
              <input
                type="number"
                value={invoice_number}
                onChange={(e) => setInvoice_number(e.target.value)}
                name="InvNo"
                placeholder="input..."
                className="px-1"
              />
            </div>
            <div className="">
              <span>Invoice Date</span>
              <input
                type="date"
                value={invoice_date}
                onChange={(e) => setInvoice_date(e.target.value)}
                id="birthday"
                name="birthday"
              ></input>
            </div>
            <div className="">
              <span>Date</span>
              <input
                type="date"
                value={due_date}
                onChange={(e) => setDue_date(e.target.value)}
                id="birthday"
                name="birthday"
              ></input>
            </div>
            <div className="">
              <span>State of supply</span>
              <input
                type="text"
                value={state_of_supply.state}
                onChange={(e) =>
                  setState_of_supply({ state: e.target.value, isDone: false })
                }
                name="State"
                placeholder="input..."
                id=""
              />
            </div>
            <div className="ne">
              {state_of_supply.state && !state_of_supply.isDone && (
                <div className="dropdown">
                  {statesAndUnionTerritoriesOfIndia
                    .filter((e) =>
                      e
                        .toLocaleLowerCase()
                        .includes(state_of_supply.state.toLocaleLowerCase())
                    )
                    .map((e, index) => (
                      <p
                        key={index}
                        onClick={() =>
                          setState_of_supply({ state: e, isDone: true })
                        }
                      >
                        {e}
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ai2">
          <div className="rounded-sm flex justify-between gap-1 md-2 items-center">
            <p className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
              item
            </p>
            <p className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
              QTY
            </p>
            <p className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
              UNIT
            </p>
            <p className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
              PRICE/UNIT
            </p>
            <p className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
              DISCOUNT
            </p>
            {/* <p>TAX</p> */}
            <p className="w-full  py-3  text-center bg-emerald-100 rounded-sm">
              AMOUNT
            </p>
          </div>
          {rows.map((row, rowIndex) => (
            <div
              className="rounded-sm flex justify-between my-1 gap-1 items-center"
              key={rowIndex}
            >
              <div className="w-full relative">
                <input
                  className="w-full  py-3  text-center bg-gray-100 rounded-sm"
                  value={
                    rows[rowIndex].item
                      ? rows[rowIndex].item
                      : Search
                      ? Search[rowIndex]?.item
                      : ""
                  }
                  onChange={(e) =>
                    setSearch({ rowIndex: { item: e.target.value } })
                  }
                />
                {/* {console.log(rows[rowIndex].item)} */}
                {Search?.rowIndex?.item && (
                  <ul className="absolute bg-white w-full">
                    {data.items
                      .filter((item) =>
                        item.Name.toLowerCase().includes(
                          rows[rowIndex].item.toLowerCase()
                        )
                      )
                      .map((item) => (
                        <li
                          key={item.code}
                          onClick={() => {
                            handleInputChange(rowIndex, "item", item.Name);
                            handleInputChange(rowIndex, "item_details", item);
                            // handleInputChange(rowIndex, "tax", item.tax);
                            handleInputChange(
                              rowIndex,
                              "discount",
                              item.discount
                            );
                            handleInputChange(
                              rowIndex,
                              "price_per_unit",
                              item.salesPrice
                            );
                            handleInputChange(rowIndex, "profit", item.profit);
                            handleInputChange(rowIndex, "hsn", item.HSN);
                            handleInputChange(
                              rowIndex,
                              "profit_per_item",
                              item.profit
                            );
                            item.unit
                              ? handleInputChange(rowIndex, "unit", item.unit)
                              : handleInputChange(
                                  rowIndex,
                                  "unit",
                                  "Not Available"
                                );
                            setSearch({});
                          }}
                          className="p-2 border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                        >
                          {item.Name}
                        </li>
                      ))}
                    <li
                      className="p-2 text-blue-500 font-semibold hover:bg-gray-200 cursor-pointer"
                      onClick={() => Navigate("/addParties")}
                    >
                      Add Party +
                    </li>
                  </ul>
                )}
              </div>
              <input
                type="number"
                className="w-full  py-3  text-center bg-gray-100 rounded-sm"
                value={rows[rowIndex].qty}
                onChange={(e) =>
                  handleInputChange(rowIndex, "qty", e.target.value)
                }
              />
              {/* <div>
              </div> */}
              <div className="w-full">
                <input
                  className="w-full  py-3  text-center bg-gray-100 rounded-sm"
                  value={
                    rows[rowIndex].unit
                      ? rows[rowIndex].unit
                      : Search
                      ? Search[rowIndex]?.unit
                      : ""
                  }
                  onChange={(e) =>
                    setSearch({ rowIndex: { unit: e.target.value } })
                  }
                />
                {Search?.rowIndex?.unit && (
                  <ul>
                    <li
                      className="add"
                      onClick={() => Navigate("/items?data=addUnit")}
                    >
                      Add Units +
                    </li>
                    {data.units
                      .filter((unit) =>
                        unit.name
                          .toLowerCase()
                          .includes(
                            rows[rowIndex].unit
                              ? rows[rowIndex].unit.toLowerCase()
                              : ""
                          )
                      )
                      .map((unit) => (
                        <li
                          key={unit.name}
                          onClick={() => {
                            // i should probably add more than a name to improve future search filter
                            handleInputChange(rowIndex, "unit", unit.name);
                            setSearch({});
                          }}
                        >
                          {unit.name}
                        </li>
                      ))}
                    <li
                      className="extra"
                      onClick={() => {
                        handleInputChange(rowIndex, "unit", "-");
                        setSearch({});
                      }}
                    >
                      --- none ---
                    </li>
                  </ul>
                )}
                {/* <select
                  name=""
                  id=""
                  onChange={(e) =>
                    handleInputChange(rowIndex, "unit", e.target.value)
                  }
                >
                  <option value="">None</option>
                  <option value="BAG">Bag</option>
                  <option value="Gram">Gram</option>
                  <option value="UNIT">UNIT</option>
                </select> */}
              </div>
              <input
                className="w-full  py-3  text-center bg-gray-100 rounded-sm"
                type="number"
                value={rows[rowIndex].price_per_unit}
                onChange={(e) =>
                  handleInputChange(rowIndex, "price_per_unit", e.target.value)
                }
              />
              {/* <div></div>
              <div></div> */}
              <input
                className="w-full  py-3  text-center bg-gray-100 rounded-sm"
                type="number"
                value={rows[rowIndex].discount}
                onChange={(e) =>
                  handleInputChange(rowIndex, "discount", e.target.value)
                }
              />
              {/* <div>
                <input
                  value={row.col6}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "tax", e.target.value)
                  }
                />
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    handleInputChange(rowIndex, "tax", e.target.value)
                  }
                >
                  <option value="0">IGST@0%</option>
                  <option value="0">GST@0%</option>
                  <option value="0.25">IGST@0.25%</option>
                  <option value="0.25">GST@0.25%</option>
                  <option value="3">IGST@3%</option>
                  <option value="3">GST@3%</option>
                  <option value="5">IGST@5%</option>
                  <option value="5">GST@5%</option>
                  <option value="12">IGST@12%</option>

                  <option value="18">IGST@18%</option>

                  <option value="18">GST@18%</option>

                  <option value="28">IGST@28%</option>

                  <option value="28">GST @28%</option>
                </select>
              </div> */}
              <input
                className="w-full  py-3  text-center bg-gray-100 rounded-sm"
                type="number"
                value={rows[rowIndex].amount}
                onChange={(e) =>
                  handleInputChange(rowIndex, "amount", e.target.value)
                }
              />
              {/* <div></div> */}
            </div>
          ))}
        </div>
        <div className="ai3">
          <div className="l">
            {/* <input autoComplete="off" type="checkbox" name="" id="" />
            <span>Round Off</span>
            <input
              className="in"
              value={round_off}
              onChange={(e) => setRound_off(e.target.value)}
              type="text"
            /> */}

            <input
              type="text"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description..."
            />
            {/* <select onChange={(e) => setpaymentType(e.target.value)}>

              <option disabled selected value="">
                PAYMENT TYPE
              </option>
              <option value="">CASH</option>
              <option value="">CHECK</option>
            </select> */}
            <button onClick={addRow}>ADD ROW</button>
            {/* <button
              onClick={() => {
                sendData();
              }}
            >
              send Data
            </button> */}
            {/* <button
              onClick={() => {
                // console.log(rows);
                fetchData();
              }}
            >
              fetch Data
            </button> */}
          </div>
          <div className="">
            {/* {paymentStatus === "pending" && (
              <div className="a">
                <span>Amount paid: </span>
                <input
                  type="number"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                />
              </div>
            )} */}

            <div className="">
              {/* <input
                value={
                  rows[rowIndex]?.tax
                    ? rows[rowIndex].tax
                    : Search
                    ? Search[rowIndex]?.tax
                    : ""
                }
                onChange={(e) =>
                  setSearch({ rowIndex: { tax: e.target.value } })
                }
              /> */}
              <select
                name=""
                id=""
                onChange={(e) => {
                  // alert(e.target.value);
                  setTotalTax((e.target.value / 100).toFixed(2) * totalAmount);
                }}
              >
                {data.tax?.map((unit) => (
                  <option key={unit.name} value={unit.value}>
                    {unit.name}
                  </option>
                ))}
              </select>
              {/* <p className="r">{totalTax}</p> */}
              {/* {Search?.rowIndex?.tax && (
                <ul> */}
              {/* <li className="add" onClick={() => Navigate("/addParties")}>
                      Add Ta +
                    </li> */}
              {/* </ul>
              )} */}
            </div>
            <div className="r">
              <span>Tax</span>
              <p className="sub">{totalTax}</p>
            </div>
            <div className="r">
              <span>Total</span>
              <span>Rs.</span>
              <p>{totalAmount + totalTax}</p>
            </div>
          </div>
        </div>
        <div className="ai4">add advance amount and balance</div>
        <div className="ai5">
          {/* <label>
            Paid
            <input
              type="radio"
              value="paid"
              checked={paymentStatus === "paid"}
              onChange={(e) => setPaymentStatus(e.target.value)}
            />
          </label>
          <br />
          <label>
            Pending
            <input
              type="radio"
              value="pending"
              checked={paymentStatus === "pending"}
              onChange={(e) => setPaymentStatus(e.target.value)}
            />
          </label> */}
          {/* <button className="save1" onClick={() => sendData_and_get_pdf()}>
            Save & Generate Invoice
          </button> */}
          <button className="save" onClick={() => sendData()}>
            Save
          </button>
          <button className="share">
            Share{" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const statesAndUnionTerritoriesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];
