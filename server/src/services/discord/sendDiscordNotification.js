const { Client, GatewayIntentBits } = require('discord.js')
const createNotificationLayout = require('./createNotificationLayout.js')
const extractUpdatedSlotsData = require('./extractUpdatedSlotsData.js')

async function sendDiscordNotification(
  token,
  { calendarWeek, url, updateType },
  pathDownloadsDir,
  updatedScheduleData,
  pathOldScheduleData
) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  })

  client.on('ready', async () => {
    // test channel:
    // const channel = client.channels.cache.get('1098944254413377598')

    const channel = client.channels.cache.get('1103343013020839946')

    const roleIdFiaeD = '1103342309220823060'
    const mention = `<@&${roleIdFiaeD}>`

    const berichtsheft = `${pathDownloadsDir}/berichtsheft_kw${calendarWeek}.xlsx`

    const updatedSlotsData =
      updateType === 'sameCalendarWeekUpdate'
        ? extractUpdatedSlotsData(updatedScheduleData, pathOldScheduleData)
        : null

    const sendData = createNotificationLayout(
      url,
      berichtsheft,
      calendarWeek,
      updateType,
      mention,
      roleIdFiaeD,
      updatedSlotsData
    )

    channel
      .send(sendData)
      .then(() => {
        client.destroy()
      })
      .catch(error => {
        console.error('Error sending message:', error)
        client.destroy()
      })
  })

  client.login(token)
}

module.exports = sendDiscordNotification
