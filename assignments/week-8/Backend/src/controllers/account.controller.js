import { Account } from "../models/Accounts.model.js";
import { Transaction } from "../models/Transaction.model.js";
import { User } from "../models/User.model.js";

export const Balance = async (req, res) => {
  try{
    const userId = req.user._id;
    const account = await Account.findOne({userId: userId});
    if(!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found for the user"
      });
    }
    res.status(200).json({
      success: true,
      message: "Balanced fetched successfully",
      balance: account.balance,
      username:req.user.username,
      firstName:req.user.firstName,
      lastName:req.user.lastName
    });
  }
  catch(err) {
    console.log(`Error while fetching the data ${err}`);
    res.status(500).json({
      success: false,
      message: err?.message || "Unexpected error while fetching the balance."
    });
  }
};

export const Contact = async (req, res) => {
  try{
    const currentUserId = req.user._id;
    const search = req.query.search || "";
    let users;
    if(search.trim() == "") {
      users = await User.aggregate([
        { $match: { _id: { $ne: currentUserId } } },
        { $sample: { size:10 }},
        { $project: {username:1, _id:1, firstName:1, lastName:1}}  
      ])
      return res.status(200).json(users);
    }
    else {
      users = await User.find({
        _id: { $ne: currentUserId },
        username: { $regex: search, $options: "i" }
      })
        .select("username _id firstName lastName")
        .limit(10);
      
      if (users.length == 0) return res.status(200).json({
        success: true,
        message: "No user exits."
      })
      
      res.status(202).json({
        success:true,
        users
      })
    }
  }
  catch(err) {
    console.log('Error while getting users', err);
    res.status(500).json({
      success:false,
      message:"Error while fetching the users details"
    })
  }
}

export const Transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderId = req.user._id;
    const { toUserId, amount } = req.body;

    if (!toUserId || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid transfer data."
      });
    }

    const senderAccount = await Account.findOne({ userId: senderId }).session(session);
    const receiverAccount = await Account.findOne({ userId: toUserId }).session(session);

    if (!senderAccount || !receiverAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: "Sender or receiver account not found."
      });
    }

    if (amount > senderAccount.balance) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Insufficient funds."
      });
    }

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    await Transaction.create(
      [{
        from: senderId,
        to: toUserId,
        amount: amount
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Transfer completed successfully.",
      remainingBalance: senderAccount.balance
    });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: "Internal server error. Transfer aborted.",
    });
  }
};

export const GetTransactionHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({
      $or: [{ from: userId }, { to: userId }]
    })
      .sort({ createdAt: -1 })
      .populate("from", "username")
      .populate("to", "username");

    const formatted = transactions.map(txn => ({
      _id: txn._id,
      type: txn.from._id.equals(userId) ? "debit" : "credit",
      amount: txn.amount,
      from: txn.from.username,
      to: txn.to.username,
      timestamp: txn.createdAt
    }));

    res.status(200).json({
      success: true,
      transactions: formatted
    });

  } catch (err) {
    console.error("Error fetching transaction history:", err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch transaction history."
    });
  }
};
