import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRefund extends Document {
  order: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  amount: number;
  refundTransactionId?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RefundSchema: Schema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reason: {
      type: String,
      required: [true, 'Please provide a reason for refund'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'processed'],
      default: 'pending',
    },
    amount: {
      type: Number,
      required: true,
    },
    refundTransactionId: {
      type: String,
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Refund: Model<IRefund> = mongoose.models.Refund || mongoose.model<IRefund>('Refund', RefundSchema);

export default Refund;
