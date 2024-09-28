// src/api.js
const { v4: uuid } = require('uuid');
const API_URL = 'http://localhost:4000';

// https://r2oj3b8302.execute-api.ap-northeast-1.amazonaws.com/dev
// export async function testMeeting() {

//   const response = await fetch(`https://r2oj3b8302.execute-api.ap-northeast-1.amazonaws.com/dev/items`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       clientRequestToken: uuid(),  // Unique token for the meeting
//       externalMeetingId: uuid(),  // Unique ID for the meeting
//     }),
//   });

//   const data = await response.json();
//   console.log("createMeeting", data);
//   return JSON.parse(data.data)
// }
// Function to create a new Chime meeting (used by the host)
export async function createMeeting() {

  const response = await fetch(`https://gqr4dc3syf.execute-api.ap-northeast-1.amazonaws.com/dev/meeting`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientRequestToken: uuid(),  // Unique token for the meeting
      externalMeetingId: uuid(),  // Unique ID for the meeting
    }),
  });

  const data = await response.json();
  console.log("createMeeting", data.meeting);
  return data.meeting;
}

// export async function getMeetingTest() {
//   //https://7hdiuevhh2.execute-api.ap-northeast-1.amazonaws.com/dev
//   const response = await fetch(`https://7hdiuevhh2.execute-api.ap-northeast-1.amazonaws.com/dev/meeting`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   const data = await response.json();
//   return data;
// }

export async function getMeeting(meetingId) {
  const response = await fetch(`https://gqr4dc3syf.execute-api.ap-northeast-1.amazonaws.com/dev/meeting/?meetingId=${meetingId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data.meeting;
}

// Function to create an attendee (used by both host and listeners)
export async function createAttendee(meetingId, externalUserId) {
  const response = await fetch(`https://rtp02fdc7i.execute-api.ap-northeast-1.amazonaws.com/dev/attendee`, {
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
