import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const calendarId = "creovotech@gmail.com";
const temail = "creovo-meet-scheduler@creovo-cloud.iam.gserviceaccount.com";
const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC91FR54pN9cLoG\nFHLnikCcCEvo0Oy/PY6BMcJn2en2QWy8tK+eaG5bAd+Cftu/k54OULzWt3Q53oF9\nUM3J2bU2j8D6Jix9O6FmfvRfKXoyTEGsJWE6aTWiJIUzB4q3PrJ6gPk9YlX6vn7X\nP4kfILlArOFBdZnnaO0yNpwGdny1YrsqKybOOBCqiPxV/lUOxtiSg1tLysd6AexZ\n8t7wC6SF5yy5Bdxtb25ilxFM6RHDtiK03CfeF/Kg5TdoV0JOoMvszKDWPWuXNdx/\nXIQGFxEvx6C8CQg49AmA/nCVT0SlKVpCvqG7PbRnpYdBeaWFuwNi1Q7wI5EbM+of\nYDu6Zy9lAgMBAAECggEACU/0QPJzh9DS3197b45hswXZK3esVYlgh0f4oH2ZM6Js\nAine/6dh2ocR/uXYQ+Kq+0rMqL/hLMGUmqAvKDrM3/tXXS4oOpCFT3Dk7hIr03HY\nOuiuh14H6odeHW2+SVUDDm1rTK6ZRy63LDoKsQM680hH2J07SpXkJPV22/5OCdvT\nZhek/1QHzvAC/IspvRMyKRIlR0jhMAS8OmID/6s3N7P0HTgZ6i/ZI/8KPhVrXvSb\nePKtq7Guk01BXU7yj2h913mEyJxFpgQuXNvNS2bQhsYIUXDaaIS/N6KIrW1Wl/0c\nnrbYFMPf7azxePZUastzBRA119dt0J90URO4FRxvtQKBgQDp1iPrFQ2mp2Cia6aU\nzpO4Ti3YbWNe+0YMlDJtJ91XtWaXrKv0iv5WfqDmI/7/6i2kQFjaRgAtAbucYyUA\niH10CkDyoewEbQv32mYmIy5moyyh/3PynpcGmPZo1XXGH3bbepqHl0l53yBfVM7g\n5dlwHvm3RQNKjrgHElX1jpYfTwKBgQDP0mR4FSHiF45wU3AshjJkAg9pbv5XyBOG\nBhIccnxDgS4u35V0uKgW3iJsC7feYYmTHSZ9GgQAySOo/V44qw+Tcsz0L52VzZJA\n7bplRoNi/2H5mlRHvP0VB+bhc7mkUaURyWDLQu6t3l406UJEfsRd9DY0Ov1tKeJz\nc5i2soD5CwKBgAE1pVvq8PYiuYI9klAEvYjfhqcu8aulGxinj5c29JMmkhBIyV7r\ndSNXZleqagBC4teNqaf/YrLY5nKJpMBa9GMsRme65LClK8GtdIfP+MZ5I5r26k+f\n+GIFWojySbirov7BpJj89FlYCR/VHXjWV4iX8Gy9Q6YYFOWcd6tcgHRLAoGBAMVe\nuh41a62O068n/xO6C2dhcYOfbxytHqWdZFvx+sQdjl/j5cwphzHYm3ZjlqczmPXH\nrIMJTx3z6NMYdgB5rVxKng2WnyHjT3AslmaSljtR8ZmdEUfkW7M6gvJA9uDwzUVc\nLHo+QfGMi4nSsiXdAt98DHKER6UCL1eYREPWuZhLAoGAQP3LBAykyB4HSSP2BqAU\nKjF2aJSIwSWLcIcSeTfstJgLNVwYH0fZYoa4ueS/QWWA8Ht8p04AxmBkiIQ9sWD9\nGA/MAl3cZKXrN2vxUVVvEXcZNAX5JPuPW3x+vW6AdwYlfgQO/Eh85JjxBpXhJEZC\nt0JXlxT7xmquYY1YEVJab8Y=\n-----END PRIVATE KEY-----\n";


if (!calendarId) {
  throw new Error('GOOGLE_CALENDAR_ID not set');
}

const auth = new google.auth.JWT({
  email: temail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

export async function POST(req: NextRequest) {
  try {
    const { start, end, clientEmail } = await req.json();

    if (!start || !end) {
      return NextResponse.json(
        { error: 'start and end are required' },
        { status: 400 }
      );
    }

    const uniqueId = Date.now().toString(36);
    const summary = `client meet ${uniqueId}`;

    const res = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      requestBody: {
        summary,
        start: {
          dateTime: start,
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: end,
          timeZone: 'Asia/Kolkata',
        },
        conferenceData: { 
          createRequest: {
            requestId: `meet-${uniqueId}`,
          },
        },
      },
    });


    const meetUrl = res.data.hangoutLink || res.data.htmlLink;

    return NextResponse.json({ meetUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to schedule meeting' },
      { status: 500 }
    );
  }
}