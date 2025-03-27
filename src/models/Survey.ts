import mongoose from 'mongoose'

const SurveySchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, default: 'OPEN' },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    questions: [{ question: String, answer: [String] }],
    finish: { type: Boolean, default: false },
    potentialId: { type: String },
    totalQuestions: { type: Number, default: 21 }
})

export const Survey = mongoose.model('Survey', SurveySchema)