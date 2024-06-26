import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PurchaseOrder({ data, setData }) {
  var [page, setPage] = useState("saleOrder");
  const Navigate = useNavigate();
  return (
    <div id="sale-Order">
      <div className="topbar">
        <button
          className={page === "saleOrder" ? "selected" : ""}
          onClick={() => setPage("saleOrder")}
        >
          Purchase Order
        </button>
      </div>
      {page === "saleOrder" && (
        <div className="service">
          <img src="./assets/bill.jpg" alt="" />
          <p>
            Make & share purchase orders with your parties & convert them to
            purchase bill instantly.
          </p>
          <button onClick={() => Navigate("/add-purchase-order")}>
            Add Your First Purchase Order
          </button>
        </div>
      )}
    </div>
  );
}
