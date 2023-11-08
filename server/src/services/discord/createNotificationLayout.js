function createNotificationLayout(
  url,
  berichtsheft,
  calendarWeek,
  updateType,
  mention,
  roleIdFiaeD,
  updatedSlotsData = null
) {
  const updateTypeMessage = {
    newCalendarWeekRelease: `**[Neuer Stundenplan] - KW${calendarWeek}**`,
    sameCalendarWeekUpdate: `**[Update] - Aktueller Stundenplan - KW${calendarWeek}**

${updatedSlotsData}`,
  }

  const files = {
    newCalendarWeekRelease: [url, berichtsheft],
    sameCalendarWeekUpdate: [url],
  }

  //   const infoText = `
  // Um Benachrichtigungen bei Updates über Discord zu erhalten, auf den eigenen Namen rechts in der Leiste klicken und die Rolle "FIAE_D" auswählen. Natürlich auch Benachrichtigungseinstellungen auf euren Geräten beachten.

  // Google Calendar enthält alle vorherigen Stundenpläne, wenn es nützlich ist, dann könnt ihr es in euren Kalender importieren.

  // Ihr könnt den Channel auch muten, dazu rechtsklick auf den Channelnamen, dann Mute Channel.
  // `

  const sendData = {
    content: `${updateTypeMessage[updateType]}
    
${mention}

**Direkter Download:**`,
    files: files[updateType],
    tts: false,
    embeds: [
      {
        title: 'Original PDF link:',
        description: url,
        color: 0x2b2d31,
        fields: [
          {
            name: `Google Calendar Link:`,
            value: `[calendar.google.com/calendar/u/0?cid=ZWE1ZDJk...](https://calendar.google.com/calendar/u/0?cid=ZWE1ZDJkM2JmZGE3NjE4Y2Q2MzA2Y2E2ZmUxOWQ1Y2U5MTc3NzMwMzQ5YTg1NWYzYjczZjc3NWI1NDA5NDkwMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t)`,
            inline: false,
          },
        ],
        thumbnail: {
          url: 'https://images.squarespace-cdn.com/content/v1/5fa95c47b7eac96fa3f95bce/1607635074123-DIFITYHBQ1QYPW5XUX3Y/noun_Calendar_3621574.png?format=1000w',
        },
        // footer: {
        //   text: infoText,
        //   icon_url:
        //     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flat_exclamation_icon_-_blue.svg/512px-Flat_exclamation_icon_-_blue.svg.png',
        // },
      },
    ],
    allowedMentions: {
      roles: [roleIdFiaeD],
    },
  }

  return sendData
}

module.exports = createNotificationLayout
