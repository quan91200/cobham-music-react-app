const mongoose = require("mongoose");

const vnpaySchema = mongoose.Schema(
  {
    // Mã yêu cầu truy vấn giao dịch
    vnpRequestId: {
      type: String,
      required: true,
    },
    // địa chỉ ip client
    vnpIpAddr: {
      type: String,
      required: true,
    },
    // mã giao dịch của merchant system
    vnpTxnRef: {
      type: String,
      required: true,
    },
    // mã giao dịch của vnpay
    vnpTransactionNo: {
      type: Number,
      required: true,
    },
    // time giao dịch
    vnpTransactionDate: {
      type: Number,
      required: true,
    },
    // inf đơn hàng
    vnpOrderInf: {
      type: String,
      required: true,
    },
    // time tạo giao dịch
    vnpCreateDate: {
      type: Number,
      required: true,
    },
    // số tiền giao dịch
    vnpAmount: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("vnpay", vnpaySchema);
