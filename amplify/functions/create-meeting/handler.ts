import type { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

export const handler: APIGatewayProxyHandler = async (event) => {
  const region = process.env.AWS_REGION || 'ap-northeast-1';
  const chime = new AWS.ChimeSDKMeetings({ region });
  
  try {
    // Parse body from API Gateway event
    console.log('Event: ', event);
    console.log('Event body: ', event.body);
    //const { clientRequestToken, externalMeetingId } = JSON.parse(event.body || '{}'); // Ensure parsing from body
    // const { clientRequestToken, externalMeetingId } = JSON.parse(event.body || '{}');// Ensure parsing from body
    const { clientRequestToken, externalMeetingId } = JSON.parse(event.body || '{}');

    console.log('Creating meeting with clientRequestToken: ', clientRequestToken, 'externalMeetingId: ', externalMeetingId);

    // Input validation
    if (!clientRequestToken || !externalMeetingId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid input: clientRequestToken and externalMeetingId are required.' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Enable CORS if needed
        },
      };
    }

    // Create a new Chime meeting
    const meetingResponse = await chime.createMeeting({
      ClientRequestToken: clientRequestToken,
      ExternalMeetingId: externalMeetingId,
      MediaRegion: region,
    }).promise();
    
    console.log('Created Chime meeting: ', meetingResponse.Meeting?.MeetingId);

    // Return successful response
    return {
      statusCode: 200,
      body: JSON.stringify({
        meeting: meetingResponse.Meeting,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Enable CORS if needed
      },
    };
  } catch (error: any) {
    console.error('Error creating meeting: ', { error, event });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Enable CORS if needed
      },
    };
  }
};
