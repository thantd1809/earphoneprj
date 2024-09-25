// src/api.js
const { v4: uuid } = require('uuid');
// const API_URL = 'http://172.16.0.2:4000';
const API_URL = 'http://192.168.201.23:4000';
//const API_URL = 'http://localhost:4000';

// Function to create a new Chime meeting (used by the host)
export async function createMeeting() {
  const response = await fetch(`${API_URL}/create-meeting`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientRequestToken: uuid(),  // Unique token for the meeting
      externalMeetingId: uuid(),  // Unique ID for the meeting
    }),
  });
  
  const data = await response.json();
  return data.meeting;
}

export async function getMeeting(meetingId) {
  const response = await fetch(`${API_URL}/get-meeting/${meetingId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  const data = await response.json();
  return data.meeting;
}

// Function to create an attendee (used by both host and listeners)
export async function createAttendee(meetingId, externalUserId) {
  const response = await fetch(`${API_URL}/create-attendee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      meetingId,
      externalUserId
    }),
  });
  
  const data = await response.json();
  return data.attendee;
}

export async function createRecording(meetingId) {
  const response = await fetch(`${API_URL}/start-recording`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      meetingId,
    }),
  });
  
  const data = await response.json();
  return data.pipeline;
}

export async function stopRecording(mediaPipelineId) {
  const response = await fetch(`${API_URL}/stop-recording`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mediaPipelineId,
    }),
  });
  
  const data = await response.json();
  return data.pipeline;
}
