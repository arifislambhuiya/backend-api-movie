import mongoose from "mongoose";
import Participants from "./schema/participants.js";

export const createParticipantByName = async (name, age, role) => {
  const newParticipant = new Participants({ name, age, role });
  const result = await newParticipant.save();

  return result;
};

export const getAllParticipants = async () => {
  const result = await Participants.find();
  if (!result) {
    return [];
  }
  return result;
};

export const getSingleParticipantById = async (participantId) => {
  if (!mongoose.Types.ObjectId.isValid(participantId)) {
    console.log("Invalid object id");
  }
  const participant = await Participants.findById(participantId);
  if (!participant) {
    return null;
  }
  return participant;
};

export const updataParticipantById = async (participantId, name, age, role) => {
  if (!mongoose.Types.ObjectId.isValid(participantId)) {
    console.log("Invalid object id");
  }
  const updatedParticipant = await Participants.findByIdAndUpdate(
    participantId,
    { name, age, role },
    {
      new: true,
    }
  );
  if (!updatedParticipant) {
    return null;
  }
  return updatedParticipant;
};

export const deleteParticipantById = async (participantId) => {
  if (!mongoose.Types.ObjectId.isValid(participantId)) {
    console.log("Invalid object Id");
    return false;
  }
  const deletedParticipant = await Participants.findByIdAndDelete(
    participantId
  );
  if (!deletedParticipant) return false;
  return true;
};
