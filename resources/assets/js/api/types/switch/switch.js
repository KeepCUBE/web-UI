/**
 * Created by ddos on 19.04.17.
 */
export function sendLedConf (configuration) {

  const values = {
    L: 1,
    C: [
      configuration.color
    ],
    T: [
      1000
    ]
  }

  configuration = JSON.stringify(
    {
      type_id: 1,
      command_scheme: {
        name: 'SLP',
        values: values
      }
    }
  )
  console.log('Sending', configuration)
  Vue.http.post('commands/slain', configuration).then(response => {
    console.log(response.body)
  }, response => {
    console.log(response.body)
  })
}